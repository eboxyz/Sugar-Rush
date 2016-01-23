'use strict';

var mongoose = require('mongoose')
/**
 * Module dependencies.
 */

var Schema = mongoose.Schema



/**
 * User Schema
 */
var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    username: {
        type: String,
        unique: true
    },
    balance: String,
    provider: String,
    salt: String,
    venmo: {},
    access_token: String,
    refresh_token: String
});

var User = mongoose.model('User', UserSchema);

module.exports = {"User": User};
