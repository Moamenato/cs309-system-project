const express = require("express");
const Items = require("../MongoDB Schema/item_schema.js");
const router = express.Router();

// Create a new item
router.post("/", async (req, res) => {
  try {
    const existingItem = await Items.findOne({ title: req.body.title });
    if (existingItem) {
      return res
        .status(400)
        .json({ message: "Item with this title already exists" });
    }

    const newItem = new Items(req.body);
    const savedItem = await newItem.save();
    res
      .status(201)
      .json({ message: "Item created successfully", item: savedItem });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating item", error: error.message });
  }
});

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Items.find();
    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching items", error: error.message });
  }
});

// Get a single item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Items.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching item", error: error.message });
  }
});

// Update an item by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await Items.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res
      .status(200)
      .json({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating item", error: error.message });
  }
});

// Delete an item by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Items.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res
      .status(200)
      .json({ message: "Item deleted successfully", item: deletedItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting item", error: error.message });
  }
});

// Search for an item by title
router.post("/search/title", async (req, res) => {
  try {
    const title = req.body.title;
    if (!title) {
      return res
        .status(400)
        .json({ error: "Title query parameter is required" });
    }

    const allItems = await Items.find();
    const filteredItems = allItems
      .filter((item) => {
        return item.title.toLowerCase().includes(title.toLowerCase());
      })
      .slice(0, 4);

    res.status(200).json(filteredItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

// use tags in search title
