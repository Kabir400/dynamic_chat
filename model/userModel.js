//external import--
const mongoose = require("mongoose");

//defining schema--
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    is_online: {
      type: String,
      required: true,
      default: "0",
    },
  },
  {
    timestamps: true,
  }
);

//defining model--
const userModel = mongoose.model("User", userSchema, "User");

module.exports = userModel;
