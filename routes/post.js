const express = require("express")
const router = express.Router()
const validator = require("../validator/index.")

const postController = require("../controllers/post")

router.get('/', postController.getPosts);
router.post('/post', validator. createPostValidator, postController.createPost);

module.exports = router