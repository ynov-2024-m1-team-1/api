// const stripe = require("stripe")(
//     process.env.DEBUG
//         ? process.env.STRIPE_TEST_KEY
//         : process.env.STRIPE_LIVE_KEY
// );
// const product = require("../schema/product.schema");

// async function retrieveProducts(products) {
//     const stripeProducts = await stripe.products.list();

//     const newProducts = products.filter((product) => {
//         return !stripeProducts.data.some(
//             (stripeProduct) => stripeProduct.id === String(product._id)
//         );
//     });

//     return newProducts;
// }

// async function createProducts(newProducts) {
//     for (let i = 0; i < newProducts.length; i++) {
//         const product = await stripe.products.create({
//             name: newProducts[i].name,
//             id: String(newProducts[i]._id),
//             default_price_data: {
//                 currency: "eur",
//                 unit_amount: newProducts[i].price * 100,
//             },
//         });
//     }
// }

// async function checkStartStripe() {
//     const products = await product.find();
//     const newProducts = await retrieveProducts(products);
//     await createProducts(newProducts);
// }

// async function pushNewProduct(product) {
//     const newProduct = await retrieveProducts([product]);
//     await createProducts(newProduct);
// }

// module.exports = { checkStartStripe, pushNewProduct };
