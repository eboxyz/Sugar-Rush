////////////////////////////////////////////////////////////////////////
//                              Seed File                             //
////////////////////////////////////////////////////////////////////////

// Seed based on the database models
var Restaurant = require('../models/restaurant.js');
var User = require('../models/user.js');

////////////////////////////////////////////////////////////////////////

// Seed function called in server.js. If the restaurant database is
// empty, insert these restaurant models into the database.
exports.seedRestaurants = function seedRestaurants(){
  Restaurant.find({}).exec(function (err, collection) {
    if (collection.length === 0) {

      Restaurant.create({
        "name": "Portos",
        "address": "123 Dank St.",
        "neighborhood": "Echo Park",
        "menu": [
          {
            "item": "Cheese Rolls",
            "price": "$1.00",
            "available": true
          }
        ]
      }),

      Restaurant.create({
        "neighborhood": "East Los",
        "address": "456 Dankity-Dank St.",
        "name": "Night + Market",
        "menu": [
          {
            "item": "Mango Sticky Rice",
            "price": "$3.00",
            "available": true
          }
        ]
      }),

      Restaurant.create({
        "neighborhood": "DTLA",
        "address": "789 Broadway St.",
        "name": "McDonalds",
        "menu": [
          {
            "item": "McFlurry",
            "price": "$2.00",
            "available": true,
          },
          {
            "item": "Apple Pie",
            "price": "$1.00",
            "available": false,
          }
        ]
      })

    };
  });
};

