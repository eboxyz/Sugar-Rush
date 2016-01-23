'use strict';

var mongoose = require('mongoose')
/**
 * Module dependencies.
 */




/**
 * User Schema
 */
module.exports = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: String,
    username: {
        type: String,
        unique: true
    },
    provider: String,
    salt: String,
    venmo: {},
    access_token: String,
    refresh_token: String
});
