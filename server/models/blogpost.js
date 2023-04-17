const mongoose = require("mongoose");

// Create Schema
var blogPostSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
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
        liked_by: [{
            type: String
        }]
    },
    { strict: false }
);

module.exports = mongoose.model("blogposts", blogPostSchema);