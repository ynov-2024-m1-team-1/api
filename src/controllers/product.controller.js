const product = require("../schema/product.schema");
const pushNewProduct = require("../stripe/Products");
const fs = require("fs");

const getRandomImage = () => {
    const images = fs.readdirSync("./src/public/uploads/");

    const randomImage = Math.floor(Math.random() * (images.length / 2) - 1);

    const packshot = fs.readFileSync(
        `./src/public/uploads/product${randomImage}_packshot.jpeg`,
        { encoding: "base64" }
    );
    const jpg = fs.readFileSync(
        `./src/public/uploads/product${randomImage}.jpeg`,
        { encoding: "base64" }
    );

    return {
        packshot,
        jpg,
    };
};

exports.getProducts = async (req, res, next) => {
    try {
        const products = await product.find();
        if (!products) {
            return res.json({
                code: 404,
                message: "Product not found",
            });
        }

        return res.json({
            message: "Success",
            code: 200,
            data: {
                products,
            },
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "Failed to retrieves products",
            code: 400,
        });
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({
                code: 400,
                message: "Id is required",
            });
        }
        const products = await product.findById(String(id));
        if (!products) {
            return res.json({
                code: 404,
                message: "Product not found",
            });
        }

        const { packshot, jpg } = getRandomImage();
        return res.json({
            message: "Success",
            code: 200,
            data: {
                products,
                packshot,
                jpg,
            },
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        if (!req.userToken.admin) {
            return res.json({
                code: 401,
                message: "Unauthorized",
            });
        }
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

exports.updateProduct = async (req, res, next) => {
    try {
        if (!req.userToken.admin) {
            return res.json({
                code: 401,
                message: "Unauthorized",
            });
        }
        const id = req.params.id;
        const body = req.body;
        if (!id || !body) {
            return res.json({
                code: 400,
                message: "Id is required",
            });
        }
        const products = await product.findByIdAndUpdate(String(id), body, {
            returnDocument: "after",
        });
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

exports.createProduct = async (req, res, next) => {
    if (!req.userToken.admin) {
        return res.json({
            code: 401,
            message: "Unauthorized",
        });
    }
    const body = req.body;
    if (!body) {
        return res.json({
            code: 400,
            message: "Body is required",
        });
    }
    if (!body.name || !body.price || !body.active || !body.description) {
        return res.json({
            code: 400,
            message: "Name, price and active are required",
        });
    }
    try {
        const newProduct = await product.create(body);
        await pushNewProduct(newProduct);
    } catch (e) {
        return res.json({
            code: 400,
            message: "Failed to create product",
        });
    }
    return res.json({
        message: "Success",
        code: 200,
        data: newProduct,
    });
};
