const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adress: { type: String, required: true },
    postalCode: { type: Number, required: true },
    town: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    admin: { type: Boolean, default: false },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        },
    ],
});

module.exports = mongoose.model("user", userSchema);
