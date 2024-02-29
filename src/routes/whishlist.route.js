const express = require("express");
const checkJWT = require("../middlewares/checkJWT")

const router = express.Router();
const whishlistController = require('../controllers/whishlist.controller');

router.get('/:id', checkJWT, whishlistController.getWhishlist); 
router.get('/', checkJWT, whishlistController.getWhishlists);
router.post('/', checkJWT, whishlistController.addWhishlist);
router.delete('/delete/:id', checkJWT, whishlistController.deleteWhishlist);

module.exports = router;
