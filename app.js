//dependencies
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")

//connection with db
mongoose
    .connect(process.env.MONGODB_URL, {})
    .then(() => console.log("db connected"))
    .catch((err) => console.log("db error", err))

//bringing the routes
const postRoutes = require("./routes/post");

//middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())

//routes - that is working as middleware
app.use("/", postRoutes);

app.listen(process.env.PORT, () => console.log("backend running"));