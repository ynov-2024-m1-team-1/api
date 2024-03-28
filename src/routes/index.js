const express = require("express");
const router = express.Router();
const productRoute = require("./product.route");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const wishlistRoute = require("./whishlist.route");
const orderRoute = require("./order.route");

router.use("/products", productRoute);
router.use("/auth", authRoute);
router.use("/whishlist", wishlistRoute);
router.use("/users", userRoute);
router.use("/order", orderRoute);

module.exports = router;
