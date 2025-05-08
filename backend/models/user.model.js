const { required } = require("joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: 3,
      maxlength: 30,
      trim: true,
      unique: true,
    },
    password: {
      //hashed when stored n checked, refer to auth routes
      required: true,
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please provide a valid email address"],
    },
    publicId: {
      type: String,
    },
    imageUrl: {
      required: false,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//indexed to find users, everythign else shouldn't be accessed easily
//also realized that adding "unique" auto creates an index for it
userSchema.index({ username: 1 });
const User = mongoose.model("User", userSchema);

module.exports = User;
