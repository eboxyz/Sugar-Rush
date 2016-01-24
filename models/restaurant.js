var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
  name: String,
  address: String,
  neighborhood: String,
  menu: [
    {
      item: String,
      price: String,
      available: Boolean
    }
  ]
})


module.exports = mongoose.model('Restaurant', restaurantSchema);

