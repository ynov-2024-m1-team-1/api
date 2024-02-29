const express = require("express");
const router = express.Router();
const checkJWT = require("../middlewares/checkJWT");

const productRoute = require("./product.route");
const authRoute = require("./auth.route");
const wishlistRoute = require("./whishlist.route");

router.use('/products', productRoute);
router.use("/auth", authRoute);
router.use("/whishlist", checkJWT, wishlistRoute);


module.exports = router;
