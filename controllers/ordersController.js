////////////////////////////////////////////////////////////////////////
//                          Orders Controller                         //
////////////////////////////////////////////////////////////////////////

// Grabs the mongoose functions and Order model from the mongo db
var Order = require('../models/order');
var mongoose = require('mongoose');
var handlebars = require('handlebars');

// Exports restaurant functions
module.exports = {

////////////////////////////////////////////////////////////////////////
//                           View Functions                           //
////////////////////////////////////////////////////////////////////////

// Shows shopping cart
  new: function (req, res, next){
    res.render('orders/shopping_cart');
  },

  show: function (req, res, next){
    Order.findById({_id: req.params.id}, function (err, order){
      res.render('orders/show', {order: order});
    })
  },

  create: function (req, res, next){
    var qxz = req.body.dessert_items;
    console.log(qxz);
    var qxzSplit = qxz.split('qxz');
    var bainas = [];
    for(i=0; i<qxz[qxz.length-1]; i++){
      var start = i * 2;
      bainas.push({item_id: qxzSplit[start], quantity: qxzSplit[start + 1]})
    }
    var newOrder = new Order({
      user_id: req.body.user_id,
      user_address: req.body.user_address,
      ready_for_delivery: true,
      created_at: Date.now(),
      dessert_items: bainas
    });
    newOrder.save(function (err) {
      if (err) console.log(err);
      else res.redirect('/orders/show/' + newOrder.id);
    })
  },

////////////////////////////////////////////////////////////////////////
//                            API Functions                           //
////////////////////////////////////////////////////////////////////////
  // API function to show all restaurants. Restaurant.find({}) grabs
  // them in the database and renders them through JSON.
  allAPI: function (req, res, next){
    Order.find({}, function (err, orders){
      res.json(orders);
    })
  },

  // API function to create a restaurant. A new restaurant is created
  // based on the Restaurant model. A 'keys' array is created using the
  // keys in the request's body. A forEach iterator sets the value of
  // the new restaurant's keys to the value of each of the request's
  // body's keys. If there is a problem with restaurant save, log the
  // error, else, send a positive response.
  createAPI: function (req, res, next){
    var newOrder = new Order();
    var keys = Object.keys(req.body);
    keys.forEach(function(key){
      newOrder[key] = req.body[key];
    });
    newOrder.save(function(err){
      if(err) console.log(err);
      else res.send('Good job admin; order created!');
    });
  },

  // API function to show a specific restaurant. Restaurant.findById()
  // matches the id param in the request to an id in the database and
  // the restaurant with that id is rendered through JSON.
  showAPI: function (req, res, next){
    Order.findById({_id: req.params.id}, function (err, order){
      res.json(order);
    })
  },

  // API function to edit a specific restaurant. Restaurant.findById()
  // matches the id param in the request to an id in the database and
  // grabs it. A 'keys' array is created using the keys in the request's
  // body. A forEach iterator sets the value of the restaurant's keys to
  // the value of each of the request's body's keys. The restaurant is
  // then saved to the db and a success response is sent.
  editAPI: function (req, res, next){
    Order.findById(req.params.id, function (err, order){
      var keys = Object.keys(req.body);
      keys.forEach(function(key){
        order[key] = req.body[key];
      });
      order.save();
    });
    res.send('Good job admin; order updated!');
  },

  // API function to delete a specific restaurant.
  // Restaurant.findOneAndRemove() matches the id param in the request
  // to an id in the database and the restaurant with that id is deleted
  // from the db. Success messages or err is rendered through JSON.
  deleteAPI: function (req, res, next){
    Order.findOneAndRemove({_id: req.params.id}, function (err, data){
      if (err) res.json('Bad job admin; restaurant not deleted!');
      else res.json('Good job admin; restaurant deleted!');
    });
  }

}
