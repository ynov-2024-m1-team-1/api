const product = require("../schema/product.schema");
const User = require("../schema/user.schema.js");


exports.getWhishlists = async (req, res) => {
    try {
        const products = await product.find();
        if (!products)
            return res.json({
                message: "Not found",
                code: 404,
            });
        return res.json({
            message: "Success",
            code: 200,
            data: products,
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};

exports.getWhishlist = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({
                code: 400,
                message: "Id is required",
            });
        }
        const products = await product.findOne({ _id: id });
        if (!products) {
            return res.json({
                code: 404,
                message: "Product not found",
            });
        }
        return res.json({
            message: "Success",
            code: 200,
            data: products,
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};

exports.deleteWhishlist = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({
                code: 400,
                message: "Id is required",
            });
        }
        const products = await product.deleteOne({ _id: id });
        if (!products) {
            return res.json({
                code: 404,
                message: "Product not found",
            });
        }
        return res.json({
            message: "Success",
            code: 200,
            data: products,
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};

exports.addWhishlist = async (req, res, next) => {
    try {
        const { name, price, description, image } = req.body;
        if (!name || !price || !description || !image) {
            return res.json({
                code: 400,
                message: "Missing required fields",
            });
        }
        const products = await product.create({
            name,
            price,
            description,
            image,
        });
        return res.json({
            message: "Success",
            code: 200,
            data: products,
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};
