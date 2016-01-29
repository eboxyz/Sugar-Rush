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
          "firstName": "Nick",
          "lastName": "Castañeda",
          "address": "1933 S Broadway, Los Angeles, CA",
          "email": "nick@nite.com",
          "phoneNumber": "999-999-9999",
          "password": "nick",
          "profilePicture": "http://i.imgur.com/Gl32UOu.jpg",
          "admin": true
        }
      }),
      User.create({
        local:{
          "firstName": "Edward",
          "lastName": "Yu",
          "address": "1933 S Broadway, Los Angeles, CA",
          "email": "ed@ed.com",
          "phoneNumber": "999-999-9999",
          "password": "ed",
          "admin": true
        }
      }),
      User.create({
        local:{
          "firstName": "GaMaur",
          "lastName": "Landrum",
          "address": "1933 S Broadway, Los Angeles, CA",
          "email": "gamaur@gamaur.com",
          "phoneNumber": "999-999-9999",
          "password": "gamaur",
          "admin": true
        }
      }),
      User.create({
        local:{
          "firstName": "Fran",
          "lastName": "Budiman",
          "address": "1933 S Broadway, Los Angeles, CA",
          "email": "fran@fran.com",
          "phoneNumber": "999-999-9999",
          "password": "fran",
          "admin": true
        }
      }),
      User.create({
        local:{
          "firstName": "Thomas",
          "lastName": "Choi",
          "address": "1933 S Broadway, Los Angeles, CA",
          "email": "thomas@thomas.com",
          "phoneNumber": "999-999-9999",
          "password": "thomas",
          "admin": true
        }
      })
    }
  })
},

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
            "available": true,
            "img_url": "http://www.portosbakery.com/sites/default/files/styles/product-detail250/public/Cheese%20Roll%20Dozen.jpg?itok=2TSPoohN"
          },
          {
            "item": "Guava Cheese",
            "price": "$2.50",
            "available": true,
            "img_url": "http://s3.amazonaws.com/foodspotting-ec2/reviews/1118402/thumb_600.jpg?1323566474"
          },
          {
            "item": "Birthday Cake",
            "price": "$12.00",
            "available": true,
            "img_url": "http://www.portosbakery.com/sites/default/files/styles/product-detail250/public/Parisian%20Chocolate%20Cake%209%20inches%20round.jpg?itok=MK5UUai2"
          },
          {
            "item": "It's your birthday",
            "price": "$12.00",
            "available": true,
            "img_url": "http://www.portosbakery.com/sites/default/files/styles/product-detail250/public/Parisian%20Chocolate%20Cake%209%20inches%20round.jpg?itok=MK5UUai2"
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
            "img_url": "http://2.bp.blogspot.com/-m9h7UOSQjC4/Tc6nO64pA0I/AAAAAAAAFJc/lkCtZeN4ios/s1600/mango+sticky+rice.jpg",
            "available": true
          },
          {
            "item": "Fried Bananas",
            "price": "$2.00",
            "img_url": "https://s-media-cache-ak0.pinimg.com/236x/68/1b/ff/681bff59297d7b076530dc42d0eaa52d.jpg",
            "available": true
          },
          {
            "item": "Tapioca Ballz",
            "price": "$1.12",
            "img_url": "http://33.media.tumblr.com/941b2b0c87a689e2c3ee7f0903d739d8/tumblr_inline_n6d630Qlx71sg7kqe.jpg",
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
            "img_url": "http://vignette2.wikia.nocookie.net/ronaldmcdonald/images/6/6b/Screen_Shot_2011-12-05_at_9.08.27_PM.png/revision/latest?cb=20111206030909",
            "available": true,
          },
          {
            "item": "Apple Pie",
            "price": "$1.00",
            "img_url": "http://sbrownehr.com/wp-content/uploads/2015/03/McDonalds-Apple-Pie.jpg",
            "available": false,
          },
          {
            "item": "Ice Cream",
            "price": "$1.00",
            "img_url": "http://s3-media2.fl.yelpcdn.com/bphoto/B0nM9-EAzBIy3BAcFg0Y9g/o.jpg",
            "available": true
          },
          {
            "item": "Cookies",
            "price": "$0.50",
            "img_url": "http://www.mcdonalds.com/content/dam/McDonalds/item/mcdonalds-Chocolate-Chip-Cookie.png",
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
