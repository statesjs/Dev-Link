const express = require("express");
const Comment = require("../models/comment.model");
const router = express.Router();
const auth = require("../middleware/auth");
// GET all comments
router.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

// GET a comment by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
});

// POST create a new comment
router.post("/", auth, async (req, res, next) => {
  try {
    const comment = await Comment.create({ username: req.id }, req.body);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

// PUT update a comment
router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
});

// DELETE comment
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
