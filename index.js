//dependencies
const express = require("express");
const app = express();

const logger = require("morgan")
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session)

const passport = require("./Auth")

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
require("dotenv").config();

//connect to db
require('./config/db.connection');

//auth
app.use(passport.initialize());
app.use(passport.session());
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.mongoDB_secret,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
        })
    })
)

//middleware
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())


//Using routers
const Authentication = require("./routes/Auth");
const User = require("./routes/User");

app.use("/auth", Authentication);
app.use("/user", User);

//defining port for server
app.listen(process.env.PORT,() => console.log("Backend is running"))