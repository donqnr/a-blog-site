
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.checkToken = (req, res, next) => {
    const token = req.cookies.token;

    if(token !== 'undefined') {
        
    }

}