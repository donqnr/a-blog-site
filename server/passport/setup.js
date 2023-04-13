const bcrypt = require("bcryptjs");
const Users = require("../models/users");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

/* passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
        done(err, user);
    });
}); */

passport.deserializeUser((id, done) => {
    Users.findById(id).then((user) => {
        done(null, user);
    }).catch((err) => {
        done(err, false);
    })
});

// Local Strategy
passport.use(
    new Strategy( (username, password, done) => {
       Users.findOne({username: username})
       .then((user)=>{
            if (!user) {
                return done(null, false, {
                    message: "Invalid user or password"
                });
            }
        user.login(password).then(() => {
            return done(null, user);
        })
        }) 
       .catch((err)=>{
            return done(err, false, {
                message: 'Invalid user or password'
            });
       })
    })
);

module.exports = passport;