////////////////////////////////////////////////////////////////////////
//                             User Model                             //
////////////////////////////////////////////////////////////////////////

// Makes all modules in node load in a 'strict' mode
'use strict';

// Requires mongoose functions for setting up mongodb schemas
// bcrypt-nodejs is a friendlier encryption module
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
// var Order = require('../models/order')

// UserSchema
var userSchema = mongoose.Schema({
  local:{
    firstName: String,
    lastName: String,
    address: String,
    email: String,
    phoneNumber: String,
    password: String,
    driver: Boolean,
    admin: Boolean,
    profilePicture: {type: String, default: "http://www.marthastewart.com/sites/files/marthastewart.com/styles/wmax-520-highdpi/public/d26/mb_1001_strawberry_cupcake/mb_1001_strawberry_cupcake_vert.jpg?itok=NWhXpH67"}
  },
  venmo: {
    name: {
        type: String
        // Took out required (messing up oauth)
    },
    // orders:[{
    //   type: Schema.Types.ObjectId, ref: 'Order'
    // }],
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
  return bcrypt.hashSync(password, bcrypt.genSaltSync(11), null);
};

// Used in passport.js to check encrypted password
userSchema.methods.validPass = function (password){
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
