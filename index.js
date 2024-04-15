const express = require("express");
require("ejs"); // Important
const mongoose = require("mongoose");
const {
    addPost,
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

// Đăng ký thư mục public
app.use(express.static("public"));

app.get("/", async (req, res) => {
    const post = await updatePost('12c', {
        body: "Something....",
    });
    console.log("post:", post);
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/post", (req, res) => {
    res.render("post");
});

app.listen(5000, () => {
    console.log("Go to http://localhost:5000");
});
