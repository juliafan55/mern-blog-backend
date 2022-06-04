const express = require("express");
const register = express.Router();

//passport file for login/register
const passport = require("../../Auth");

//register passport authentication
register.post("/login", (req, res) => {
    passport.authenticate("local-register", (error, user, info) => {
        if (error) {
            return res.status(500).json({
                message: error || "Something happened",
                error: error.message || "Server error",
            });
        }

        req.logIn(user, (error, data) => {
            if (error) {
                return res.status(500).json({
                    message: error || "Something happened",
                    error: error.message || "Server error",
                })
            }
        });

        return res.json(user);
    })(req, res);
})

module.exports = register;