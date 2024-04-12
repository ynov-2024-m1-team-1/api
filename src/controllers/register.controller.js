const User = require("../schema/user.schema.js");
const bcrypt = require("bcrypt");
const senderEmail = require("../brevo/emailSender.js");
const jwt = require("jsonwebtoken");
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
    const { surname, name, email, password, address, postalCode, town, phone } =
        req.body;

    if (
        !surname ||
        !name ||
        !email ||
        !password ||
        !address ||
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
        const existingUserByEmail = await User.findOne({ email });
        const existingUserByPhone = await User.findOne({ phone });
        if (existingUserByEmail || existingUserByPhone) {
            return res.send({
                message:
                    (existingUserByEmail ? "email" : "phone number") +
                    " already exists",
                code: 409,
                data: existingUserByEmail ? email : phone,
            });
        }

        const newUser = await User.create({
            name,
            surname,
            email,
            password: await hashPassword(password),
            address,
            postalCode,
            town,
            phone,
        });

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "365d" });

        res.send({
            message: "User registered successfully",
            code: 200,
            data: newUser,
            token: token, 
        });
        senderEmail(newUser);
    } catch (error) {
        console.error(error);
        return res.send({
            message: error.message,
            code: 500,
        });
    }
};
