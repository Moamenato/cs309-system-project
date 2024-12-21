const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// POST endpoint to upload an image
router.post("/", (req, res) => {
  try {
    const { type, typeId } = req.body;
    if (!type || !typeId) {
      return res.status(400).json({ message: "Type and TypeId are required." });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "Image file is required." });
    }

    const image = req.files.image;
    const uploadDir = path.join(__dirname, "../uploads", type);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, `${typeId}.jpg`);
    image.mv(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving file." });
      }
      res.status(201).json({
        message: "Image uploaded successfully.",
        path: `/uploads/${type}/${typeId}.jpg`,
      });
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Serve uploaded images
router.get("/:type/:typeId", (req, res) => {
  try {
    const { type, typeId } = req.params;
    const imagePath = path.join(__dirname, "../uploads", type, `${typeId}.jpg`);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).send("Image not found.");
    }

    res.sendFile(imagePath);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
