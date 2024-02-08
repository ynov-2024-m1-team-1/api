const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({

    name: { type: String, required: true},
    description: String,
    image: { type: String, required: true},
    active: { type: Boolean, required: true},
    packshot: { type: String, required: true},
    price: { type: String, required: true},
});
 
module.exports = mongoose.model('product', productSchema);