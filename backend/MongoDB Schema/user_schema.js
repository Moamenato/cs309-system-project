// user_schema.js
const mongoose = require("mongoose");

const user_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone_number: { type: String },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", user_schema);
