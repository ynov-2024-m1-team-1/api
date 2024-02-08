const express = require("express");
const router = express.Router();
// const productRoute = require("./product.route");
const authRoute = require("./auth.route");

router.use("/auth", authRoute);
//router.use('/products', productRoute);

module.exports = router;
