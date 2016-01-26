////////////////////////////////////////////////////////////////////////
//                       Orders Controller                       //
////////////////////////////////////////////////////////////////////////

// Grabs the mongoose functions and Restaurants model from the mongo db
var Order = require('../models/order');
var mongoose = require('mongoose');

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
    var newOrder = new Order();
    var keys = Object.keys(req.body);
    keys.forEach(function (key) {
      newOrder[key] = req.body[key];
    })
    newOrder.save(function (err) {
      if (err) console.log(err);
      else res.render('users/home_page');
    })
  }




}
