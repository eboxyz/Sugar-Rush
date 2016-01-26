////////////////////////////////////////////////////////////////////////
//                            passport.js                             //
////////////////////////////////////////////////////////////////////////

// LocalStrat allows for local authentication
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var passport = require('passport');
var User = require('../models/user');
var VenmoStrategy = require('passport-venmo').Strategy;
var LocalStrategy = require('passport-local').Strategy;


// Eventually move to .env
var Venmo_Client_ID = "3458";
var Venmo_Client_SECRET = "gSMcNkfwgTBeJLGZFe5uAfFL7PcdqdBJ";
var Venmo_Callback_URL = "http://localhost:3000/auth/venmo/callback";

// Pass in passport. Can do this through "require('./config/passport')(passport)"
// in server.js
module.exports = function(passport){

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });

////////////////////////////////////////////////////////////////////////
//              Local Auth (Register and Login)                       //
////////////////////////////////////////////////////////////////////////

    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    // These are the fields used in signup
    // passReqToCallback allows us to pass back the entire request to
    // the callback.
    passport.use('local-signup', new LocalStrategy({
      firstName: 'firstName',
      lastName: 'lastName',
      address: 'address',
      usernameField: 'email',
      phoneNumber: 'phoneNumber',
      passwordField: 'password',
      passReqToCallback: true
    },
    // "Email" passed in instead of username (passport standard)
    // process.nextTick allows the function to run asynchronously
    // Finds user based on local.email from User model.
    // If no error and no existing user, create a new user with the
    // request's parameters.
    // GenerateHash encrypts the password (defined in the User model)
    // Done is needed to say that this middleware is over
    function (req, email, password, done){
      process.nextTick(function (){
        User.findOne({
          'local.email': email
        }, function (err, user){
          if (err) return done(err);

          if (user){
            return done(null, false, req.flash('signupMessage', 'That email is already taken'));
          } else{
            console.log(req.body);
            var newUser = new User();
            newUser.local.firstName = req.body.firstName;
            newUser.local.lastName = req.body.lastName;
            newUser.local.address = req.body.address;
            newUser.local.email = email;
            newUser.local.phoneNumber = req.body.phoneNumber;
            newUser.local.password = newUser.generateHash(password);
            newUser.save( function (err){
              console.log('new user created')
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }
    ));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    // Login requires email and password and passes request to callback
    // finds existing User based on a unique local.email
    // If error, no matching user, or bad password, flash (or log error)
    // ValidPass does what it implies and is defined in the User model
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      function (req, email, password, done){
        User.findOne({
          'local.email': email
        }, function (err, user){
          if (err)
            return done(err);
          if (!user)
            return done(null, false, req.flash('loginMessage', 'NO USER FOUND'));

          if (!user.validPass(password))
            return done(null, false, req.flash('loginMessage', "I remember my first time logging in..."));
          return done(null, user);
        });
      }));

////////////////////////////////////////////////////////////////////////
//              Venmo Auth (Register and Login)                       //
////////////////////////////////////////////////////////////////////////

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
        callbackURL: Venmo_Callback_URL,
        passReqToCallback: true
      },
      //we're receiving this from venmo
      function(req, accessToken, refreshToken, venmo, done) {
        //asynchronous

        process.nextTick(function (){
          if (!req.user){
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
                    access_token: accessToken,
                    refresh_token: refreshToken
                    //store these in database
                    //session is fine
                    //store a cookie as the user
                    //check the cookie
                    //set an expiration on the cookie
                    //set expiration of accesstoken == cookie
                    //if cookie is expired then get a new token
                    //60 days
                });
                console.log(user);
                user.save(function(err) {
                    if (err) console.log(err);
                    else console.log('SAVED!')
                    return done(err, user);
                });
            }else {
                user.balance = venmo.balance;
                user.access_token = accessToken;
                user.save();
                user.venmo = venmo._json
                return done(err, user);
            }
        })
      //   } else{
      //     User.findById({_id: req.user}, function (err, data){
      //       console.log(req.user);
      //       console.log(data)
      //       data.venmo.email = req.email;
      //       data.venmo.username = req.username
      //       data.save();
      //       });
      //   };
      // })
      }})//?
    }));

}
