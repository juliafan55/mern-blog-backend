const mongoose = require("mongoose");
const uuidv1 = require('uuidv1');
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

//virtual field
UserSchema.virtual("password")
    .set(function (password) {
        //create temp variable called _password
        this._password = password;
        //generate a timestamp
        this.salt = uuidv1()
        //encrypt password
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
    return this._password
    })

//encrypt password
UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function(password){
    if (!password) return "";
        try {
            return crypto.createHmac("sha256", this.salt).update(password).digest("hex")
        } catch (err){
            return ""
    }
    }
}

module.exports = mongoose.model("User", UserSchema);