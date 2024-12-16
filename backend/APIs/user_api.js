// user_api.js
const express = require("express");
const Users = require("../MongoDB Schema/user_schema.js");
const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
  try {
    const existingUser = await Users.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const newUser = new Users(req.body);
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});

// Get a user by email
router.get("/email/:email", async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone_number, password } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser && existingUser._id.toString() !== req.params.id) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      { name, email, phone_number, password },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
});

module.exports = router;
