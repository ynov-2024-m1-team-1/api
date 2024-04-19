/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 *
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       name:
 *         type: string
 *         description: Name of the product
 *       description:
 *         type: string
 *         description: Description of the product
 *       image:
 *         type: string
 *         description: URL of the product image
 *       active:
 *         type: boolean
 *         description: Indicates if the product is active
 *       packshot:
 *         type: string
 *         description: URL of the product packshot image
 *       price:
 *         type: string
 *         description: Price of the product
 *
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *       code:
 *         type: integer
 *
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieval
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       '400':
 *         description: Bad request or missing ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '404':
 *         description: Not Found - Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: Successful retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Product'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *
 * /products/delete/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful deletion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       '400':
 *         description: Bad request or missing ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '401':
 *         description: Unauthorized - User not admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '404':
 *         description: Not Found - Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *
 * /products/update/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Product'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       '400':
 *         description: Bad request or missing ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '401':
 *         description: Unauthorized - User not admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '404':
 *         description: Not Found - Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *
 */

const express = require("express");
const checkJWT = require("../middlewares/checkJWT");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/:id", productController.getProduct);
router.get("/", productController.getProducts);
router.delete("/delete/:id", checkJWT, productController.deleteProduct);
router.post("/update/:id", checkJWT, productController.updateProduct);
router.post("/create", checkJWT, productController.createProduct);

module.exports = router;
