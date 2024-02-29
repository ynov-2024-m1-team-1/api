const express = require("express");
const checkJWT = require("../middlewares/checkJWT")

const router = express.Router();
const whishlistController = require('../controllers/whishlist.controller');

router.get('/', checkJWT, whishlistController.getWhishlists);
router.post('/', checkJWT, whishlistController.addWhishlist);
router.delete('/', checkJWT, whishlistController.deleteWhishlist);

module.exports = router;
