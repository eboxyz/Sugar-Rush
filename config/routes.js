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
var loginController = require('../controllers/loginController');
var ordersController = require('../controllers/ordersController');

////////////////////////////////////////////////////////////////////////
//                            User Routes                             //
////////////////////////////////////////////////////////////////////////

// router.route('/').get(function(req, res){
//   res.render('users/home_page');
// });
// router.route('/users/profile').get(usersController.show);


router.route('/users/profile').get( function (req, res){
  res.render('users/profile');
});

router.route('/restaurants/all').get( function (req,res){
      console.log(req.session)
    if (req.session && req.session.email){
      User.findOne({email: req.session.email}).then( function (user){
        res.render('./restaurants/all', {
          curr_user: user.email,
          users:null
        })
      })}    req.session.save();
    // } else{
    //   User.findAsync({})
    //     .then( function (users){
    //       res.render('./users/home_page', {
    //         curr_user: null,
    //         users: users
    //       });
    //     }).catch();
    // }
});

// router.route('/api/user').get(usersController.allAPI);
router.route('/api/user/create').post(usersController.createUser);
router.route('/user/:id/delete').delete(usersController.deleteUser);
router.route('/api/users').get(usersController.showUsers);
router.route('/user/:id/edit').put(usersController.editUser);
router.route('/users/profile/edit/').put(usersController.editUser);

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
router.route('/orders/show/:id').get(ordersController.show);

router.route('/api2').get(ordersController.allAPI);
router.route('/api2/create').post(ordersController.createAPI);
router.route('/api2/:id/delete').delete(ordersController.deleteAPI);
router.route('/api2/:id/show').get(ordersController.showAPI);
router.route('/api2/:id/edit').put(ordersController.editAPI);

////////////////////////////////////////////////////////////////////////

module.exports = router

