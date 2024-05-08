const UserModel = require("../models/user.model");

const createUser = async (data) => {
    const username = data.username;
    const password = data.password;

    if (!username || !password) {
        console.error("Username and password are required!");
        return;
    }

    const user = await UserModel.create({
        username,
        password,
    });

    return user;
};

module.exports = { createUser };
