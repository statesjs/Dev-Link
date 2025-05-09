const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 300,
    },
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Index by resource to fetch comments fast for a resource
commentSchema.index({ resource: 1 });
// if you want fast lookup by user, can make use of later if I have the time
commentSchema.index({ user: 1 });

module.exports = mongoose.model("Comment", commentSchema);
