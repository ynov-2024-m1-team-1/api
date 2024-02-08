const User = require("../schema/user.schema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Login = async (req, res, next) => {
    const { mail, password } = req.body;
    if (!mail || !password) {
        return res.send({ 
            message: "Missing email or password", 
            code: 400 });
    }
    try {
        const user = await User.findOne({ mail });
        if (!user) {
            return res.send({ 
            message: "User not found", 
            code: 404 });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.send({ message: "Incorrect password", code: 401 });
        }
        const token = jwt.sign({ 
            id: user._id,
            admin: user.admin
            }, 
            process.env.JWT_SECRET, {expiresIn: "365d"})
        
        return res.send({ 
            message: "Login successful", 
            code: 200,
            data: token
            });
    } catch (error) {
        console.error(error);
        return res.send({ message: error.message, code: 500 });
    }
};
