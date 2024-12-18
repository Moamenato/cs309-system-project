const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../MongoDB Schema/user_schema.js");
const jwt = require("jsonwebtoken");
const router = express.Router();

const createToken =(id)=> jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRATION_TIME});


// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
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
    res.status(500).json({ message: "Error fetching user", error: error.message });
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
    res.status(500).json({ message: "Error fetching user", error: error.message });
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

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      { name, email, phone_number, password: hashedPassword || undefined },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error: error.message });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    if(!req.user.isAdmin){
      return res.status(403).json({message: "You are not an admin."});
    }
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});

module.exports = router;
