const express = require('express');
const checkJWT = require('../middlewares/checkJWT')
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/:id', checkJWT, userController.getUser);
router.get('/', checkJWT, userController.getUsers);
router.delete('/delete/:id', checkJWT, userController.deleteUser);
router.put('/update/:id', checkJWT, userController.updateUser);

module.exports = router;
