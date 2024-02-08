const mongoose = require("mongoose");

function mongoConnect() {
    mongoose
        .connect(
            `mongodb+srv://Flo:${process.env.MONGO_PASS}@myappcluster.1uomsia.mongodb.net/?retryWrites=true&w=majority`
        )
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.log("Connection failed", err);
        });
}

module.exports = mongoConnect();