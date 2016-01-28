////////////////////////////////////////////////////////////////////////
//                       Restaurants Controller                       //
////////////////////////////////////////////////////////////////////////

// Grabs the mongoose functions and Restaurants model from the mongo db
var Restaurant = require('../models/restaurant');
var User = require('../models/user');
var mongoose = require('mongoose');
var request = require('request');

// Exports restaurant functions
module.exports = {

////////////////////////////////////////////////////////////////////////
//                           View Functions                           //
////////////////////////////////////////////////////////////////////////

// console.log(req.session)
//     if (req.session && req.session.email){
//       User.findOne({ email: req.session.email}).then( function (user){
//         curr_user: user.email;
//         users: null;
//       })
//     } else{
//       User.findAsync({}).then( function (users){
//         curr_user: null;
//         users: users;
//       }).catch();
//     }

// Shows all restaurants; consumes API
//user logic here
// request('http://sugar-rush.herokuapp.com/api', function(err, resp, bod){
//       if(!err && resp.statusCode === 200){
//         var rest_data = JSON.parse(bod);
//         res.render('restaurants/all', {restaurants: rest_data});
//       } else console.log(err)
//     })

//need to implement promise logic
//needs to erpform request to api+define restaurant through that,
//then find the session through the user and define it
//then save the session
  all: function(req, res, next){
    request('http://sugar-rush.herokuapp.com/api', function(err, resp, bod){
      if(!err && resp.statusCode === 200){
        var rest_data = JSON.parse(bod);
        console.log(bod)
        if (req.session && req.session.email){
          User.findOne({ email: req.session.email}).then( function (user){
            res.render('restaurants/all', {
              restaurants: rest_data,
              curr_user: user.email,
              users: null,
            });
          })
        } else{
          User.findAsync({}).then( function (users, rest_data){
            res.render('./restaurants/all',{
              curr_user: null,
              rest_data: rest_data,
              users: users,
            })
          }).catch();
        }
        req.session.save();
      } else console.log(err)
    })
  },

// Shows a specific restaurant


////////////////////////////////////////////////////////////////////////
//                            API Functions                           //
////////////////////////////////////////////////////////////////////////

  // API function to show all restaurants. Restaurant.find({}) grabs
  // them in the database and renders them through JSON.
  allAPI: function (req, res, next){
    Restaurant.find({}, function (err, restaurants){
      res.json(restaurants);
    })
  },

  // API function to create a restaurant. A new restaurant is created
  // based on the Restaurant model. A 'keys' array is created using the
  // keys in the request's body. A forEach iterator sets the value of
  // the new restaurant's keys to the value of each of the request's
  // body's keys. If there is a problem with restaurant save, log the
  // error, else, send a positive response.
  createAPI: function (req, res, next){
    var newRestaurant = new Restaurant();
    var keys = Object.keys(req.body);
    keys.forEach(function(key){
      newRestaurant[key] = req.body[key];
    });
    newRestaurant.save(function(err){
      if(err) console.log(err);
      else res.send('Good job admin; restaurant created!');
    });
  },

  // API function to show a specific restaurant. Restaurant.findById()
  // matches the id param in the request to an id in the database and
  // the restaurant with that id is rendered through JSON.
  showAPI: function (req, res, next){
    Restaurant.findById({_id: req.params.id}, function (err, restaurant){
      res.json(restaurant);
    })
  },

  // API function to edit a specific restaurant. Restaurant.findById()
  // matches the id param in the request to an id in the database and
  // grabs it. A 'keys' array is created using the keys in the request's
  // body. A forEach iterator sets the value of the restaurant's keys to
  // the value of each of the request's body's keys. The restaurant is
  // then saved to the db and a success response is sent.
  editAPI: function (req, res, next){
    Restaurant.findById(req.params.id, function (err, restaurant){
      var keys = Object.keys(req.body);
      keys.forEach(function(key){
        restaurant[key] = req.body[key];
      });
      restaurant.save();
    });
    res.send('Good job admin; restaurant updated!');
  },

  // API function to delete a specific restaurant.
  // Restaurant.findOneAndRemove() matches the id param in the request
  // to an id in the database and the restaurant with that id is deleted
  // from the db. Success messages or err is rendered through JSON.
  deleteAPI: function (req, res, next){
    Restaurant.findOneAndRemove({_id: req.params.id}, function (err, data){
      if (err) res.json('Bad job admin; restaurant not deleted!');
      else res.json('Good job admin; restaurant deleted!');
    });
  }

}
