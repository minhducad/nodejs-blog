const express = require("express");
require("ejs"); // Important

const app = express();

// Set template engine
app.set("view engine", "ejs");

// Đăng ký thư mục public
app.use(express.static("public"));

app.get("/", (req, res) => {
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
