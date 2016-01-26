////////////////////////////////////////////////////////////////////////
//                             User Model                             //
////////////////////////////////////////////////////////////////////////

// ??? What does use strict mean? Necessary?
'use strict';

// Requires mongoose functions for setting up mongodb schemas
// bcrypt-nodejs is a friendlier encryption module
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

// UserSchema
var userSchema = mongoose.Schema({
  local:{
    firstName: String,
    lastName: String,
    address: String,
    email: String,
    phoneNumber: String,
    password: String,
    driver: Boolean
  },
  venmo: {
    name: {
        type: String
        // Took out required (messing up oauth)
    },
    email: String,
    username: {
        type: String
    },
    current_order_id: String,
    provider: String,
    salt: String,
    venmo: {},
    access_token: String,
    refresh_token: String
    // expires: Date
  }
});

// Used in passport.js to encrypt password
userSchema.methods.generateHash = function (password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Used in passport.js to check encrypted password
userSchema.methods.validPass = function (password){
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
