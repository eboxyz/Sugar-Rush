////////////////////////////////////////////////////////////////////////
//                             User Model                             //
////////////////////////////////////////////////////////////////////////

// ??? What does use strict mean? Necessary?
'use strict';

// Requires mongoose functions for setting up mongodb schemas
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
/**
 * Module dependencies.
 */


/**
 * User Schema
 */
var userSchema = mongoose.Schema({
  local:{
    email: String,
    password: String
  },
  venmo: {
    name: {
        type: String
    },
    email: String,
    username: {
        type: String
    },
    provider: String,
    salt: String,
    venmo: {},
    access_token: String,
    refresh_token: String
    // expires: Date
  }
});


userSchema.methods.generateHash = function (password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPass = function (password){
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
