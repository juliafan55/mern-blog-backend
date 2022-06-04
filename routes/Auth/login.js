const express = require("express")
const login = express.Router();

//passport file for login/register
const passport = require("../../Auth");

//login passport auth
login.post("/login", (req, res) => {
    passport.authenticate("local-login", (error, user, info) => {
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

        user.isAuthenticated = true;
        return res.json(user);
    })(req, res);
})

module.exports = login;