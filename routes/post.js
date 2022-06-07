const express = require("express")
const router = express.Router()
const {createPostValidator} = require("../validator")

const { getPosts, createPost, postsByUser, postById, isPoster, deletePost } = require("../controllers/post")
const { requireSignin } = require("../controllers/auth")
const { userById } = require("../controllers/user");

router.get('/', getPosts);
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/post/by/:userId', requireSignin, postsByUser);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);

//if there's userId, userById method will run
router.param("userId", userById)
router.param("postId", postById)

module.exports = router