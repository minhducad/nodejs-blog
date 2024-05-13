const UserModel = require("../models/user.model");

const createUser = async (data) => {
    const username = data.username;
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if (!username || !password) {
        console.error("Username and password are required!");
        throw new Error("Username and password are required!");
    }

    if (password !== confirmPassword) {
        console.error("You have to confirm the password!");
        throw new Error("You have to confirm the password!");
    }

    const user = await UserModel.create({
        username,
        password,
    });

    return user;
};

const loginService = async (data) => {
    const username = data.username;
    const password = data.password;

    if (!username || !password) {
        const message = "Username and password are required!";
        console.error(message);
        throw new Error(message);
    }

    // 1. Check if user existed in DB
    const user = await UserModel.findOne({
        username: username,
    });

    if (!user) {
        const message = "User does not exist!";
        console.error(message);
        throw new Error(message);
    }

    return user;
};

module.exports = { createUser, loginService };
