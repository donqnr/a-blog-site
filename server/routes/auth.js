const express = require("express"),
      router = express.Router(),
      passport = require("passport"),
      User = require('../models/users'),
      jwt = require('jsonwebtoken');
      bcrypt = require("bcryptjs");

const users = require("../models/users");
const { createToken } = require("../util/jwttoken");

const { userVerification } = require("../middlewares/authMiddleware");
const { Login, Logout, SignUp } = require("../controllers/authController");

require("dotenv").config({ path: "./config.env" });

router.post("/login", Login);

router.post('/signup', SignUp);

router.get("/logout", Logout);

router.get("/user", (req, res) => {
  res.send(req.user);
});

router.post("/", userVerification);

module.exports = router;