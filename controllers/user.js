const User = require("../models/User");

//find user
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({error: "User not found"})
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
        return res.status(403).json({ error: "User is not authorized to perform this action" });
    }
}

//getting all users
exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.statis(400).json({ error: err });
        }
        res.json({ users: users })
    }).select("username email updated created")
}