const express = require("express");
const Resource = require("../models/resource.model");
const router = express.Router();

//GET
router.get("/", async (req, res, next) => {
  try {
    const resources = await Resource.find();

    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
});

//POST create a new resource
router.post("/", async (req, res, next) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
});
//PUT request
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedResource = await Resource.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json(updatedResource);
  } catch (error) {
    next(error);
  }
});

//DELETE request

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedResource = await Resource.findByIdAndDelete(id);

    if (!deletedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }
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
