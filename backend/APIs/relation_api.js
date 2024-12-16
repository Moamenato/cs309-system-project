const express = require("express");
const CategoryItemRelation = require("../MongoDB Schema/relation_schema.js"); 
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { category, item } = req.body;

    if (!category || !item) {
      return res.status(400).json({ message: "Category and item are required" });
    }
    const existingRelation = await CategoryItemRelation.findOne({ category });
    if (existingRelation) {
      return res.status(400).json({ message: "Relation with this category already exists" });
    }

    const newRelation = new CategoryItemRelation({
      category,
      items: [item], // Only one item added here
    });
    const savedRelation = await newRelation.save();
    res
      .status(201)
      .json({ message: "Relation created successfully", relation: savedRelation });
  } catch (error) {
    res.status(400).json({ message: "Error creating relation", error: error.message });
  }
});

// Get all relations
router.get("/", async (req, res) => {
  try {
    const relations = await CategoryItemRelation.find()
      .populate("category")
      .populate("items");
    res.status(200).json(relations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching relations", error: error.message });
  }
});

// Get a single relation by ID
router.get("/:id", async (req, res) => {
  try {
    const relation = await CategoryItemRelation.findById(req.params.id)
      .populate("category")
      .populate("items");

    if (!relation) {
      return res.status(404).json({ message: "Relation not found" });
    }

    res.status(200).json(relation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching relation", error: error.message });
  }
});

// Add a single item to an existing relation by ID
router.put("/:id", async (req, res) => {
  try {
    const { item } = req.body;

    if (!item) {
      return res.status(400).json({ message: "Item is required" });
    }

    const relation = await CategoryItemRelation.findById(req.params.id);

    if (!relation) {
      return res.status(404).json({ message: "Relation not found" });
    }

    if (relation.items.includes(item)) {
      return res.status(400).json({ message: "Item already exists in the relation" });
    }

    relation.items.push(item);
    const updatedRelation = await relation.save();
    res
      .status(200)
      .json({ message: "Item added to relation successfully", relation: updatedRelation });
  } catch (error) {
    res.status(400).json({ message: "Error adding item to relation", error: error.message });
  }
});

// Delete a single item from an existing relation by ID
router.delete("/:relationId/item/:itemId", async (req, res) => {
  try {
    const { relationId, itemId } = req.params;

    const relation = await CategoryItemRelation.findById(relationId);

    if (!relation) {
      return res.status(404).json({ message: "Relation not found" });
    }

    const itemIndex = relation.items.indexOf(itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the relation" });
    }

    relation.items.splice(itemIndex, 1);
    const updatedRelation = await relation.save();

    res
      .status(200)
      .json({ message: "Item removed from relation successfully", relation: updatedRelation });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from relation", error: error.message });
  }
});

// Delete a relation by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRelation = await CategoryItemRelation.findByIdAndDelete(req.params.id);

    if (!deletedRelation) {
      return res.status(404).json({ message: "Relation not found" });
    }

    res
      .status(200)
      .json({ message: "Relation deleted successfully", relation: deletedRelation });
  } catch (error) {
    res.status(500).json({ message: "Error deleting relation", error: error.message });
  }
});

module.exports = router;
