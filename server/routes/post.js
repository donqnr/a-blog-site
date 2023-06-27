const express = require("express"),
    router = express.Router();

const { userVerification } = require("../middlewares/authMiddleware");
const { GetPosts, GetPostById, NewPost, EditPost, DeletePost } = require("../controllers/postController");
const { LikePost } = require("../controllers/postController");
const { GetPostsByUserID } = require("../controllers/postController");
const { GetPostsLikedByUserId } = require("../controllers/postController");

// Get all the blog posts
router.get("/", GetPosts);

// Get a blog post by id
router.get("/:postId", GetPostById);

// Posting a new blog post
router.post("/new", NewPost);

// Editing an existing blog post
router.patch("/edit", EditPost);

// Deleting a blog post
router.delete("/:id", DeletePost)

// Liking a blog post
router.post("/like", LikePost);

// Get all the posts posted by the certain user
router.get("/byuser/:userId", GetPostsByUserID);

// Get all the posts liked by the certain user
router.get("/likedby/:userId", GetPostsLikedByUserId);

module.exports = router;