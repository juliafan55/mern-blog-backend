const express = require("express")
const router = express.Router()
const {createPostValidator} = require("../validator")

const { getPosts, createPost } = require("../controllers/post")
const {requireSignin} = require("../controllers/auth")

router.get('/', requireSignin, getPosts);
router.post('/post', createPostValidator, createPost);

module.exports = router