const express = require("express");
const Order = require("../MongoDB Schema/order_schema.js");
const User = require("../MongoDB Schema/user_schema.js");
const Items = require("../MongoDB Schema/item_schema.js");
const router = express.Router();

// 1. Create a new order
router.post("/", async (req, res) => {
  try {
    const { user, items } = req.body;

    const foundUser = await User.findById(user);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let totalAmount = 0;
    for (const item of items) {
      const foundItem = await Items.findById(item.item);
      if (!foundItem) {
        return res.status(404).json({ message: `Item with ID ${item.item} not found` });
      }

      totalAmount += foundItem.price * item.quantity;
    }

    const order = new Order({
      user,
      items,
      totalAmount,
      status: "Pending",
    });

    const savedOrder = await order.save();
    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating order", error: error.message });
  }
});

// 2. Get an order by ID
router.get("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate("user", "name email").populate("items.item", "title price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
});

// 3. Get all orders for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).populate("items.item", "title price");

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

// 4. Update order status by ID
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["Pending", "Completed", "Shipped", "Canceled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({ message: "Error updating order", error: error.message });
  }
});

// 5. Delete an order by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error: error.message });
  }
});

module.exports = router;
