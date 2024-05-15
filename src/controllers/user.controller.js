const { createUser, loginService } = require("../service/user.service");
const bcrypt = require("bcrypt");

const redirectSignUpController = (req, res) => {
    res.render("register"); // render register.ejs
};

const registerController = async (req, res) => {
    try {
        const data = req.body;

        // Create new user
        await createUser(data);

        res.redirect("/");
        // res.status(200).json({
        //     status: "success",
        //     data: {
        //         user: user,
        //     },
        // });
    } catch (error) {
        // res.status(400).json({
        //     status: "error",
        //     error: error,
        // });
        res.redirect("/auth/register");
    }
};

const redirectLoginController = (req, res) => {
    res.render("login");
};

const loginController = async (req, res) => {
    const data = req.body;

    // 1. Check if user existed in DB
    const user = await loginService(data);

    // 2. Check if password matches
    bcrypt.compare(data.password, user.password, function (err, result) {
        // 3. If OK, redirect homepage
        if (result) {
            req.session.userId = user._id;
            res.redirect("/");
        } else res.redirect("/auth/login");
    });
};

const logoutController = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};

module.exports = {
    redirectSignUpController,
    registerController,
    redirectLoginController,
    loginController,
    logoutController,
};
