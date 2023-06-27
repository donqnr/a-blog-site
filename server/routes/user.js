const express = require("express"),
    User = require('../models/users');
    BlogPost = require('../models/blogpost');
    router = express.Router(),
    passport = require("passport"),
    jwt = require("jsonwebtoken");
    
const { GetUserById, ChangeName, ChangePassword } = require("../controllers/userContoller");

require("dotenv").config({ path: "./config.env" });

// Changing the user's name
router.put("/name", ChangeName)

// Changing the user's password
router.put("/password", ChangePassword);

// Get an user by their id
router.get("/:id", GetUserById)


module.exports = router;