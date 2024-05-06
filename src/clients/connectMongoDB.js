const mongoose = require("mongoose");

const connectMongoDB = () => {
    // Connect MongoDB
    try {
        mongoose.connect("mongodb://localhost:27017/blog");
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.log("Cannot connect MongoDB", error);
    }
};

module.exports = connectMongoDB;
