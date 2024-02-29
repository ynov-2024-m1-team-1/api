const express = require("express");
const router = express.Router();
const productRoute = require("./product.route");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");

router.use('/products', productRoute);
router.use("/auth", authRoute);
router.use('/users', userRoute);

module.exports = router;
