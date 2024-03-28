const express = require("express");
const router = express.Router();

const webhookStripe = require("../stripe/webhookStripe");

router.post("/webhook", webhookStripe.webhook);

module.exports = router;