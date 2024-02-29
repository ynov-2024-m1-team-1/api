const user = require('../schema/user.schema')

exports.getUsers = async(req, res, next)=>{
    try {
        const users = await user.find();
        if (!users) {
            return res.json({
                code: 404,
                message: "User not found",
            })
        }
        return res.json(
            {
                message: "Success",
                code: 200,
                data: users,
            },
        );

    } catch(err) {
        console.log(`erreur : ${err}`);
        return res.json(
            {
                message: "Failed to retrieves users",
                code: 400,
            },
        );
    }

}

exports.getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({
                code: 400,
                message: "Id is required",
            })
        }
        const users = await user.findById(String(id));
        if (!users) {
            return res.json({
                code: 404,
                message: "User not found",
            })
        }

            return res.json({
                message: "Success",
                code: 200,
                data: users,
            });
        
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

exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({
                code: 400,
                message: "Id is required",
            })
        }
        const users = await user.deleteOne({ _id: id });
        if (!users) {
            return res.json({
                code: 404,
                message: "User not found",
            })
        }
        return res.json(
            {
                message: "Success",
                code: 200,
                data: users,
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

exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        if (!id || !body) {
            return res.json({
                code: 400,
                message: "Id is required",
            })
        }
        const users = await user.updateOne({ _id: id }, body);
        if (!users) {
            return res.json({
                code: 404,
                message: "User not found",
            })
        }
        return res.json({
            message: "Success",
            code: 200,
            data: users,
        });
        
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
