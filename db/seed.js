////////////////////////////////////////////////////////////////////////
//                              Seed File                             //
////////////////////////////////////////////////////////////////////////

// Seed based on the database models
var Restaurant = require('../models/restaurant.js');
var User = require('../models/user.js');

////////////////////////////////////////////////////////////////////////
exports.seedAdmins = function seedAdmins(){
  User.find({}).exec(function (err, collection){
    if (collection.length === 0){
      User.create({
        local:{
          "firstName": "edward",
          "lastName": "yu",
          "address": "1933 S Broadway, Los Angeles, CA",
          "email": "ed@ed.com",
          "phoneNumber": "9097200899",
          "password": "ed",
          "admin": true
        }
      }),
      User.create({
        local:{
          "firstName": "edward",
          "lastName": "yu",
          "address": "1933 S Broadway, Los Angeles, CA",
          "email": "ed@ed.com",
          "phoneNumber": "9097200899",
          "password": "ed",
          "admin": true
        }
      }),
      User.create({
        local:{
          "firstName": "edward",
          "lastName": "yu",
          "address": "1933 S Broadway, Los Angeles, CA",
          "email": "ed@ed.com",
          "phoneNumber": "9097200899",
          "password": "ed",
          "admin": true
        }
      })
    }
  })
}
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
          },
          {
            "item": "Guava Cheese",
            "price": "$2.50",
            "available": true
          },
          {
            "item": "Regular cake (with stuff)",
            "price": "$12.00",
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
          },
          {
            "item": "Fried Bananas",
            "price": "$2.00",
            "available": true
          },
          {
            "item": "Tapioca Ballz",
            "price": "$1.12",
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
          },
          {
            "item": "Ice Cream",
            "price": "$1.00",
            "available": true
          },
          {
            "item": "Cooks",
            "price": "$0.50",
            "available": true
          }
        ]
      })

    };
  });
};



// // Creating an ADMIN
// exports.seedAdmin = function seedAdmin(){
//   User.find({}).exec(function (err, collection) {

//       User.create({
//         "local": [
//           {
//             "firstName": "Admin",
//             "lastName": "Mr.Choi",
//             "address": "777 Awesome Ln",
//             "email": "admin@admin.com",
//             "phoneNumber": "123-456-7890",
//             "password": "admin",
//             "driver": false,
//             "admin": true
//           }
//         ]
//       })
//   });
// };
