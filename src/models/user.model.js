const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10, (error, hash) => {
        this.password = hash;
        next();
    });
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
