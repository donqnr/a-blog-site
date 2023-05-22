const mongoose = require("mongoose");

// Create Schema
var blogPostSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },
        postedBy: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        title: {
            type: String,
        },
        text: {
            type: String,        
        },
        date_created: {
            type: Date,
            default: Date.now
        },
        last_edited: {
            type: Date,
            default: Date.now
        },
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        },
        likedby: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }],
        liked_by: [{
            type: String,
            unique: true
        }]
    },
    { strict: false }
);

module.exports = mongoose.model("blogposts", blogPostSchema);