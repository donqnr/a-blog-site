const express = require("express"),
    User = require('../models/users');
    BlogPost = require('../models/blogpost');
    router = express.Router(),
    passport = require("passport"),
    jwt = require('jsonwebtoken');

require("dotenv").config({ path: "./config.env" });

// Changing the user's name
router.put("/name", (req, res, next) => {
    const newName = req.body.newName;
    if (req.user) {
        User.findById(req.user._id)
        .then((user) => {
            user.username = newName;
            user.save();
            res.status(200).send("Name changed succesfully");
        }).catch((err) => {
            res.status(401).send(err);
        });
    } else {
        res.status(401).send(err);
    }(req, res, next);
});

// Changing the user's password
router.put("/password", (req, res, next) => {
    const newPass = req.body.newPass;
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.status(400).send("no");
        else {
            User.findById(req.user._id)
            .then((user) => {
                user.password = newPass;
                user.save();
                res.status(200).send("succeess");
            }).catch((err) => {
                res.status(401).send(err);
            });
        }
    })(req, res, next);
});

module.exports = router;