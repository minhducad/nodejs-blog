const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required, please fill the title!"],
    },
    body: {
        type: String,
        required: [true, "Body is required, please fill the body!"],
    },
});

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
