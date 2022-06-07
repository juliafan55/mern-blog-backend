const formidable = require("formidable");
const fs = require("fs")
const Post = require("../models/Post");

exports.getPosts = (req, res) => {
    const posts = Post.find()
        .populate("postedBy", "_id username")
        .select("_id title body")
        .then((posts) => {
            res.json({ posts: posts });
        })
         .catch (err => console.log(err))
    
}

exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: "Image could not be updloaded" });
        }
        let post = new Post(fields)

        req.profile.hashed_password = undefined
        req.profile.salt = undefined
        post.postedBy = req.profile

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            res.json(result)
        })
    })
}
