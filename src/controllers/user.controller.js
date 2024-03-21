const user = require("../schema/user.schema");

exports.getUsers = async (req, res, next) => {
    if (!req.userToken.admin) {
        return res.json({
            code: 401,
            message: "Admin access required",
        });
    }
    try {
        const users = await user.find();
        if (!users) {
            return res.json({
                code: 404,
                message: "User not found",
            });
        }
        return res.json({
            message: "Success",
            code: 200,
            data: users,
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "Failed to retrieves users",
            code: 400,
        });
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({
                code: 400,
                message: "Id is required",
            });
        }
        if (id !== req.userToken.id || req.userToken.admin != true) {
            return res.json({
                code: 401,
                message: "Unauthorized",
            });
        }
        const users = await user.findById(String(id));
        if (!users) {
            return res.json({
                code: 404,
                message: "User not found",
            });
        }

        return res.json({
            message: "Success",
            code: 200,
            data: users,
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const id = req.userToken.id;
        if (!id) {
            return res.json({
                code: 400,
                message: "Id is required",
            });
        }
        const users = await user.findById(String(id));
        if (!users) {
            return res.json({
                code: 404,
                message: "User not found",
            });
        }

        return res.json({
            message: "Success",
            code: 200,
            data: users,
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({
                code: 400,
                message: "Id is required",
            });
        }
        if (id !== req.userToken.id || req.userToken.admin != true) {
            return res.json({
                code: 401,
                message: "Unauthorized",
            });
        }
        const users = await user.deleteOne({ _id: id });
        if (!users) {
            return res.json({
                code: 404,
                message: "User not found",
            });
        }
        return res.json({
            message: "Success",
            code: 200,
            data: users,
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        if (!id || !body) {
            return res.json({
                code: 400,
                message: "Id is required",
            });
        }
        if (id !== req.userToken.id || req.userToken.admin != true) {
            return res.json({
                code: 401,
                message: "Unauthorized",
            });
        }
        const users = await user.findByIdAndUpdate(String(id), body, {
            returnDocument: "after",
        });
        if (!users) {
            return res.json({
                code: 404,
                message: "User not found",
            });
        }
        return res.json({
            message: "Success",
            code: 200,
            data: users,
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};
