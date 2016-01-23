var User = require('../models/user');
var VenmoStrategy = require('passport-venmo').Strategy;


var express = require('express');
var app = express(); // Function in exress to run application

// s

var Venmo_Client_ID = "3458";
var Venmo_Client_SECRET = "gSMcNkfwgTBeJLGZFe5uAfFL7PcdqdBJ";
var Venmo_Callback_URL = "http://localhost:3000/auth/venmo/callback";

module.exports = function(passport){

    ////////////////

    // development only
    // if ('development' == app.get('env')) {
    //   app.use(express.errorHandler());
    // }

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });

    /////////////////

    // Use the VenmoStrategy
    // Strategies in Passport require a 'verify' function, which
    // is the anonymous function we define as the second parameter
    // of passport.use
    // The 'verify' function accepts an accessToken, refreshToken,
    // a 'venmo' object containing an authorized user's information
    // and invoke callback function with the user object.
    passport.use(new VenmoStrategy({
        clientID: Venmo_Client_ID,
        clientSecret: Venmo_Client_SECRET,
        callbackURL: Venmo_Callback_URL
      },
      function(accessToken, refreshToken, venmo, done) {
        User.findOne({
            'venmo.id': venmo.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            // checks if the user has been already been created, if not
            // we create a new instance of the User model
            if (!user) {
                user = new User({
                    name: venmo.displayName,
                    username: venmo.username,
                    email: venmo.email,
                    provider: 'venmo',
                    venmo: venmo._json,
                    balance: venmo.balance,
                    access_token: accessToken,
                    refresh_token: refreshToken
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                user.balance = venmo.balance;
                user.access_token = accessToken;
                user.save();
                user.venmo = venmo._json
                return done(err, user);
            }
        });
      }
    ));

}
