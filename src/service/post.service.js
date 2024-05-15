const PostModel = require("../models/post.model");

const addPost = async (title, body, imageString, username) => {
    const post = await PostModel.create({
        title: title.trim(),
        body: body.trim(),
        username,
        postedAt: new Date(),
        image: "/upload/" + imageString,
    });

    return post;
};

const listPosts = async () => {
    const posts = await PostModel.find();

    return posts;
};

const getPost = async (id) => {
    const post = await PostModel.findById(id);

    return post;
};

const updatePost = async (id, arg) => {
    // arg: arguments
    // argument
    const updatedPost = await PostModel.findByIdAndUpdate(id, arg, {
        new: true,
    });

    return updatedPost;
};

const removePost = async (id) => {
    const deletion = await PostModel.findByIdAndDelete(id);
    return deletion;
};

module.exports = {
    addPost,
    listPosts,
    getPost,
    updatePost,
    removePost,
};
