//dependencies
const express = require("express")
const dotenv = require("dotenv")

const app = express()

dotenv.config()

app.get("/", (req, res) => {
    res.send("Hello")
})

app.listen(process.env.PORT)