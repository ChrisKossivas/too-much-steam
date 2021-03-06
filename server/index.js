"use strict";

// requirements to run server
const express = require("express");
const request = require("request-promise");
const morgan = require("morgan");
const cors = require("cors");

// passport for passport-steam strategy using OpenID
const passport = require("passport");
const SteamStrategy = require("passport-steam");
const util = require("util");
const session = require("express-session");

// requirements for mongodb connection
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { apiKey } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {
  getUsersDb,
  getUserDbById,
  updateAddLike,
  updateAddDislike,
  updateAddFriend,
  getGamesDb,
  getTop10GamesDb,
  GetPersonalGames,
  getSpecificGame,
} = require("./handlers");

const eachGameLibrary = [];

// Fetch and add the steam library game ids to mongo db with an added totalLikes key/value pair to keep track of all likes across the app
const getLibrary = async (steamId) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db();

    return request(
      " http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=93B0F23949E72BE7ACA2A771320DB80F&steamid=" +
        `${steamId}` +
        "&format=json"
    )
      .then((res) => JSON.parse(res))
      .then(async (library) => {
        library.response.games.map((allGames) => {
          eachGameLibrary.push(allGames);
        });
        const result = eachGameLibrary.map((eachGame) => ({
          ...eachGame,
          totalLikes: 0,
        }));

        await db.collection("games").insertMany(result);
      });
  } catch (err) {
    console.log("error!", err);
  }
};

// mandatory methods to run passport strategy authentication
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// passport-steam strategy to identify the return URL which the steam response object will be sent to
// As well if it is a new user login, they will be saved to mongodb with additonal key/value pairs
passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:8000/api/auth/steam/return",
      realm: "http://localhost:8000/",
      apiKey: apiKey,
    },
    function (identifier, profile, done) {
      process.nextTick(async function () {
        try {
          const client = await new MongoClient(MONGO_URI, options);
          await client.connect();

          const db = client.db();

          const _id = profile._json.steamid;
          
          // create new user object for mongodb
          const newUserObj = {
            _id: profile._json.steamid,
            personaname: profile._json.personaname,
            avatarmedium: profile._json.avatarmedium,
            realname: profile._json.realname,
            totalGamesLiked: 0,
            totalGamesDisliked: 0,
            totalGamesLikedId: [],
            totalGamesDislikedId: [],
            friendList: [],
          };

          // only save the user to mongodb if it is their first time logging into the app
          db.collection("users").findOne({ _id }, async (err, result) => {
            if (!result) {
              getLibrary(_id);
              await db.collection("users").insertOne(newUserObj);

              return;
            } else {
              return;
            }
          });
          profile.identifier = identifier;
          return done(null, profile);
        } catch (err) {
          console.log(err);
        }
      });
    }
  )
);

// server express initialze
const app = express();

app.use(
  session({
    secret: "123",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 3600000,
    },
  })
);

app.use(cors());

// initialize passport for routes
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));

app.use(express.json());
app.use(morgan("tiny"));

// Routes for steam
// endpoint for the steam response object. Will send back the mongodb object instead of steam response
app.get("/api/account", async (req, res) => {
  try {
    if (req.user !== undefined) {
      const _id = req.user._json.steamid;
      const db = req.app.locals.client.db();

      await db.collection("users").findOne({ _id }, async (err, result) => {
        if (result) {
          res.status(200).json(result);
          return;
        } else {
          res.status(404).json({ message: "user does not exist in database" });
          return;
        }
      });
    }
  } catch (err) {
    console.log("error!", err);
  }
});

// socket.io chat feature

const http = require("http").Server(app);
const io = require("socket.io")(http, {
  transports: ["websocket", "polling"],
});

const users = {};
// initial connection for socket.io
io.on("connection", (socket) => {
  console.log("CONNECTED!");
  socket.on("username", () => {
    const user = {
      id: socket.id,
    };
    users[socket.id] = user;
    io.emit("connected", user);
    io.emit("users", Object.values(users));
  });
  // listening for "send" and will respond will message object
  socket.on("send", (msg) => {
    io.emit("new-message", {
      text: msg.username + " " + msg.value,
      avatar: msg.avatar,
      user: users[socket.id],
    });
  });

  // disconnect user from socket.io
  socket.on("disconnect", () => {
    console.log("user disconnected");
    delete users[socket.id];
    io.emit("disconnected", socket.id);
  });
});

// redirect to steam log in page
app.get(
  "/api/auth/steam",
  passport.authenticate("steam", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/");
  }
);

// after successsful login, redirect back to this endpoint
app.get(
  "/api/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);

// logout endpoint
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("http://localhost:3000");
});

// DB ENDPOINTS

// GET specific game from library
app.get("/api/game/specific/:appid", getSpecificGame);

// GET all games library
app.get("/api/game/:_id", GetPersonalGames);

// GET all users DB
app.get("/db/user", getUsersDb);

// GET user by id DB
app.get("/db/user/:_id", getUserDbById);

// GET all games DB
app.get("/db/game", getGamesDb);

// GET Top 10 games DB
app.get("/db/game/top10", getTop10GamesDb);

// PUT update user object with 1++ to total games liked and add the appId to array of games liked DB
app.put("/db/user/like/:_id/:appid", updateAddLike);

// PUT update user object with 1++ to total games disliked and add the appId to array of games disliked DB
app.put("/db/user/dislike/:_id/:appid", updateAddDislike);

// PUT update user object with new friend Id. DB
// Needs friend Id and logged in User Id
app.put("/db/user/addfriend/:_id/:friendid", updateAddFriend);

// Catchall endpoint
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Unknown endpoint",
  });
});

// Bootup logic with mongodb
const setup = async () => {
  const client = await new MongoClient(MONGO_URI, options);
  await client.connect();
  app.locals.client = client;
  console.log("connected to mongodb!");
};
setup()
  .then(() => {
    http.listen(8000, () => console.log(`Listening on port ${8000}`));
  })
  .catch((err) => {
    console.log("ERROR! Server!", err);
  });
