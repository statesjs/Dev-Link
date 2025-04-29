const { required } = require("joi");
const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);
//easiest to query, short and what people would search for
resourceSchema.index({ title: 1 });
//to help find resources by the newest addition
resourceSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Resource", resourceSchema);
