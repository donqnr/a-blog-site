const { prependListener } = require("../models/users");

const User = require('../models/users'),
    BlogPost = require('../models/blogpost');

const express = require("express"),
    router = express.Router(),
    passport = require("passport");



router.post("/newblogpost", (req, res) => {
    if (req.user) {
        var blogpost = new BlogPost({
            posterId: req.user._id,
            postedBy: req.user._id,
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
    BlogPost.findById(id).populate('postedBy', 'username').lean()
    .then((post) => {
        if (!post) {
            res.send("Blog Post Not Found").status(404);
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
            if (req.user) {
                if (!post.liked_by.includes(req.user._id)) {
                    console.log(req.user._id);
                    post.liked_by.push(req.user._id);
                    post.save();
                    res.send(post).status(200);
                } else  {
                    for ( let i = 0; i < post.liked_by.length; i++ ) {
                        console.log(req.user._id);
                        if (post.liked_by[i] === req.user._id.toString()) {
                            post.liked_by.splice(i,1);
                        }
                    }
                    post.save();
                    res.send(post).status(200);
                }
            }
            
        }).catch ((err) => {
            res.status(401).send(err);
        });
});

router.get("/search",(req,res) => {
    const search_query = req.query.search_query;
    const filter = { title: {$regex: search_query}, };
    BlogPost.find(filter)
    .then((posts) => {
        res.send(posts).status(200);
    }).catch((err) => {
        console.log(err);
        res.status(404).send(err);
    })
});

router.get("/allblogposts",(req,res) => {

    BlogPost.find({}).populate('postedBy', 'username').lean()
        .then((posts) => {
            res.send(posts).status(200);
        }).catch((err) => {
            console.log(err);
            res.status(404).send(err);
        })
});

router.get("/postsbyuser",(req,res) => {
    const userId = req.query.id;
    BlogPost.find({ posterId : userId })
    .then((posts) => {
        res.send(posts).status(200);
    }).catch((err) => {
        console.log(err);
        res.status(404).send(err);
    });
});

router.get("/postslikedby",(req,res) => {
    const userId = req.query.id;
    BlogPost.find({ liked_by : userId })
    .then((posts) => {
        res.send(posts).status(200);
    }).catch((err) => {
        console.log(err);
        res.status(404).send(err);
    })
});

module.exports = router;