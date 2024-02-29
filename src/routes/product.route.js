const express = require("express");

const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/:id", productController.getProduct);
router.get("/", productController.getProducts);
router.delete("/delete/:id", productController.deleteProduct);
router.put("/update/:id", productController.updateProduct);

module.exports = router;
