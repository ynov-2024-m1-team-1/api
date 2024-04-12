const dotenv = require("dotenv");
const productSchema = require("../schema/product.schema");
dotenv.config();
const stripe = require("stripe")(
    process.env.DEBUG
        ? process.env.STRIPE_TEST_KEY
        : process.env.STRIPE_LIVE_KEY
);

require("../mongoConnection");

async function createPriceArray(order) {
    const arrayOfIds = order.products.map((e) => {
        return String(e);
    });
    const foundDocuments = await productSchema.find({
        _id: { $in: arrayOfIds },
    });
    const arrayOfProductId = foundDocuments.map((e) => {
        return String(e._id);
    });
    const stripeProducts = await stripe.products.list({
        active: true,
        ids: arrayOfProductId,
    });
    const PriceArray = stripeProducts.data.map((e) => {
        return String(e.default_price);
    });
    const lineItems = PriceArray.map((e) => {
        return { quantity: 1, price: e };
    });

    return lineItems;
}

async function createCheckoutSession(order) {
    const priceArray = await createPriceArray(order);

    const session = await stripe.checkout.sessions.create({
        line_items: priceArray,
        allow_promotion_codes: true,
        mode: "payment",
        shipping_address_collection:
            order.shippingMethod === "standard"
                ? {
                      allowed_countries: ["FR"],
                  }
                : {},
        success_url: "https://team.faldin.xyz",
        cancel_url: "https://team.faldin.xyz/cart",
        metadat: {
            order: order._id,
        },
    });
    return session.url;
}

module.exports = createCheckoutSession;
