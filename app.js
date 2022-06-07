//dependencies
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const expressValidator = require("express-validator");
const cors = require("cors")

//connection with db
mongoose
    .connect(process.env.MONGODB_URL, {})
    .then(() => console.log("db connected"))
    .catch((err) => console.log("db error", err))

//bringing the routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors())

//routes - that is working as middleware
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

//auth error handling
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: "Unauthorized" });
    }
  });

app.listen(process.env.PORT, () => console.log("backend running"));