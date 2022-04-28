const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1
    },
    body: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        default: null
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]

}, {timestamps: true});

const Story = mongoose.model("Story", storySchema);
module.exports = Story