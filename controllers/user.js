const _ = require("lodash")
const User = require("../models/User");

//find user
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({error: "User not found."})
        }
        //add profile object in req with user info
        req.profile = user
        next()
    })
}

//checking if user has authorization
exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.profile._id
    if (!authorized) {
        return res.status(403).json({ error: "User is not authorized to perform this action." });
    }
}

//getting all users
exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.statis(400).json({ error: err });
        }
        res.json({ users: users })
    }).select("username email updated created.")
}

exports.getUser = (req, res) => {
    //remove password from the return
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    
    return res.json(req.profile);
}

exports.updateUser = (req, res, next) => {
    let user = req.profile
    user = _.extend(user, req.body) //lodash library - mutate the source object
    user.updated = Date.now()
    user.save((err) => {
        if (err) {
            return res.status(400).json({ error: "Not authorized." });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({ user });
    })
}

exports.deleteUser = (req, res, next) => {
    let user = req.profile
    user.remove((err, user) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.json({ message: "User has been deleted." });
    })
}