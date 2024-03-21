const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: Number, required: true },
    town: { type: String, required: true },
    phone: { type: String, required: true },
    admin: { type: Boolean, default: false },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        },
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "order",
        },
    ],
});

module.exports = mongoose.model("user", userSchema);
