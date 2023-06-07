const express = require("express"),
    User = require('../models/users');
    BlogPost = require('../models/blogpost');
    router = express.Router(),
    passport = require("passport"),
    jwt = require("jsonwebtoken");

require("dotenv").config({ path: "./config.env" });

// Changing the user's name
router.put("/name", (req, res, next) => {
    const newName = req.body.newName;
    jwt.verify(req.cookies.token, process.env.JWT_TOKEN_KEY, async (err, data) => { 
        if (err) {
            res.sendStatus(403);
        } else {
            User.findById(data.id)
            .then((user) => { 
                user.username = newName;
                user.save();
                res.status(200).send("Name changed succesfully");
            }).catch((err) => {
                res.status(401).send(err);
            });
        }
    })
});

// Changing the user's password
router.put("/password", (req, res, next) => {
    const newPass = req.body.newPass;
    jwt.verify(req.cookies.token, process.env.JWT_TOKEN_KEY, async (err, data) => { 
        if (err) {
            res.sendStatus(403);
        } else {
            User.findById(data.id)
            .then((user) => {
                user.password = newPass;
                user.save();
                res.status(200).send("succeess");
            }).catch((err) => {
                res.status(401).send(err);
            });
        }
    })
});

// Get an user by their id
router.get("/:id", (req, res) => {
    id = req.params.id;
    User.findById(id)
      .then((user) => {
        const userinfo = {
          username: user.username,
          date_created: user.date_created
        };
        res.send(userinfo).status(200);
      }).catch((err) => {
        console.log(404);
      });
  });

module.exports = router;