const stripe = require("stripe")(
    process.env.DEBUG
        ? process.env.STRIPE_TEST_KEY
        : process.env.STRIPE_LIVE_KEY
);
const express = require("express");

const router = express.Router();
const endpointSecret =
    "whsec_f653a01976cbb9c429fc94e11018e1301c313d8cfe96203f0be563e972a2fbea";

const webhook = router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
        const sig = req.headers["stripe-signature"];
        if (!sig) {
            return res
                .status(400)
                .send(`Webhook Error: Missing stripe-signature`);
        }
        let event;
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                endpointSecret
            );
        } catch (err) {
            console.error(err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        switch (event.type) {
            case "checkout.session.completed":
                const checkoutSessionCompleted = event.data.object;
                if (
                    checkoutSessionCompleted.payment_status === "paid" &&
                    checkoutSessionCompleted.status === "complete"
                ) {
                    if (checkoutSessionCompleted.customer_details?.email) {
                        const orderId =
                            checkoutSessionCompleted.metadata?.order;
                        const order = await orderSchema.findById(orderId);
                        if (!order) {
                            console.log("Order not found");
                            return;
                        }
                        order.status = "payed";
                        await order.save();
                        console.log("Payment COMPLETED");
                    }
                }
                break;
            default:
                break;
        }

        res.send("OK");
    }
);

exports.webhook = webhook;
