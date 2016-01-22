////////////////////////////////////////////////////////////////////////

// Grab express files; no need for 'var app' pairing here
// Call built-in module in express
//
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Grab all the functions from the users controller.
var usersController = require('../controllers/usersController');

////////////////////////////////////////////////////////////////////////

router.route('/').get(function(req, res){
  res.render('users/home_page');
})










// Exports route so that other pages can grab this file
module.exports = router

////////////////////////////////////////////////////////////////////////
