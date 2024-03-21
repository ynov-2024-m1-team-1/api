const dotenv = require("dotenv");
dotenv.config();
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
                    currency: "usd",
                    product_data: {
                        name: "T-shirt",
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        allow_promotion_codes: true,
        mode: "payment",
        success_url: "https://example.com/success",
    });
    return session;
}

(async () => {
    //const session = await createCheckoutSession();
    const stripeProducts = await stripe.products.list();
    console.log(stripeProducts);
    console.log(session);
})();

module.exports = createCheckoutSession;
