const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

    lastname: { type: String, required: true},
    surname: { type: String, required: true},
    mail: { type: String, required: true},
    password: { type: String, required: true},

    adresse: { type: String, required: true},
    codePostal: { type: Number, required: true},
    ville: { type: String, required: true},
    telephone: { type: String, required: true},
    admin: { type: Boolean, default: false},
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        }
    ]
});
 
module.exports = mongoose.model('user', userSchema);