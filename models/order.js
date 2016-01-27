////////////////////////////////////////////////////////////////////////
//                             Order Model                            //
////////////////////////////////////////////////////////////////////////

// Requires mongoose functions for setting up mongodb schemas
var mongoose = require('mongoose');

// Sets up a restaurant schema with name, address, neighborhood, and
// menu (with dessert items) attributes and exports it.
module.exports = mongoose.model('Order', {
  user_id: String,
  user_address: String,
  driver_user_id: String,
  ready_for_delivery: Boolean,
  dessert_items: [
    {
      item_id: String,
      quantity: Number
    }
  ],
  created_at: {type: Date}
  // time: Mongoose-time
});

