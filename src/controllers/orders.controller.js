const order = require("../schema/orders.schema");

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
        const newOrder = await order.create({
            price: price,
            articleNumber: products.length,
            shippingMethod: shippingMethod,
            products: products,
        });
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
