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

// replaces database


const {
  getTest
} = require("./handlers")

let user = {};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// STEAM STRATEGY
// passport.use(new SteamStrategy({
//   returnURL: 'http://localhost:3000/auth/steam/return',
//   realm: 'http://localhost:3000/',
//   apiKey: '93B0F23949E72BE7ACA2A771320DB80F'
// },
//     (identifier, profile, done) => {
//       // might actually be different from video tutorial
//       // console.log("Steam profile", JSON.stringify(profile));
//       // user = { ...profile };
//       // return done(null, profile);

//       process.nextTick(function () {
//         profile.identifier = identifier;
//         return done(null, profile);
//       });

//     }));


  //COPIED!
    passport.use(new SteamStrategy({
      returnURL: 'http://localhost:8000/api/auth/steam/return',
      realm: 'http://localhost:8000/',
      apiKey: '93B0F23949E72BE7ACA2A771320DB80F'
    },
    function(identifier, profile, done) {
      process.nextTick(function () {
  
        profile.identifier = identifier;
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



  // Routes
app.get('/api/account', (req, res) => {
  console.log(req.user)
  res.status(200).json(req.user);
  });


app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
  res.redirect('/')
  });
app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
  // res.redirect('/api/account')
  res.redirect("http://localhost:3000");
  });


// TEST ENDPOINT
app.get("/test", getTest)


// Catchall endpoint
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Unknown endpoint",
  });
});


app.listen(8000, () => console.log("server is up and running... on port 8000"))
