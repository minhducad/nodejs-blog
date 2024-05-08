const { createUser } = require("../service/user.service");

const redirectSignUpController = (req, res) => {
    res.render("register"); // render register.ejs
};

const registerController = async (req, res) => {
    try {
        const data = req.body;
        const user = await createUser(data);
        // res.redirect("/");
        res.status(200).json({
            status: "success",
            data: {
                user: user,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            error: error,
        });
    }
};

module.exports = { redirectSignUpController, registerController };
