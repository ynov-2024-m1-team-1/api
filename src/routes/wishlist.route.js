const express = require("express");
const checkJWT = require("../middlewares/checkJWT")

const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');

router.get('/', checkJWT, wishlistController.getWishlists);
router.post('/', checkJWT, wishlistController.addWishlist);
router.delete('/:id', checkJWT, wishlistController.deleteWishlist);

module.exports = router;
