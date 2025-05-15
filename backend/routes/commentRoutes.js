const express = require("express");
const Comment = require("../models/comment.model");
const router = express.Router();
const auth = require("../middleware/auth");
// GET all comments
router.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.find()
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

// GET a comment by resource
//use this later when i have to populate under the resource for the comments
router.get("/resource/:resourceId", async (req, res, next) => {
  try {
    const comments = await Comment.find({ resource: req.params.resourceId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

// POST create a new comment
router.post("/", auth, async (req, res, next) => {
  try {
    const { body, resource } = req.body; //which contains the req.user.id from the auth middleware now
    const comment = await Comment.create({
      body,
      resource, //have to inject this on the front end
      user: req.user.id, //finally used here
    });
    const populated = await comment.populate("user", "username"); //had to fix in order to receive live reaction of a posted comment to see the username appropriately, a refresh calls the get
    // in orrder to get the username to populate, but it looks bad in the moment
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
});

// PUT update
router.put("/:id", auth, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Not found" });

    //optional, shouldnt need in the end but ill have to use if I have trouble finishing up the front end
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: not your comment" });
    }

    const updated = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

// DELETE
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Not found" });

    //optional, shouldnt need in the end but ill have to use if I have trouble finishing up the front end
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: not your comment" });
    }

    await comment.remove();
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
