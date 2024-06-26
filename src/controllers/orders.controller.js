const order = require("../schema/orders.schema");
const userSchema = require("../schema/user.schema");
const createCheckoutSession = require("../stripe/createCheckoutSession");

exports.getOrders = async (req, res) => {
    try {
        const orders = await order.find();
        if (!orders)
            return res.json({
                message: "Not found",
                code: 404,
            });
        return res.json({
            message: "Success",
            code: 200,
            data: orders,
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};

exports.getOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({
                code: 400,
                message: "Id is required",
            });
        }
        const orders = await order.findOne({ _id: id });
        if (!orders) {
            return res.json({
                code: 404,
                message: "Product not found",
            });
        }
        return res.json({
            message: "Success",
            code: 200,
            data: orders,
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({
                code: 400,
                message: "Id is required",
            });
        }
        const orders = await order.deleteOne({ _id: id });
        if (!orders) {
            return res.json({
                code: 404,
                message: "Product not found",
            });
        }
        return res.json({
            message: "Success",
            code: 200,
            data: orders,
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};

exports.createOrder = async (req, res, next) => {
    try {
        const { price, products, shippingMethod } = req.body;
        if (!price || !products || !shippingMethod) {
            return res.json({
                code: 400,
                message: "Missing required fields",
            });
        }
        const user = await userSchema.findById(req.userToken.id);
        if (!user) {
            return res.json({
                code: 404,
                message: "User not found",
            });
        }
        const newOrder = await order.create({
            price: price,
            articleNumber: products.length,
            shippingMethod: shippingMethod,
            products: products,
        });
        user.orders.push(newOrder._id);
        await user.save();
        return res.json({
            message: "Success",
            code: 200,
            data: newOrder,
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};

exports.createCheckoutSession = async (req, res, next) => {
    if (!req.query.orderId) {
        return res.json({
            code: 400,
            message: "Order id is required",
        });
    }
    try {
        const userOrder = await order.findById(req.query.orderId);
        if (!userOrder) {
            return res.json({
                code: 404,
                message: "Order not found",
            });
        }
        const checkoutUrl = await createCheckoutSession(userOrder);
        return res.json({
            message: "Success",
            code: 200,
            data: checkoutUrl,
        });
    } catch (e) {
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};
