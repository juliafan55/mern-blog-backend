const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username cannot be empty"],
        unique: true,
        min: 3,
        max: 20,
    },
    password: {
        type: String,
        required: [true, "Password cannot be empty"],
        min: [6, "Password must be at least 6 digits long"],
    },
    email: {
        type: String,
        required: [true, "Email cannot be empty"],
        unique: true,
        max: 50,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
})