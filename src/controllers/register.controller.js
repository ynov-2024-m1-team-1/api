const User = require("../schema/user.schema.js");

exports.Register = async (req, res, next) => {
    const { name, surname, mail, password, adress, postalCode, town, phone } =
        req.body;

    if (
        !name ||
        !surname ||
        !mail ||
        !password ||
        !adress ||
        !postalCode ||
        !town ||
        !phone
    ) {
        return res.send({
            message: "Missing required fields",
            code: 400,
            data: req.body,
        });
    }

    try {
        const existingUser = await User.findOne({ mail });
        if (existingUser) {
            return res.send({
                message: "Email already exists",
                code: 409,
                data: mail,
            });
        }

        const newUser = User.create({
            name,
            surname,
            mail,
            password,
            adress,
            postalCode,
            town,
            phone,
        });
        console.log(newUser);

        await newUser.save();

        return res.send({
            message: "User resgistered successfully",
            code: 200,
            data: newUser,
        });
    } catch (error) {
        console.error(error);
        return res.send({
            message: error.message,
            code: 500,
        });
    }
};
