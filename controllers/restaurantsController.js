var Restaurant = require('../models/restaurant');
var mongoose = require('mongoose');

module.exports = {

  // View functions
















  // API functions
  //
  allAPI: function (req, res, next){
    Restaurant.find({}, function (err, restaurants){
      res.json(restaurants);
    })
  },

  //
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

  //
  showAPI: function (req, res, next){
    Restaurant.findById({_id: req.params.id}, function (err, restaurant){
      res.json(restaurant);
    })
  },

  //
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

  // took out req.body
  deleteAPI: function (req, res, next){
    Restaurant.findOneAndRemove({_id: req.params.id}, function (err, data){
      res.json('Good job admin; restaurant deleted!');
    });
  }

}
