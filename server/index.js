"use strict";


// , router = express.Router()
// , passport = require('passport');

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
} = require("./handlers")


// replaces database

let newUser = [];

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


  //COPIED!
    passport.use(new SteamStrategy({
      returnURL: 'http://localhost:8000/api/auth/steam/return',
      realm: 'http://localhost:8000/',
      apiKey: '93B0F23949E72BE7ACA2A771320DB80F'
    },
    function(identifier, profile, done) {
      process.nextTick(function () {



        const newUserObj = {
          _id: profile._json.steamid, 
          personaname: profile._json.personaname, 
          avatarmedium: profile._json.avatarmedium, 
          realname: profile._json.realname
        }
        console.log(newUserObj)


        newUser.push(newUserObj)

        profile.identifier = identifier;
        
        
        
        console.log("user!!", newUser)
        
        
        return done(null, profile);
      });
    }
    ));
    
    


// server express
const app = express()

// COPIED!!
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

app.get('/api/account', (req, res) => {
  res.status(200).json(req.user);
  });


  // redirect to steam log in page
app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
  res.redirect('/')
  });
  

  // after successsful login, redirect back to fornt end of app
app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
  // res.redirect('/api/account')
  res.redirect("http://localhost:3000");
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect("http://localhost:3000");
  });
  

// TEST ENDPOINT
app.get("/test", getTest)

// DB TEST ENDPOINT
app.get("/dbtest", getUsersDb)


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
        app.listen(8000, () => console.log(`Listening on port ${8000}`));
    })
    .catch((err) => {
        console.log("ERROR! Server!", err);
    });
