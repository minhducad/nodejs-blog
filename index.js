const express = require("express");
require("ejs"); // Important
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {
    addPost,
    listPosts,
    getPost,
    updatePost,
    removePost,
} = require("./src/routes/post.routes");
const fileUpload = require("express-fileupload");
const path = require("path");
// const { v4: uuidv4 } = require("uuid");
const uuid = require("uuid");
const uuidv4 = uuid.v4;

const app = express();

// Set template engine
app.set("view engine", "ejs");

// Connect MongoDB
try {
    mongoose.connect("mongodb://localhost:27017/blog");
    console.log("Connected to MongoDB!");
} catch (error) {
    console.log("Cannot connect MongoDB", error);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Đăng ký thư mục public
app.use(express.static("public"));

// Use file upload, allow to store file
app.use(fileUpload());

// GET, POST, PUT/PATCH, DELETE (CRUD)
app.get("/posts/new", async (req, res) => {
    res.render("create"); // open create.ejs page
});

app.post("/posts/store", async (req, res) => {
    // const title = req.body.title;
    // const body = req.body.body;
    const { title, body } = req.body; // for short

    try {
        const image = req.files.image;

        const imageName = `${uuidv4()}-${image.name}`;

        // Save image in upload file to server side
        image.mv(path.resolve(__dirname, "public/upload", imageName));

        const newPost = await addPost(title, body, imageName);

        // Move to the post page
        res.redirect(`/post/${newPost.id}`);
    } catch (error) {
        res.status(400).json({
            status: "error",
            error,
        });
    }
});

app.get("/posts", async (req, res) => {
    const posts = await listPosts();

    res.status(200).json({
        status: "success",
        data: posts,
    });
});

app.get("/", async (req, res) => {
    const posts = await listPosts();

    res.render("index", {
        posts: posts,
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

// http://localhost:5000/post/662658090468a546b9fe65dd
app.get("/post/:id", async (req, res) => {
    const postId = req.params.id; // abcas23fdksalfasd

    const post = await getPost(postId);

    res.render("post", {
        post: post,
    });
});

app.listen(5000, () => {
    console.log("Go to http://localhost:5000");
});
