const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { expressjwt : expressjwt} = require("express-jwt");
require("dotenv").config();

exports.signup = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(403).json({ error: "This user is already registered." });
    const user = await new User(req.body)
    await user.save()
    res.status(200).json({ message:"Signup successful! Please login." });
}

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        // if err or no user
        if (err || !user) {
            return res.status(401).json({
                error: 'User with that email does not exist. Please signup.'
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in model and use here
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password do not match'
            });
        }
        // generate a token with user id and secret
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        // retrun response with user and token to frontend client
        const { _id, username, email, role } = user;
        return res.json({ token, user: { _id, email, username, role } });
    });
};

exports.signout = (req, res) => {
    //clear the cookie
    res.clearCookie("t")
    return res.json({message: "Signout successful."})
}

exports.requireSignin = expressjwt({
    //if token is valid, express jwt appends the verified users id in an auth key to the request object
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
  });