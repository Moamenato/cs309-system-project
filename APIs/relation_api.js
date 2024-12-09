const express = require("express");
const CategoryItemRelation = require("../MongoDB Schema/relation_schema.js");
const Category = require("../MongoDB Schema/category_schema.js");
const Item = require("../MongoDB Schema/item_schema.js");
const router = express.Router();


// Create a new category-item relation and push the item to the category
router.post("/add", async (req, res) => {
  try {
    const { categoryId, itemId } = req.body;

    const category = await Category.findById(categoryId);
    const item = await Item.findById(itemId);
    if (!category || !item) {
      return res.status(404).json({ error: "Category or item not found" });
    }

    const existingRelation = await CategoryItemRelation.findOne({
      category: categoryId,
    });

    if (existingRelation) {
      if (!existingRelation.items.includes(itemId)) {
        existingRelation.items.push(itemId);
        await existingRelation.save();
        return res.status(200).json({
          message: "Item added to existing category-item relation",
          relation: existingRelation,
        });
      }
      return res.status(400).json({
        message: "This item is already linked to the category.",
      });
    }

    const newRelation = new CategoryItemRelation({
      category: categoryId,
      items: [itemId],
    });

    await newRelation.save();

    res.status(201).json({
      message: "Category-item relation created successfully",
      relation: newRelation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all relations
router.get("/", async (req, res) => {
  try {
    const relations = await CategoryItemRelation.find().populate(
      "category items"
    );
    res.status(200).json(relations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single relation by ID
router.get("/:id", async (req, res) => {
  try {
    const relation = await CategoryItemRelation.findById(
      req.params.id
    ).populate("category items");
    if (!relation) {
      return res.status(404).json({ error: "Relation not found" });
    }
    res.status(200).json(relation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a category-item relation (e.g., add/remove items)
router.put("/:id", async (req, res) => {
  try {
    const { itemIds } = req.body; // itemIds is an array of item ObjectIds

    // Check if the relation exists
    const relation = await CategoryItemRelation.findById(req.params.id);
    if (!relation) {
      return res.status(404).json({ error: "Relation not found" });
    }

    // Check if all items exist
    const items = await Item.find({ _id: { $in: itemIds } });
    if (items.length !== itemIds.length) {
      return res.status(400).json({ error: "Some items do not exist" });
    }

    // Update the items in the relation
    relation.items = itemIds;
    await relation.save();

    // Update the category's items array
    const category = await Category.findById(relation.category);
    category.items = itemIds;
    await category.save();

    res.status(200).json({
      message: "Category-item relation updated successfully",
      relation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a category-item relation and remove the item from the category's items array
router.delete("/:id", async (req, res) => {
  try {
    const relation = await CategoryItemRelation.findById(req.params.id);
    if (!relation) {
      return res.status(404).json({ error: "Relation not found" });
    }

    // Delete the relation
    await relation.remove();

    // Remove the item from the category's items array
    const category = await Category.findById(relation.category);
    category.items = category.items.filter(
      (item) => !relation.items.includes(item)
    );
    await category.save();

    res.status(200).json({
      message: "Category-item relation deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
