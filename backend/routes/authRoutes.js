const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const router = express.Router();

//registration
router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // +_+_+_+_+_+_+_+_+_+_Check for existing username or email+_+_+_+_+_+_+_
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already in use" });
    }
    //+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_

    //hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creation
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //dont include anything sensitive
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //don't forget to store this on the front end side later 🚧🚧🚧 also should make sure to use a auth helper function on all protected routes
    //return only the token later, doing this just helps for testing to make sure it's all passing through safely
    res.status(201).json({ token, user: { id: newUser._id, username } });
  } catch (err) {
    next(err);
  }
});

//login

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    //compare passwords post hashing
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //return only the token later, doing this just helps for testing to make sure it's all passing through safely
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
});

const auth = require("../middleware/auth");

//make sure to have the initial load check this endpoint first, then if not, go to the unlogged page

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json(user);
});

module.exports = router;
