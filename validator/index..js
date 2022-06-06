exports.createPostValidator = (req, res, next) => {
    //checking against title
    req.check("title", "Write a title").notEmpty()
    req.check("title", "Title must between 1 and 150 characters").isLength({
        min: 1,
        max: 150,
    });
    //checking against body
    req.check("body", "Write the content").notEmpty()
    req.check("body", "Content must between 4 and 2000 characters").isLength({
        min: 4,
        max: 2000,
    });
    //check for errors
    const errors = req.validationErrors()
    //returning the first error only
    if (errors) {
        const firstError = errors.map((err) => err.msg)[0]
        return res.status(400).json({error: firstError})
    }
    //next middleware - got to next thing
    next();
}