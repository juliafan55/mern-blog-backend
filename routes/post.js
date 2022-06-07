const express = require("express")
const router = express.Router()
const {createPostValidator} = require("../validator")

const { getPosts, createPost } = require("../controllers/post")
const { requireSignin } = require("../controllers/auth")
const { userById } = require("../controllers/user");

router.get('/', getPosts);
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator,);

//if there's userId, userById method will run
router.param("userId", userById)

module.exports = router