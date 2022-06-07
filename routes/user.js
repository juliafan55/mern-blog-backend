const express = require("express");
const router = express.Router();

const { userById, allUsers } = require("../controllers/user");

router.get('/users', allUsers);

//if there's userId, userById method will run
router.param("userId", userById)


module.exports = router