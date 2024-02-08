const express = require('express');

const router = express.Router();
const registerController = require('./controllers/register.controller');

router.get('/register', registerController.register);

module.exports = router;
