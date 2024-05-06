const express = require("express");
require("ejs"); // Important
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const validateMiddleware = require("./src/middlewares/validate.mdw");
const {
    createNewPostController,
    redirectNewPostPageController,
    listPostsController,
    getPostByIdController,
} = require("./src/controllers/post.controller");
const {
    redirectAboutController,
    redirectContactController,
} = require("./src/controllers/util.controller");
const connectMongoDB = require("./src/clients/connectMongoDB");

const app = express();

// Set template engine
app.set("view engine", "ejs");

// Connect MongoDB
connectMongoDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Đăng ký thư mục public
app.use(express.static("public"));

// Use file upload, allow to store file
app.use(fileUpload());

// GET, POST, PUT/PATCH, DELETE (CRUD)
app.get("/posts/new", redirectNewPostPageController);

app.post("/posts/store", validateMiddleware, createNewPostController);

app.get("/", listPostsController);

app.get("/about", redirectAboutController);

app.get("/contact", redirectContactController);

// http://localhost:5000/post/662658090468a546b9fe65dd
app.get("/post/:id", getPostByIdController);

app.listen(5000, () => {
    console.log("Go to http://localhost:5000");
});
