const express = require("express")
const router = express.Router()
const validator = require("../validator/index.")

const {getPosts, createPost} = require("../controllers/post")

router.get('/', getPosts);
router.post('/post', validator.createPostValidator, createPost);

module.exports = router