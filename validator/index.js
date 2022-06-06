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
    //next middleware - go to next thing
    next();
}

exports.userSignupValidator = (req, res, next) => {
    //username is not null and between 4-10 characters
    req.check("username", "Username is required").notEmpty();
    //email is not null and valid
    req.check("email", "Email is required")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 2000
        })
    //check for password
    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number")
    //check for errors
    const errors = req.validationErrors()
    //returning the first error only
    if (errors) {
        const firstError = errors.map((err) => err.msg)[0]
        return res.status(400).json({error: firstError})
    }
    //next middleware - go to next thing
    next();
}