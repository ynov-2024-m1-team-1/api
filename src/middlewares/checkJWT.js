const jwt = require("jsonwebtoken");

const checkjwt = (err, req, res, next) => {
    console.log("test")

    const jwtHeader = req.headers.authorization
    if (!jwtHeader) {
        return res.status(401).json({ message: "jwt not found" });
    }
    const token = jwtHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "jwt not valid" });
        }

        console.log(user)




        req.user = user;
        next();
    });   
};

module.exports = checkjwt;
