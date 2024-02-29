const express = require("express");
const checkJWT = require("../middlewares/checkJWT")

const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/:id", checkJWT, productController.getProduct);
router.get("/", checkJWT, productController.getProducts);
router.delete("/delete/:id", checkJWT, productController.deleteProduct);
router.put("/update/:id", checkJWT, productController.updateProduct);

module.exports = router;
