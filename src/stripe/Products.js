const stripe = require("stripe")(
    process.env.DEBUG
        ? process.env.STRIPE_TEST_KEY
        : process.env.STRIPE_LIVE_KEY
);
const product = require("../schema/product.schema");

async function retrieveProducts(products) {
    const stripeProducts = await stripe.products.list();

    const newProducts = products.filter((product) => {
        return !stripeProducts.data.some(
            (stripeProduct) => stripeProduct.id === String(product._id)
        );
    });

    return newProducts;
}

async function createProducts(newProducts) {
    for (let i = 0; i < newProducts.length; i++) {
        const product = await stripe.products.create({
            name: newProducts[i].name,
            id: String(newProducts[i]._id),
        });
    }
}

async function createPrice(newProducts) {
    for (let i = 0; i < newProducts.length; i++) {
        const price = await stripe.prices.create({
            id: String(newProducts[i]._id),
            product: String(newProducts[i]._id),
            unit_amount: newProducts[i].price * 100,
            currency: "eur",
        });
    }
}

async function checkStartStripe() {
    const products = await product.find();
    const newProducts = await retrieveProducts(products);
    await createProducts(newProducts);
    await createPrice(newProducts);
}

async function pushNewProduct(product) {
    const newProduct = await retrieveProducts([product]);
    await createProducts(newProduct);
    await createPrice(newProduct);
}

module.exports = { checkStartStripe, pushNewProduct };
