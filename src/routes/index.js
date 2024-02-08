const express = require('express');
const productRoute = require('./product.route');
const authRoute = require('./auth.route');

const router = express.Router();

router.use('/products', productRoute);
router.use('/auth', authRoute);


module.exports = router;
