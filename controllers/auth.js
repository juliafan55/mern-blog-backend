const User = require("../models/User")

exports.signup = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(403).json({ error: "This user is already registered" });
    const user = await new User(req.body)
    await user.save()
    res.status(200).json({ message:"Signup successful! Please login." });
}