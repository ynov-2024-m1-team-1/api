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
        enum: ["pending payment", "payed", "pending refund", "refunded"],
        default: "pending payment",
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        },
    ],
});

module.exports = mongoose.model("order", orderSchema);
