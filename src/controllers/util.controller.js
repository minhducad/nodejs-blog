const redirectAboutController = (req, res) => {
    res.render("about");
};

const redirectContactController = (req, res) => {
    res.render("contact");
};

const redirectNotFoundPageController = (req, res) => {
    res.render("notfound");
};

module.exports = {
    redirectAboutController,
    redirectContactController,
    redirectNotFoundPageController,
};
