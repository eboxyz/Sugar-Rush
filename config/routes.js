////////////////////////////////////////////////////////////////////////
//                               Routes                               //
////////////////////////////////////////////////////////////////////////

// Require express and access routes functions
// ??? Is body parser required here?
// ??? Method override is important, but why is it used here?
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Grab all the functions from the controllers.
var usersController = require('../controllers/usersController');
var restaurantsController = require('../controllers/restaurantsController');
var ordersController = require('../controllers/ordersController');


////////////////////////////////////////////////////////////////////////
//                            User Routes                             //
////////////////////////////////////////////////////////////////////////

router.route('/').get(function(req, res){
  res.render('users/home_page');
});
router.route('/users/profile').get(usersController.show);

////////////////////////////////////////////////////////////////////////
//                         Restaurant Routes                          //
////////////////////////////////////////////////////////////////////////

router.route('/restaurants').get(restaurantsController.all);

////////////////////////////////////////////////////////////////////////
//                       Restaurant Api Routes                        //
////////////////////////////////////////////////////////////////////////

router.route('/api').get(restaurantsController.allAPI);
router.route('/api/create').post(restaurantsController.createAPI);
router.route('/api/:id/delete').delete(restaurantsController.deleteAPI);
router.route('/api/:id/show').get(restaurantsController.showAPI);
router.route('/api/:id/edit').put(restaurantsController.editAPI);

////////////////////////////////////////////////////////////////////////
//                           Orders Routes                            //
////////////////////////////////////////////////////////////////////////

router.route('/orders/create').post(ordersController.create);
router.route('/orders/shoppingcart').get(ordersController.new);
// router.route('/orders/:id/edit').put(ordersController.update);
router.route('/orders/show/:id').get(ordersController.show);

////////////////////////////////////////////////////////////////////////

module.exports = router

