//dependencies
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

//models
const User = require('./models/User')

//connection to db
require('./config/db.connection');

const routes = require("./routes")

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use(cookieParser(process.env.SECRET))

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2, //two weeks
    }
}))

app.use(passport.initialize());
app.use(passport.session());
require("./routes/passportConfig")(passport);

app.use("/", routes.auth)

//routes
//login
// app.post("/login", (req, res, next) => {
//     passport.authenticate("local", (err, user, info) => {
//         if (err) throw err;
//         if (!user) res.send("No user found")
//         else {
//             req.login(user, err => {
//                 if (err) throw err;
//                 res.send("Successfully authenticated");
//                 console.log(req.user);
//             })
//         }
//     })(req, res, next);
// })

// //register
// app.post("/register", (req, res) => {
//     User.findOne({ username: req.body.username }, async (err, doc) => {
//         if (err) throw err;
//         if (doc) res.send("User already exists");
//         if (!doc) {
//             const hashedPassword = await bcrypt.hash(req.body.password, 12);

//             const newUser = new User({
//                 username: req.body.username,
//                 password: hashedPassword,
//             })
//             await newUser.save();
//             res.send("User created")
//         }
//     });
// })

// //user
// app.get("/user", (req, res) => {
//     res.send(req.user);
// })

app.listen(process.env.PORT, () => console.log("Backend is running"))