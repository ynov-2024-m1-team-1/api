const express = require("express");
const checkJWT = require("../middlewares/checkJWT");

const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/:id', productController.getProduct);
router.get('/', checkJWT, productController.getProducts);
router.delete('/delete/:id', productController.deleteProduct);
router.put('/update/:id', productController.updateProduct);

module.exports = router;
