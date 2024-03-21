/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Operations related to wishlist
 *
 * definitions:
 *   WishlistItem:
 *     type: string
 *
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *       code:
 *         type: integer
 *
 * /wishlist:
 *   get:
 *     summary: Get the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Wishlist found
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
 *                     $ref: '#/definitions/WishlistItem'
 *       '404':
 *         description: Not Found - User or wishlist not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *
 *   post:
 *     summary: Add a product to the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Product added to wishlist successfully
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
 *                     $ref: '#/definitions/WishlistItem'
 *       '404':
 *         description: Not Found - User not found or productId not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *
 *   delete:
 *     summary: Remove a product from the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success - Product removed from wishlist
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
 *                     $ref: '#/definitions/WishlistItem'
 *       '404':
 *         description: Not Found - User not found or productId not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 */

const express = require("express");
const checkJWT = require("../middlewares/checkJWT");

const router = express.Router();
const whishlistController = require("../controllers/whishlist.controller");

router.get("/", checkJWT, whishlistController.getWhishlists);
router.post("/", checkJWT, whishlistController.addWhishlist);
router.delete("/", checkJWT, whishlistController.deleteWhishlist);

module.exports = router;
