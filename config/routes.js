////////////////////////////////////////////////////////////////////////

// Grab express files; no need for 'var app' pairing here
// Call built-in module in express
//
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


// Grab all the functions from the users controller.
var usersController = require('../controllers/usersController');
var restaurantsController = require('../controllers/restaurantsController');

////////////////////////////////////////////////////////////////////////
                          // User routes //

router.route('/').get(function(req, res){
  res.render('users/home_page');
});





////////////////////////////////////////////////////////////////////////
                        // Restaurant Api routes //

router.route('/api').get(restaurantsController.allAPI);
router.route('/api/create').post(restaurantsController.createAPI);
router.route('/api/:id/delete').delete(restaurantsController.deleteAPI);
router.route('/api/:id/show').get(restaurantsController.showAPI);
router.route('/api/:id/edit').put(restaurantsController.editAPI);













////////////////////////////////////////////////////////////////////////
// Exports route so that other pages can grab this file
module.exports = router

////////////////////////////////////////////////////////////////////////
