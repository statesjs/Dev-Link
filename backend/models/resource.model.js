const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      //reference will pull from the Users collection in the database
      ref: "User",
      required: true,
    },
    title: {
      required: true,
      type: String,
      minLength: 5,
      maxLength: 30,
    },
    body: {
      required: true,
      type: String,
      minLength: 5,
      maxLength: 1000,
    },
    link: {
      required: false,
      type: String,
      minLength: 5,
      maxLength: 1000,
    },
    image: {
      required: false,
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 2048,
    },
  },
  {
    timestamps: true,
  }
);

resourceSchema.index({ title: 1 });
resourceSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Resource", resourceSchema);
