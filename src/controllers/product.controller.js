const product = require('../schema/product.schema')

exports.getProducts = async(req, res, next)=>{
    try {
        const products = await product.find();
        console.log(`product : ${products}`);
        return res.json(
            {
                message: "Success",
                code: 200,
                data: products,
            },
        );

    } catch(err) {
        console.log(`erreur : ${err}`);
        return res.json(
            {
                message: "Failed to retrieves products",
                code: 400,
            },
        );
    }

}
exports.getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({
                code: 400,
                message: "Id is required",
            })
        }
        const products = await product.findById(String(id));
        if (!product) {
            return res.json({
                code: 404,
                message: "Product not found",
            })
        }
        return res.json(
            {
                message: "Success",
                code: 200,
                data: products,
            },
        );
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json(
            {
                message: "bad request",
                code: 400,
            },
        );
    }
};

