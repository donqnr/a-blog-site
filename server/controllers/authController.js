const express = require("express"),
      router = express.Router(),
      User = require('../models/users'),
      jwt = require('jsonwebtoken');
      bcrypt = require("bcryptjs");

const users = require("../models/users");
const { createToken } = require("../util/jwttoken");

const { userVerification } = require("../middlewares/authMiddleware");

module.exports.Login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        User.findOne({username: username})
        .then(async (user) => {
          const auth = await bcrypt.compare(password,user.password);
    
          if (auth) {
            const token = createToken(user._id);
            res.cookie("token", token, {
               withCredentials: true,
               httpOnly: true,
                sameSite: 'none',
                secure: true,
              });
              res.status(201).json({ message: "Login successful", success: true });
              next();
            } else {
              res.status(401).json({message: "Invalid username or password"})
            }
    
          }).catch((err) => {
            res.status(401).json({ message: "Invalid username or password"})
          });
    
        } catch (error) {
          console.error(error);
          res.status(401).send(error);
        }
};

module.exports.SignUp = async (req, res, next) => {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      if (user.username.length >= 3) {
        user.save()
        .then(() => {
          res.status(201).send("User added");
          console.log("User added");
        }).catch((err) => {
          res.status(400).send(err);
          console.log(err);
        })
      } else {
        res.status(400).send("Username is too short");
      }
};

module.exports.Logout = async (req, res, next) => {
    res.clearCookie("token");
    res.redirect("/")
};