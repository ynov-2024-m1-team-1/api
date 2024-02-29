const User = require("../schema/user.schema.js");

exports.addWhishlist = async (req, res) => {
    console.log(req.userToken);
    console.log(req.query);

    try {
        const userId = req.userToken.id;
        const user = await User.findById(userId);
        console.log(user);

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
    console.log("req.userToken", req.userToken);

    try {
        const userId = req.userToken.id;
        console.log("userId", userId);

        const user = await User.findById(userId);
        console.log(user);

        if (!user) {
            return res.json({
                message: "User not found",
                code: 404,
            });
        }
        return res.json({
            message: "wishlist: user.wishlist",
            code: 200,
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
    console.log("userId");

    const userId = req.userToken.id;
    const user = await User.findById(userId);
    const productId = req.query.productId
    console.log(user);
    if (!user) {
        return res.json({
            message: "User not found",
            code: 404,
        });
    }

    await user.deleteOne(
        { "user.wishlist": productId }
        
      );

    console.log(user);

    res.send(user.wishlist)

   
};
