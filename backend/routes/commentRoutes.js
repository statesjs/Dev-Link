const express = require("express");
const Comment = require("../models/comment.model");
const router = express.Router();

//GET
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//POST create a new comment
router.post("/", async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//PUT request
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {});

    if (!updatedComment) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE request

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a comment by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//export

module.exports = router;
