const redirectIfAuthMiddleware = async (req, res, next) => {
    const userId = req.session.userId;

    if (userId) return res.redirect("/");

    next();
};

module.exports = redirectIfAuthMiddleware;
