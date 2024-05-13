const mongoose = require("mongoose");

const connectMongoDB = async () => {
    // Connect MongoDB
    try {
        await mongoose.connect("mongodb://localhost:27017/blog");
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.log("Cannot connect MongoDB", error);
    }
};

module.exports = connectMongoDB;

// Model -> Service -> Controller
// trim('  abc sdf ') = 'abc sdf'