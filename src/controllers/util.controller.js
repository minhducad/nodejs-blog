const redirectAboutController = (req, res) => {
    res.render("about");
};

const redirectContactController = (req, res) => {
    res.render("contact");
};

module.exports = { redirectAboutController, redirectContactController };
