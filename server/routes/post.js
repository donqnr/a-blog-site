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

router.post("/editblogpost", (req, res) => {
    const postId = req.body.postId;
    const newTitle = req.body.newTitle;
    const newText = req.body.newText;
    BlogPost.findById(postId)
    .then((post) => {
        // Check if the user is the same as the one who made the post
        // Not sure how secure this method is
        if (req.user && req.user._id == post.posterId) { 
            post.title = newTitle;          
            post.text = newText;
            post.last_edited = Date.now();
            post.save();
            res.status(200).send(post);
        } else {
            res.status(401).send("Unauthorized");
        }
    }).catch((err) => {
        res.status(404).send(err);
    });
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

router.post("/like",(req, res) => {
    const postId = req.body.postId;
    BlogPost.findById(postId)
    .then((post) => {

    });
});

router.get("/search",(req,res) => {
    
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