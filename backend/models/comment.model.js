const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
      minLength: 3,
      maxLength: 20,
    },
    body: {
      required: true,
      type: String,
      minLength: 1,
      maxLength: 300,
    },
  },
  {
    timestamps: true,
  }
);

//the shorter of the two inputs, can make finding their related comments much easier
commentSchema.index({ username: 1 });
module.exports = mongoose.model("Comment", commentSchema);
