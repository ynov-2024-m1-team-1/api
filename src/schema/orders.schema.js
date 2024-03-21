const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    price: { type: Number, required: true },
    articleNumber: { type: Number, required: true },
    shippingMethod: {
        type: String,
        required: true,
        enum: ["standard", "pick-up"],
    },
    date: { type: Date, default: Date.now },
    status: {
        type: String,
        required: true,
        enum: ["payed", "pending refund", "refunded"],
    },
});

module.exports = mongoose.model("order", orderSchema);
