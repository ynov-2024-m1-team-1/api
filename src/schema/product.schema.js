const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    image: { type: String, required: false },
    active: { type: Boolean, required: true, default: true },
    packshot: { type: String, required: false },
    price: { type: String, required: true },
});

module.exports = mongoose.model("product", productSchema);
