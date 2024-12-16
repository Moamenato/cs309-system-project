// item_schema.js
const mongoose = require("mongoose");

const item_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  tags: { type: [String] },
});

module.exports = mongoose.model("Items", item_schema);