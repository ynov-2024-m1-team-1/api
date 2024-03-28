/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 *
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       firstname:
 *         type: string
 *         description: First name of the user
 *       lastname:
 *         type: string
 *         description: Last name of the user
 *       mail:
 *         type: string
 *         description: Email address of the user
 *       password:
 *         type: string
 *         description: Password of the user
 *       adress:
 *         type: string
 *         description: Address of the user
 *       postalCode:
 *         type: number
 *         description: Postal code of the user
 *       town:
 *         type: string
 *         description: Town of the user
 *       phone:
 *         type: string
 *         description: Phone number of the user
 *       admin:
 *         type: boolean
 *         default: false
 *         description: Indicates if the user is an admin
 *       wishlist:
 *         type: array
 *         items:
 *           type: string
 *         description: Array of product IDs in the user's wishlist
 *
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *       code:
 *         type: integer
 *
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful retrieval
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       '400':
 *         description: Bad request or missing ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '401':
 *         description: Unauthorized - User not admin or not the owner of the profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '404':
 *         description: Not Found - User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
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
 *                     $ref: '#/definitions/User'
 *       '401':
 *         description: Unauthorized - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '404':
 *         description: Not Found - Users not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
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
 *               $ref: '#/definitions/User'
 *       '400':
 *         description: Bad request or missing ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '401':
 *         description: Unauthorized - User not admin or not the owner of the profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '404':
 *         description: Not Found - User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *
 * /users/update/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       '400':
 *         description: Bad request or missing ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '401':
 *         description: Unauthorized - User not admin or not the owner of the profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '404':
 *         description: Not Found - User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *
 */

const express = require("express");
const checkJWT = require("../middlewares/checkJWT");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/:id", checkJWT, userController.getUser);
router.get("/", checkJWT, userController.getUsers);
router.get("/me", checkJWT, userController.getMe);
router.delete("/delete/:id", checkJWT, userController.deleteUser);
router.put("/update/:id", checkJWT, userController.updateUser);

module.exports = router;
