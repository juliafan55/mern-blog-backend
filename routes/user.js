const express = require("express");
const router = express.Router();

const { requireSignin } = require("../controllers/auth")
const { userById, allUsers, getUser, updateUser, deleteUser } = require("../controllers/user");

router.get('/users', allUsers);
router.get('/user/:userId', requireSignin, getUser);
router.put('/user/:userId', requireSignin, updateUser);
router.delete('/user/:userId', requireSignin, deleteUser);

//if there's userId, userById method will run
router.param("userId", userById)


module.exports = router