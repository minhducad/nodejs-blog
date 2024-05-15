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
    redirectNotFoundPageController,
} = require("./src/controllers/util.controller");
const connectMongoDB = require("./src/clients/connectMongoDB");
const {
    redirectSignUpController,
    registerController,
    redirectLoginController,
    loginController,
    logoutController,
} = require("./src/controllers/user.controller");
const expressSession = require("express-session");
const authMiddleware = require("./src/middlewares/auth.mdw");
const redirectIfAuthMiddleware = require("./src/middlewares/redirectIfAuth.mdw");

const app = express();

// Add session
app.use(
    expressSession({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
    })
);

// Set template engine
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Đăng ký thư mục public
app.use(express.static("public"));

// Use file upload, allow to store file
app.use(fileUpload());

global.loggedIn = null;
app.use("*", (req, res, next) => {
    global.loggedIn = req.session.userId;
    next();
});

// Route Posts
app.get("/posts/new", authMiddleware, redirectNewPostPageController);

app.post(
    "/posts/store",
    authMiddleware,
    validateMiddleware,
    createNewPostController
);

app.get("/", listPostsController);

app.get("/about", redirectAboutController);

app.get("/contact", redirectContactController);

app.get("/post/:id", getPostByIdController);

// Route Users
app.get("/auth/register", redirectIfAuthMiddleware, redirectSignUpController);
app.post("/users/register", redirectIfAuthMiddleware, registerController);
app.get("/auth/login", redirectIfAuthMiddleware, redirectLoginController);
app.post("/users/login", redirectIfAuthMiddleware, loginController);
app.get("/auth/logout", logoutController);

app.use(redirectNotFoundPageController);

app.listen(5000, async () => {
    // Connect MongoDB
    await connectMongoDB();

    console.log("Go to http://localhost:5000");
});
