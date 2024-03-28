/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Operations related to orders
 *
 * definitions:
 *   Order:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       price:
 *         type: number
 *       articleNumber:
 *         type: integer
 *       shippingMethod:
 *         type: string
 *       products:
 *         type: array
 *         items:
 *           type: string
 *     required:
 *       - price
 *       - products
 *       - shippingMethod
 *
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *       code:
 *         type: integer
 *
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
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
 *                     $ref: '#/definitions/Order'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Order'
 *     responses:
 *       '201':
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Order'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieval
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Order'
 *       '400':
 *         description: Bad request or missing ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '404':
 *         description: Not Found - Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful deletion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Order'
 *       '400':
 *         description: Bad request or missing ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '404':
 *         description: Not Found - Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 */

const express = require("express");
const checkJWT = require("../middlewares/checkJWT");

const router = express.Router();
const orderController = require("../controllers/orders.controller");

router.get("/:id", checkJWT, orderController.getOrder);
router.get("/", checkJWT, orderController.getOrders);
router.post("/", checkJWT, orderController.createOrder);
router.delete("/delete/:id", checkJWT, orderController.deleteOrder);

module.exports = router;
