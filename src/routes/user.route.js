const express = require("express");

const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/:id', userController.getUser);
router.get('/', userController.getUsers);
router.delete('/delete/:id', userController.deleteUser);
router.put('/update/:id', userController.updateUser);

module.exports = router;
