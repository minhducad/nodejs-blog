const UserModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    const userId = req.session.userId;

    const user = await UserModel.findById(userId);

    req.session.username = user.username;

    if (!user) return res.redirect("/");

    next();
};

module.exports = authMiddleware;
