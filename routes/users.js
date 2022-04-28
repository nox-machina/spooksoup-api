const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const authorize = require("../middleware/authorize");

router.get("/test", authorize, async (req, res) => {

    res.status(201).send({user: req.user})
})

module.exports = router;