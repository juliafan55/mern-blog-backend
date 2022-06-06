const express = require("express")
const router = express.Router()
const {createPostValidator} = require("../validator")

const {getPosts, createPost} = require("../controllers/post")

router.get('/', getPosts);
router.post('/post', createPostValidator, createPost);

module.exports = router