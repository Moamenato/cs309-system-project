import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./itemmangment.css";
import ImageUploadButton from "./addImage";
import { Button } from "@mui/material";

function ItemManagement() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [relations, setRelations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedCategoryId, setFocusedCategoryId] = useState(null);
  const [isEditPopupVisible, setEditPopupVisible] = useState(false);
  const [editItemData, setEditItemData] = useState(null);

  const API_BASE_URL = "http://localhost:8000";
  const AUTH_TOKEN = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`; // Shortened for brevity
  const headers = { Authorization: AUTH_TOKEN };

  useEffect(() => {
    fetchRelations();
    fetchItems();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`, {
        headers,
      });
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setItems(response.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  const fetchRelations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/relations`, {
        headers,
      });
      setRelations(response.data);
    } catch (err) {
      console.error("Error fetching relations:", err);
    }
  };

  const filteredProducts = (categoryId) => {
    const category = relations.find(
      (relation) => relation.category._id === categoryId
    );
    return category ? category.items : [];
  };

  const handleAddCategory = async (name, description) => {
    try {
      await axios.post(
        `${API_BASE_URL}/categories`,
        { name, description },
        { headers }
      );
      fetchCategories();
      alert("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category.");
    }
  };

  const handleAddItem = async (cId, title, description, price, stock) => {
    try {
      const productResponse = await axios.post(
        `${API_BASE_URL}/products`,
        {
          title,
          description,
          price,
          stock,
        },
        { headers }
      );
      const pId = productResponse.data.item._id;

      await axios.post(
        `${API_BASE_URL}/relations`,
        { category: cId, item: pId },
        { headers }
      );

      fetchItems();
      fetchRelations();
      alert("Item added successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item.");
    }
  };

  const handleEditItem = async (id, cId, title, description, price, stock) => {
    try {
      const updateResponse = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price,
          stock,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error(
          `Failed to update product. Status: ${updateResponse.status}`
        );
      }

      const relationResponse = await fetch(`${API_BASE_URL}/relations`, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: cId,
          item: id,
        }),
      });

      if (!relationResponse.ok) {
        throw new Error(
          `Failed to create relation. Status: ${relationResponse.status}`
        );
      }

      await fetchItems();
      await fetchRelations();

      setEditPopupVisible(false);
      alert("Item updated successfully!");
    } catch (error) {
      console.error("Error editing item:", error);
      alert("Failed to edit item.");
    }
  };

  const handleDeleteItem = async (item) => {
    try {
      if (window.confirm(`Are you sure to delete Item: ${item.title}?`)) {
        await axios.delete(`${API_BASE_URL}/products/${item._id}`, { headers });
        fetchItems();
        alert("Item deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };

  const handleCategoryClick = (id) => {
    setFocusedCategoryId(id === focusedCategoryId ? null : id);
  };
  const handleEditClick = (item) => {
    setEditItemData(item);
    setEditPopupVisible(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const description = e.target.description.value.trim();
    const price = parseFloat(e.target.price.value);
    const stock = parseInt(e.target.stock.value, 10);
    const categoryId = e.target.category.value;

    if (title && !isNaN(price) && !isNaN(stock) && categoryId) {
      handleEditItem(
        editItemData._id,
        categoryId,
        title,
        description,
        price,
        stock
      );
    }
  };

  const fileInputRefs = useRef({});

  const handleImageUpload = async (file, itemId) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "item");
    formData.append("typeId", itemId);

    try {
      const response = await fetch("http://localhost:8000/images", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleButtonClick = (itemId) => {
    fileInputRefs.current[itemId].click(); // Simulate a click on the hidden file input
  };

  const handleFileChange = (e, itemId) => {
    const file = e.target.files[0];
    handleImageUpload(file, itemId); // Pass the selected file and item ID
  };

  return (
    <div className="item-management-container">
      <h2>Item Management</h2>

      <input
        type="text"
        placeholder="Search Items"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const name = e.target.name.value.trim();
          const description = e.target.description.value.trim();
          if (name) handleAddCategory(name, description);
        }}
      >
        <h3>Add New Category</h3>
        <input type="text" name="name" placeholder="Category Name" required />
        <input
          type="text"
          name="description"
          placeholder="Category Description"
        />
        <button type="submit" className="add-category-btn">
          Add Category
        </button>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value.trim();
          const description = e.target.description.value.trim();
          const price = parseFloat(e.target.price.value);
          const stock = parseInt(e.target.stock.value, 10);
          const categoryId = e.target.category.value;

          if (title && !isNaN(price) && !isNaN(stock) && categoryId) {
            handleAddItem(categoryId, title, description, price, stock);
          }
        }}
      >
        <h3>Add New Item</h3>
        <input type="text" name="title" placeholder="Item Title" required />
        <select name="category" required>
          <option value="" disabled selected>
            Select a Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <input type="text" name="description" placeholder="Item Description" />
        <input type="number" name="price" placeholder="Item Price" required />
        <input type="number" name="stock" placeholder="Item Stock" required />
        <button type="submit" className="add-item-btn">
          Add Item
        </button>
      </form>

      <div className="category-list">
        {categories.map((category) => (
          <div key={category._id} className="category-container">
            <h3 onClick={() => handleCategoryClick(category._id)}>
              {category.name}
            </h3>
            <ul className="item-list">
              {filteredProducts(category._id).map((item) => (
                <li key={item._id} className="item-list-item">
                  <span>{item.title}</span>
                  <span>${item.price}</span>
                  <span>{item.stock} in stock</span>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteItem(item)}
                  >
                    Delete
                  </button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick(item._id)}
                  >
                    Upload Image
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={(el) => (fileInputRefs.current[item._id] = el)}
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e, item._id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {isEditPopupVisible && (
        <div className="edit-popup">
          <h3>Edit Item</h3>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              name="title"
              defaultValue={editItemData.title}
              placeholder="Item Title"
              required
            />
            <select
              name="category"
              defaultValue={editItemData.category}
              required
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="description"
              defaultValue={editItemData.description}
              placeholder="Item Description"
            />
            <input
              type="number"
              name="price"
              defaultValue={editItemData.price}
              placeholder="Item Price"
              required
            />
            <input
              type="number"
              name="stock"
              defaultValue={editItemData.stock}
              placeholder="Item Stock"
              required
            />
            <button type="submit" className="save-item-btn">
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditPopupVisible(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ItemManagement;
