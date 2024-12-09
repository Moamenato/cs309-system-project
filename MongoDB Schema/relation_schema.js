// relation_schema.js
const mongoose = require("mongoose");

const relation_schema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Items",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CategoryItemRelation", relation_schema);
