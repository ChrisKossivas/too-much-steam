"use strict";


// also get api key and stuff later on hard code it


const express = require("express")

const morgan = require("morgan");
const cors = require("cors");

const passport = require("passport");
const SteamStrategy = require("passport-steam")
const util = require('util')
const session = require('express-session')

// requirements for mongodb connection
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const {
  getTest,
  getUsersDb,
  getUserDbById,
  updateAddLike,
  updateAddDislike,
  updateAddFriend,
} = require("./handlers")


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


  // CHANGE APIKEY TO USE .ENV FILE
    passport.use(new SteamStrategy({
      returnURL: 'http://localhost:8000/api/auth/steam/return',
      realm: 'http://localhost:8000/',
      apiKey: '93B0F23949E72BE7ACA2A771320DB80F'
    },
    function(identifier, profile, done) {
      process.nextTick( async function () {

        const client = await new MongoClient(MONGO_URI, options);
        await client.connect();

        const db = client.db()

        const _id =  profile._json.steamid

        const newUserObj = {
          _id: profile._json.steamid, 
          personaname: profile._json.personaname, 
          avatarmedium: profile._json.avatarmedium, 
          realname: profile._json.realname,
          totalGamesLiked: 0,
          totalGamesDisliked: 0,
          totalGamesLikedId: [],
          totalGamesDislikedId: [],
          friendList: []
        }

        db.collection("users").findOne({_id}, async (err, result) => {
          if (!result) {
            newUserResult = await db.collection("users").insertOne(newUserObj)
            return
          }
          else {
            return
          }
        })


        profile.identifier = identifier;
        
        
        
        return done(null, profile);
      });
    }
    ));
    
    


// server express
const app = express()

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.use(session({
  secret: '123',
  saveUninitialized: true,
  resave: false,
  cookie: {
  maxAge: 3600000
  }
  }))


app.use(cors());


app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'))

app.use(express.json())
app.use(morgan("tiny"))



  // Routes for steam
  app.post('/api/account', (req, res) => {
    // res.status(200).json(req.user);
    });

app.get('/api/account', async (req, res) => {

  try {
    if (req.user !== undefined) {

      const _id = req.user._json.steamid
      const db = req.app.locals.client.db();
  
      await db.collection("users").findOne({_id}, async (err, result) => {
        if (result) {
          res.status(200).json(result);
          return
        }
        else {
          res.status(404).json({message: "user does not exist in database"})
          return
        }
      })
    }
  }
  catch (err) {
    console.log("error!", err)
  }
  });




// socket.io chat feature

const http = require('http').Server(app);
const io = require('socket.io')(http, {
  transports: ["websocket", "polling"]
});


const users = {};
io.on('connection', socket => {
  console.log("CONNECTED!")
  socket.on("username", username => {
    // console.log("myUserName!", username)
    const user = {
      // name: username,
      id: socket.id
    };
    users[socket.id] = user;
    io.emit("connected", user)
    io.emit("users", Object.values(users))
  })
  // console.log(users)
  
  socket.on('send', (msg) => {
    io.emit('new-message', {
      text:  msg.username + " " + msg.value,
      avatar: msg.avatar,
      user: users[socket.id]
    });
  });


  // joining rooms for private messaging
  // socket.on("private-message", (anotherSocketId, msg) => {
  //   console.log(anotherSocketId)
  //   console.log(msg)
  //   socket.to("someroom1").emit("private-message", socket.id);
  // })




  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete users[socket.id]
    io.emit("disconnected", socket.id)
  });
});




  // redirect to steam log in page
app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
  res.redirect('/')
  });
  

  // after successsful login, redirect back to fornt end of app
app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
  res.redirect("http://localhost:3000");
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect("http://localhost:3000");
  });
  

// TEST ENDPOINT
app.get("/test", getTest)



// DB ENDPOINTS

// GET all users
app.get("/db/user", getUsersDb)

// GET user by id
app.get("/db/user/:_id", getUserDbById)

// PUT update user object with 1++ to total games liked and add the appId to array of games liked
app.put("/db/user/like/:_id/:appid", updateAddLike)

// PUT update user object with 1++ to total games disliked and add the appId to array of games disliked
app.put("/db/user/dislike/:_id/:appid", updateAddDislike)

// PUT update user object with new friend Id.
// Needs friend Id and logged in User Id
app.put("/db/user/addfriend/:_id/:friendid", updateAddFriend)

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
  console.log("connected to mongodb!")
}
setup()
    .then(() => {
        http.listen(8000, () => console.log(`Listening on port ${8000}`));
        // http.listen(8001,  () => console.log(`Listening on port ${8001} for chat`))
    })
    .catch((err) => {
        console.log("ERROR! Server!", err);
    });
