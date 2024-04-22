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

// GET, POST, PUT/PATCH, DELETE (CRUD)
app.get("/posts/new", async (req, res) => {
    res.render("create"); // open create.ejs page
});

app.post("/posts/store", async (req, res) => {
    // const title = req.body.title;
    // const body = req.body.body;
    const { title, body } = req.body; // for short

    try {
        const newPost = await addPost(title, body);

        res.status(200).json({
            status: "success",
            data: newPost,
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            // error: error,
            error, // for short
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
