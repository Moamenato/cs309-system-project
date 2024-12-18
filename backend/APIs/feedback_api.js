const express = require("express");
const Feedback = require("../MongoDB Schema/feedback_schema.js");
const Items = require("../MongoDB Schema/item_schema.js");
const User = require("../MongoDB Schema/user_schema.js");
const router = express.Router();

// Create a new feedback
router.post("/", async (req, res) => {
  try {
    const { item, user, rating, comment } = req.body;

    const foundItem = await Items.findById(item);
    if (!foundItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    const foundUser = await User.findById(user);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const feedback = new Feedback({
      item,
      user,
      rating,
      comment,
    });

    const savedFeedback = await feedback.save();
    res.status(201).json({
      message: "Feedback created successfully",
      feedback: savedFeedback,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating feedback", error: error.message });
  }
});

// Get all feedbacks for a particular item
router.get("/item/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const feedbacks = await Feedback.find({ item: itemId }).populate('user', 'name email');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error: error.message });
  }
});

// Get feedback by ID
router.get("/:id", async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const feedback = await Feedback.findById(feedbackId).populate('item', 'title').populate('user', 'name email'); 
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error: error.message });
  }
});

// Update feedback by ID
router.put("/:id", async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { rating, comment },
      { new: true, runValidators: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({
      message: "Feedback updated successfully",
      feedback: updatedFeedback,
    });
  } catch (error) {
    res.status(400).json({ message: "Error updating feedback", error: error.message });
  }
});

// Delete feedback by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({
      message: "Feedback deleted successfully",
      feedback: deletedFeedback,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback", error: error.message });
  }
});

module.exports = router;
