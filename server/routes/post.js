const { prependListener } = require("../models/users");

const User = require('../models/users'),
    BlogPost = require('../models/blogpost');

const express = require("express"),
    router = express.Router(),
    passport = require("passport");
    jwt = require("jsonwebtoken");

const { userVerification } = require("../middlewares/authMiddleware");

// Get all the blog posts
// This works fine enough when there's not much in the database
// Consider limits if the database gets large
/* router.get("/",(req,res) => {
    const page = req.query.page || 1;
    const amount = req.query.amount || 10;
    const limit = amount * page;
    const skip = limit - amount;
    BlogPost.find({}).populate('postedBy', 'username').lean()
    .limit(limit)
    .skip(skip)
    .sort({date_created: -1})
        .then((posts) => {
            res.send(posts).status(200);
        }).catch((err) => {
            console.log(err);
            res.status(404).send(err);
        })
}); */

router.get("/",(req,res) => {
    const page = req.query.page || 1;
    const perPage = req.query.amount || 10;
    const limit = perPage * page;
    const skip = limit - perPage;

    const search = req.query.search || "";

    const filter = { $or: [
        { title: {$regex: search, $options: "i"}},
        { text: {$regex: search, $options: "i"}}
        ] 
    };

    if (skip < 0) {
        skip = 0;
    }

    BlogPost.count(filter)
    .then((postAmount) => {

        const pageCount = Math.ceil(postAmount / perPage);

        BlogPost.find(filter).populate('postedBy', 'username').lean()
        .sort({date_created: -1})
        .skip(skip)
        .limit(perPage)
        .then((posts) => {
            res.set({
                'Page-Amount': pageCount
            });
            res.status(200).send(posts);
        }).catch((err) => {
            console.log(err);
            res.status(404).send(err);
        })

    }).catch((err) => {
        console.log(err);
        res.status(404).send(err);
    });
});

// Get a blog post
router.get("/:postId",(req, res) => {
    const postId = req.params.postId;
    BlogPost.findById(postId).populate('postedBy', 'username').lean()
    .then((post) => {
        res.send(post).status(200);
    }).catch((err) => {
        res.status(404).send("Could not find the blog post");
    });
});

// Posting a new blog post
router.post("/new", (req, res) => {
    console.log(req.cookies.token);

    // Refactor token verification to a middleware
    jwt.verify(req.cookies.token, process.env.JWT_TOKEN_KEY, async (err, data) => {
        if (err) {
            console.log('nope');
            res.sendStatus(403);
        } else {
            var blogpost = new BlogPost({
                postedBy: data.id,
                title: req.body.title,
                text: req.body.text,
            })
            blogpost.save();
            res.status(200).send(blogpost);
        }
    });
});

// Editing an existing blog post
router.patch("/edit", (req, res) => {
    const postId = req.body.postId;
    const newTitle = req.body.newTitle;
    const newText = req.body.newText;
    BlogPost.findById(postId)
    .then((post) => {
        // Refactor token verification to a middleware
        jwt.verify(req.cookies.token, process.env.JWT_TOKEN_KEY, async (err, data) => {
            if (err) {
                console.log('nope');
                res.sendStatus(403);
            } else {
                // Check if the user is the same as the one who made the post
                // Not sure how secure this method is
                if (data.id == post.postedBy || data.id == post.posterId) {
                    post.title = newTitle;          
                    post.text = newText;
                    post.last_edited = Date.now();
                    post.save();
                    res.status(200).send(post);
                } else {
                    res.sendStatus(403);
                }

            }
        });
    }).catch((err) => {
        res.status(404).send(err);
    });
});

// Deleting a blog post
router.delete("/:id",(req, res) => {
    const postId = req.query.id;
    BlogPost.findById(postId)
    .then((post) => {
        // Refactor token verification to a middleware
        jwt.verify(req.cookies.token, process.env.JWT_TOKEN_KEY, async (err, data) => { 
            if (err) {
                console.log('nope');
                res.sendStatus(403);
            } else {
                // Check if the user is the same as the one who made the post
                // Not sure how secure this method is
                if (data.id == post.postedBy || data.id == post.posterId) { 
                    BlogPost.findByIdAndDelete(postId).then((res) => {
                        console.log(res);
                    }).catch((err) => {
                        console.log(err);
                    });
                    res.status(200).send("Delorted");
                } else {
                    res.sendStatus(403);
                }
            }
        });
    }).catch((err) => {
        res.status(401).send(err);
    }).finally(() => {

    });
})

// Liking a blog post
router.post("/like",(req, res) => {
    const postId = req.body.postId;
    BlogPost.findById(postId)
        .then((post) => {
            jwt.verify(req.cookies.token, process.env.JWT_TOKEN_KEY, async (err, data) => { 
                if (err) {
                    res.sendStatus(403);
                } else {
                    // If the user hasn't liked the post yet, add a like
                    if (!post.liked_by.includes(data.id)) {
                        post.liked_by.push(data.id);
                        post.save();
                        res.send(post).status(200);
                    } else  { // If the user had already liked the post, instead the like gets removed
                        for ( let i = 0; i < post.liked_by.length; i++ ) {
                            if (post.liked_by[i] === data.id.toString()) {
                                post.liked_by.splice(i,1);
                            }
                        }
                        post.save();
                        res.send(post).status(200);
                    }
                }
            })
        }).catch ((err) => {
            res.status(401).send(err);
        });
});

// Get all the posts posted by the certain user
router.get("/byuser/:userId",(req,res) => {
    const userId = req.params.userId;
    BlogPost.find({ posterId : userId }).populate('postedBy', 'username')
    .then((posts) => {
        res.send(posts).status(200);
    }).catch((err) => {
        console.log(err);
        res.status(404).send(err);
    });
});

// Get all the posts liked by the certain user
router.get("/likedby/:userId",(req,res) => {
    const userId = req.params.userId;
    BlogPost.find({ liked_by : userId }).populate('postedBy', 'username')
    .then((posts) => {
        res.send(posts).status(200);
    }).catch((err) => {
        console.log(err);
        res.status(404).send(err);
    })
});

module.exports = router;