const express = require("express")
const router = express.Router()
// const validator = require("../validator/index.")

const {signup} = require("../controllers/auth")

router.post('/signup', signup);

module.exports = router