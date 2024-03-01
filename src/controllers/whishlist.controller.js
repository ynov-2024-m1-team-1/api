const User = require("../schema/user.schema.js");

exports.addWhishlist = async (req, res) => {
    try {
        const userId = req.userToken.id;
        const user = await User.findById(String(userId));
        if (!user) {
            return res.json({
                message: "User not found",
                code: 404,
            });
        }
        user.wishlist.push(req.query.productId);
        await user.save();
        return res.json({
            message: "Product added to wishlist successfully",
            code: 200,
            data: user.wishlist,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            message: "Internal server error",
            code: 500,
        });
    }
};

exports.getWhishlists = async (req, res) => {
    try {
        const userId = req.userToken.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.json({
                message: "User not found",
                code: 404,
            });
        }
        return res.json({
            message: "whishlist found",
            code: 200,
            data: user.wishlist,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            message: "Internal server error",
            code: 500,
        });
    }
};

exports.deleteWhishlist = async (req, res) => {
    try {
        const userId = req.userToken.id;
        const user = await User.findById(userId);
        const productId = req.query.productId;
        if (!user) {
            return res.json({
                message: "User not found",
                code: 404,
            });
        }
        if (!productId) {
            return res.json({
                code: 404,
                message: "productId not found",
            });
        }
        user.wishlist = user.wishlist.filter(
            (id) => id.toString() !== productId
        );
        await user.save();
        return res.json({
            message: "Success",
            code: 200,
            data: user.wishlist,
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};
