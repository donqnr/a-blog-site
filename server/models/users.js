const mongoose = require("mongoose"),
        bcrypt = require('bcryptjs');

// Create Schema
var userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true 
        },
        email: {
            type: String,
            required: true
        },
        email_is_verified: {
            type: Boolean,
            default: false
        },
        password: {
            type: String,
            required: true
        },
        date_created: {
            type: Date,
            default: Date.now
        },
        liked_posts: [{
            type: String
        }]
    },
    { strict: false }
);

// Before saving, hash the given password
userSchema.pre('save', function(next) {
    var user = this
  
    if ( !user.isModified('password') ) return next()
  
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
  
userSchema.methods.login = function(password) {
    var user = this
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if ( err ) { reject(err) }
        resolve()
      })
    })
  }

module.exports = mongoose.model("users", userSchema);