//dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");

const userRoute = require("./controllers/users")
const authRoute = require("./controllers/auth")

//connect to db
require('./config/db.connection');
dotenv.config();

//middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)


//listen route
app.listen(process.env.PORT,() => console.log("Backend is running"))