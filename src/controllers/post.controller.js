const { addPost, listPosts, getPost } = require("../service/post.service");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const redirectNewPostPageController = (req, res) => {
    res.render("create"); // open create.ejs page
};

const createNewPostController = async (req, res) => {
    // const title = req.body.title;
    // const body = req.body.body;
    const{ title, body } = req.body; // for short

    try {
        const image = req.files.image;

        const imageName = `${uuidv4()}-${image.name}`;

        // Save image in upload file to server side
        image.mv(path.resolve(__dirname, "../../public/upload", imageName));

        const newPost = await addPost(title, body, imageName);

        // Move to the post page
        res.redirect(`/post/${newPost.id}`);
    } catch (error) {
        res.status(400).json({
            status: "error",
            error,
        });
    }
};

const listPostsController = async (req, res) => {
    const posts = await listPosts();

    res.render("index", {
        posts: posts,
    });
};

const getPostByIdController = async (req, res) => {
    const postId = req.params.id; // abcas23fdksalfasd

    const post = await getPost(postId);

    res.render("post", {
        post: post,
    });
};

module.exports = {
    listPostsController,
    redirectNewPostPageController,
    createNewPostController,
    getPostByIdController,
};
