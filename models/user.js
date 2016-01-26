////////////////////////////////////////////////////////////////////////
//                             User Model                             //
////////////////////////////////////////////////////////////////////////

// ??? What does use strict mean? Necessary?
'use strict';

// Requires mongoose functions for setting up mongodb schemas
var mongoose = require('mongoose')

// Sets up a user schema with name, email, username, and venmo-related
// attributes and exports it.
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
    current_order_id: String,
    provider: String,
    salt: String,
    venmo: {},
    access_token: String,
    refresh_token: String
});
