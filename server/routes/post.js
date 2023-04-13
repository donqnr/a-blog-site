const blogpost = require("../models/blogpost");

const express = require("express"),
      router = express.Router(),
      passport = require("passport"),
      User = require('../models/users');
      BlogPost = require('../models/blogpost');

router.post("/newblogpost", (req, res) => {
    if (req.user) {
        var blogpost = new BlogPost({
            posterId: req.user._id,
            title: req.body.title,
            text: req.body.text,
        })
        blogpost.save();
        res.status(200).send(blogpost);
    } else {
        res.status(401).send("User required");
    }
});

router.get("/blogpost",(req, res) => {
    const id = req.query.id;
    BlogPost.findById(id)
    .then((post) => {
        if (!post) {
            res.status(404).send("Blog Post Not Found");
        } else {
            res.send(post).status(200);
        }
    }).catch((err) => {
        res.status(404).send("Could not find the blog post");
    });
});

router.get("/allblogposts",(req,res) => {
    BlogPost.find({})
        .then((posts) => {
            res.send(posts).status(200);
        }).catch((err) => {
            console.log(err);
            res.status(404).send(err);
        })
});

module.exports = router;