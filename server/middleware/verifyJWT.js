const jwt = require('jsonwebtoken');

require("dotenv").config({ path: "./config.env" });

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
}