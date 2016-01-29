////////////////////////////////////////////////////////////////////////
//                          Restaurant Model                          //
////////////////////////////////////////////////////////////////////////

// Requires mongoose functions for setting up mongodb schemas
var mongoose = require('mongoose');

// Sets up a restaurant schema with name, address, neighborhood, and
// menu (with dessert items) attributes and exports it.
module.exports = mongoose.model('Restaurant', {
  name: String,
  address: String,
  neighborhood: String,
  menu: [
    {
      item: String,
      price: String,
      img_url: String,
      available: Boolean
    }
  ]
});

