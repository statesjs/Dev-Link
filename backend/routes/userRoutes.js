const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

//GET
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

//POST create a new user moved over to authRoutes
// router.post("/", async (req, res, next) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     next(error);
//   }
// });

// GET a user by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
