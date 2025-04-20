const jwt = require("jsonwebtoken");
const JWT_SECRET = "rainbowtable";

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        console.log("❌ No token received");
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error("❌ Token verification failed:", error.message);
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = fetchuser;
