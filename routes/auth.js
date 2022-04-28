const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { v4: genTknSalt } = require("uuid");

const User = require("../models/User");

const { generateToken } = require("../functions/createJwt");
const {
  isEmail,
  validateSignup,
  validateLogin,
} = require("../middleware/validate");

router.post("/signup", validateSignup, async (req, res) => {
  const existingEmail = await User.findOne({ email: req.body.email });
  const existingUsername = await User.findOne({ username: req.body.username });

  if (existingEmail)
    return res.status(409).send({ error: "Email already in use." });
  if (existingUsername) return res.status(409).send({error: "Username already in use."})

  let user;

  const salt = await bcrypt.genSalt(12);
  const password = await bcrypt.hash(req.body.password, salt);

  const tknSalt = genTknSalt();

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: password,
    tknSalt: tknSalt,
  });

  await user.save();

  const actkn = generateToken(res, user._id, user.tknSalt);

  res.header("actkn", actkn);
  res
    .status(201)
    .send({
      user: { id: user._id, username: user.username, email: user.email },
    });
});

router.post("/login", validateLogin, async (req, res) => {
  let user;
  if (isEmail(req.body.ref)) {
    user = await User.findOne({ email: req.body.ref });
  } else {
    user = await User.findOne({ username: req.body.ref });
  }
  if (!user) return res.status(404).send({ error: "User not found." });


  const isPasswordValid = bcrypt.compareSync(req.body.password, `${user.password}`);

  if (!isPasswordValid) return res.status(401).send({error: "Invalid credentials."})

  const actkn = generateToken(res, user._id, user.tknSalt);


  res.status(201).header("actkn", actkn).send({ user: {id: user._id, username: user.username, email: user.email, createdAt: user.createdAt} });
});

module.exports = router;
