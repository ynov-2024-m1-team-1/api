const express = require("express");

const router = express.Router();
const whishlistController = require('../controllers/whishlist.controller');

router.get('/:id', whishlistController.getWhishlist); 
router.get('/', whishlistController.getWhishlists);
router.post('/', whishlistController.addWhishlist);
router.delete('/delete/:id', whishlistController.deleteWhishlist);

module.exports = router;
