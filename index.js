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
const {
    redirectSignUpController,
    registerController,
    redirectLoginController,
    loginController,
} = require("./src/controllers/user.controller");

const app = express();

// Set template engine
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Đăng ký thư mục public
app.use(express.static("public"));

// Use file upload, allow to store file
app.use(fileUpload());

// Route Posts
app.get("/posts/new", redirectNewPostPageController);

app.post("/posts/store", validateMiddleware, createNewPostController);

app.get("/", listPostsController);

app.get("/about", redirectAboutController);

app.get("/contact", redirectContactController);

app.get("/post/:id", getPostByIdController);

// Route Users
app.get("/auth/register", redirectSignUpController);
app.post("/users/register", registerController);
app.get("/auth/login", redirectLoginController);
app.post("/users/login", loginController);

app.listen(5000, async () => {
    // Connect MongoDB
    await connectMongoDB();

    console.log("Go to http://localhost:5000");
});
