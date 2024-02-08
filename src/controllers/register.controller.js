const User = require("../schema/user.schema.js");
const bcrypt = require("bcrypt");

const saltRounds = 10;

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

exports.Register = async (req, res, next) => {
    const { firstname, lastname, mail, password, adress, postalCode, town, phone } =
        req.body;

    if (
        !firstname ||
        !lastname ||
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
        });
    }

    try {
        const existingUserByEmail = await User.findOne({ mail });
        const existingUserByPhone = await User.findOne({ phone });
        if (existingUserByEmail || existingUserByPhone) {
            return res.send({
                message:
                    (existingUserByEmail ? "email" : "phone number") +
                    " already exists",
                code: 409,
                data: existingUserByEmail ? mail : phone,
            });
        }

        const newUser = await User.create({
            firstname,
            lastname,
            mail,
            password: await hashPassword(password),
            adress,
            postalCode,
            town,
            phone,
        });
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
