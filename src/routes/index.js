const express = require("express");
const router = express.Router();
const productRoute = require("./product.route");
const authRoute = require("./auth.route");

router.use('/products', productRoute);
router.use("/auth", authRoute);

module.exports = router;
