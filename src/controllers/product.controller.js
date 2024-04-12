const product = require("../schema/product.schema");
const pushNewProduct = require("../stripe/Products");
const fs = require("fs");

const getRandomImage = () => {
    var imageObject = {
        0: {
            jpg: "https://media.discordapp.net/attachments/1202608300814766080/1228291530670739497/product0.jpeg?ex=662b82a1&is=66190da1&hm=74e5dec8e20eaedeec7fe9db98692badd4dc9930199b3a75c9c08d76df002476&=&format=webp&width=780&height=1056",
            packshot:
                "https://media.discordapp.net/attachments/1202608300814766080/1228291530385788948/product0_packshot.jpeg?ex=662b82a1&is=66190da1&hm=2fdae7fcbe12d54a2103c03fa1b6a88f4b16741c035b9fab25687a36e606fcc7&=&format=webp&width=640&height=866",
        },
        1: {
            jpg: "https://media.discordapp.net/attachments/1202608300814766080/1228291531178512444/product1.jpeg?ex=662b82a1&is=66190da1&hm=11a34195bbe64ff61b7d6ab48272c711afc791375180cd04f5fc057e0ed5cfc0&=&format=webp&width=780&height=1056",
            packshot:
                "https://media.discordapp.net/attachments/1202608300814766080/1228291530951888977/product1_packshot.jpeg?ex=662b82a1&is=66190da1&hm=19e604c8b0a8bfdb3fc5979c37d505918c8358a627f12914ae787b8c0d8da3af&=&format=webp&width=780&height=1056",
        },
        2: {
            jpg: "https://media.discordapp.net/attachments/1202608300814766080/1228291531753132144/product2.jpeg?ex=662b82a1&is=66190da1&hm=131ec1a47bc45c4895fc25fe9d3c8dc5827db85681a40e5ace76da40e23a6015&=&format=webp&width=780&height=1056",
            packshot:
                "https://media.discordapp.net/attachments/1202608300814766080/1228291531467788328/product2_packshot.jpeg?ex=662b82a1&is=66190da1&hm=091de22193ba6229c1002c2ea4088b0e84bcc4c26bc9a749ed5dbfffeac19cc9&=&format=webp&width=780&height=1056",
        },
        3: {
            jpg: "https://media.discordapp.net/attachments/1202608300814766080/1228291532285677682/product3.jpeg?ex=662b82a1&is=66190da1&hm=b6fd64ce40d446e0813fff0f6e11f2f4f086cbe736b2ab1d569d416411ea4c50&=&format=webp&width=780&height=1056",
            packshot:
                "https://media.discordapp.net/attachments/1202608300814766080/1228291532004528138/product3_packshot.jpeg?ex=662b82a1&is=66190da1&hm=45418967edd496c0e03dd248ca409b0bbf28869c888bc8da5e1a6806fa0741c5&=&format=webp&width=640&height=866",
        },
        4: {
            jpg: "https://media.discordapp.net/attachments/1202608300814766080/1228291532889526393/product4.jpeg?ex=662b82a1&is=66190da1&hm=2a88c7e86d4726d32e00975ed217ac68745f45a9ffaec683b2157079c20812c1&=&format=webp&width=780&height=1056",
            packshot:
                "https://media.discordapp.net/attachments/1202608300814766080/1228291532621353051/product4_packshot.jpeg?ex=662b82a1&is=66190da1&hm=aaf7fef3d67481f0a23fe924ee1bfa65566731dc0addf6d855ada1d82296c356&=&format=webp&width=780&height=1056",
        },
    };

    const randomImage = Math.floor(
        Math.random() * (Object.keys(imageObject).length / 2)
    );

    const packshot = imageObject[randomImage].packshot;
    const jpg = imageObject[randomImage].jpg;

    return {
        packshot,
        jpg,
    };
};

exports.getProducts = async (req, res, next) => {
    try {
        const products = await product.find();

        products.forEach((product) => {
            const { packshot, jpg } = getRandomImage();
            product.jpg = jpg;
            product.packshot = packshot;
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
        products.jpg = jpg;
        products.packshot = packshot;

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
