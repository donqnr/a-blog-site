const express = require("express"),
      router = express.Router(),
      passport = require("passport"),
      User = require('../models/users'),
      jwt = require('jsonwebtoken');

require("dotenv").config({ path: "./config.env" });

/* router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })); */

  router.post("/login", (req, res, next) => { 
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.status(400).send("Invalid User or Password");
      else {
        req.logIn(user,(err) => {
          if (err) throw err;
          res.send("Succesfully Authenticated");
          console.log(req.user);
        })
      }
    })(req, res, next);
  });


router.post('/signup', (req, res) => {
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
});

router.get("/logout", (req, res) => {
  req.logout(req.user, err => {
    if(err) return next(err);
    res.send("success");
  });
});

router.get("/userbyid", (req, res) => {
  id = req.query.id;
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

router.get("/user", (req, res) => {
  res.send(req.user);
});
module.exports = router;