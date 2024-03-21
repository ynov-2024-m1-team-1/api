const stripe = require("stripe")(
    process.env.DEBUG
        ? process.env.STRIPE_TEST_KEY
        : process.env.STRIPE_LIVE_KEY
);

async function createCheckoutSession(user) {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: "Access to SWSPwned code",
                    },
                    unit_amount: 200,
                },
                quantity: 1,
            },
        ],
        allow_promotion_codes: true,
        mode: "payment",
        success_url: TEST
            ? `http://localhost:3001/code?session_id={CHECKOUT_SESSION_ID}`
            : `${process.env.FRONT_URL}/code?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: TEST
            ? "http://localhost:3001/"
            : process.env.FRONT_URL + "/",
        metadata: {
            id,
            date,
            start,
        },
    });
    return session;
}

module.exports = createCheckoutSession;
