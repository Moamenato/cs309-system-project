// cart_schema.js
const mongoose = require("mongoose");

const cart_schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        validate: {
          validator: async function (value) {
            const item = await mongoose.model("Items").findById(this.item);
            return value <= item.stock;
          },
          message: "Quantity exceeds stock availability",
        },
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", cart_schema);
