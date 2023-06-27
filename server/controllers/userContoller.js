const User = require('../models/users');

const jwt = require("jsonwebtoken");

module.exports.GetUserById = async (req, res, next) => {
    id = req.params.id;
    User.findById(id)
      .then((user) => {
        const userinfo = {
          username: user.username,
          date_created: user.date_created
        };
        res.send(userinfo).status(200);
      }).catch((err) => {
        res.sendStatus(404);
        console.log(404);
      });
};

module.exports.ChangeName = async (req, res, next) => {
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
};

module.exports.ChangePassword = async (req, res, next) => {
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
};