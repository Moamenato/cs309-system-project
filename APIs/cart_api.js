const express = require("express");
const Cart = require("../MongoDB Schema/cart_schema.js");
const Items = require("../MongoDB Schema/item_schema.js");
const User = require("../MongoDB Schema/user_schema.js");
const Order = require("../MongoDB Schema/order_schema.js"); 
const router = express.Router();

// Create a new cart (or add items to an existing cart)
router.post("/", async (req, res) => {
  try {
    const { user, items } = req.body;

    const foundUser = await User.findById(user);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    for (const item of items) {
      const foundItem = await Items.findById(item.item);
      if (!foundItem) {
        return res.status(404).json({ message: `Item with ID ${item.item} not found` });
      }

      if (item.quantity > foundItem.stock) {
        return res.status(400).json({ message: `Quantity for item ${item.item} exceeds stock` });
      }
    }

    let cart = await Cart.findOne({ user });
    if (cart) {
      cart.items = items;
      cart = await cart.save();
      res.status(200).json({ message: "Cart updated successfully", cart });
    } else {
      cart = new Cart({ user, items });
      await cart.save();
      res.status(201).json({ message: "Cart created successfully", cart });
    }
  } catch (error) {
    res.status(400).json({ message: "Error creating or updating cart", error: error.message });
  }
});

// Get a cart by user ID
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ user: userId }).populate("items.item", "title price stock");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
});

// Update cart (add or remove items)
router.put("/:cartId", async (req, res) => {
  try {
    const { items } = req.body;

    for (const item of items) {
      const foundItem = await Items.findById(item.item);
      if (!foundItem) {
        return res.status(404).json({ message: `Item with ID ${item.item} not found` });
      }

      if (item.quantity > foundItem.stock) {
        return res.status(400).json({ message: `Quantity for item ${item.item} exceeds stock` });
      }
    }

    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.cartId,
      { items },
      { new: true, runValidators: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart updated successfully", cart: updatedCart });
  } catch (error) {
    res.status(400).json({ message: "Error updating cart", error: error.message });
  }
});

// Delete a cart
router.delete("/:cartId", async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.cartId);
    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart deleted successfully", cart: deletedCart });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart", error: error.message });
  }
});

// Checkout (complete the order and update stock)
router.post("/checkout/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await Cart.findOne({ user: userId }).populate("items.item");
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      for (const cartItem of cart.items) {
        const item = cartItem.item;
        if (cartItem.quantity > item.stock) {
          return res.status(400).json({
            message: `Insufficient stock for item "${item.title}". Available stock: ${item.stock}, Requested: ${cartItem.quantity}`,
          });
        }
      }
  
      const orderItems = cart.items.map(cartItem => ({
        item: cartItem.item._id,
        quantity: cartItem.quantity,
        price: cartItem.item.price,
      }));
  
      const order = new Order({
        user: userId,
        items: orderItems,
        totalAmount: orderItems.reduce((total, item) => total + (item.price * item.quantity), 0),
        status: "Pending",
      });
  
      const savedOrder = await order.save();
  
      for (const cartItem of cart.items) {
        const item = await Items.findById(cartItem.item._id);
        item.stock -= cartItem.quantity;
        await item.save();
      }
  
      await Cart.findOneAndDelete({ user: userId });
  
      res.status(200).json({
        message: "Checkout successful",
        order: savedOrder,
        remainingStock: cart.items.map(cartItem => ({
          item: cartItem.item.title,
          remainingStock: cartItem.item.stock - cartItem.quantity,
        })),
      });
    } catch (error) {
      res.status(500).json({ message: "Error during checkout", error: error.message });
    }
  });

module.exports = router;
