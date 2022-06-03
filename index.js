//dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config()

app.listen(process.env.PORT,() => console.log("Backend is running"))