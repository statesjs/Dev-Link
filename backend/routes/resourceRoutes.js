const express = require("express");
const Resource = require("../models/resource.model");
const router = express.Router();
const auth = require("../middleware/auth");

//GET
router.get("/", async (req, res, next) => {
  try {
    //populate to
    const resources = await Resource.find()
      .populate("author", "username")
      //sort the data for newest only
      .sort({ createdAt: -1 });

    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
});

//POST create a new resource
router.post("/", auth, async (req, res, next) => {
  try {
    const resource = await Resource.create({
      ...req.body,
      author: req.user.id,
    });
    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
});

//PUT request
router.put("/:id", auth, async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: "Not found" });
    if (resource.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

//DELETE request

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    if (resource.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Must be the author to delete." });
    }
    await Resource.findByIdAndDelete(id);
    res.status(200).json({ message: "Resource deleted successfully." });
  } catch (error) {
    next(error);
  }
});

// GET a resource by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findById(id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json(resource);
  } catch (error) {
    next(error);
  }
});

//export
module.exports = router;
