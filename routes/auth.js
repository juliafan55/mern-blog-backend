//require express
const express = require("express");

// //require router to use router. i/o app.
// const router = express.Router();

//for user password encryption
const bcrypt = require("bcryptjs");

//another way to require our models - this specifically req. User only
const { User } = require("../models");

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//routes
//login
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No user found")
        else {
            req.login(user, err => {
                if (err) throw err;
                res.send("Successfully authenticated");
                console.log(req.user);
            })
        }
    })(req, res, next);
})

//register
app.post("/register", (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User already exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);

            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
            })
            await newUser.save();
            res.send("User created")
        }
    });
})

//user
app.get("/user", (req, res) => {
    res.send(req.user);
})