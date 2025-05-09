const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

//GET
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find().select("username _id imageUrl");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// GET a user by ID
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      "username _id imageUrl"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
