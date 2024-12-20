import React, { useState, useEffect } from "react";
import axios from "axios";
import "./itemmangment.css";

function ItemManagement() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedCategoryId, setFocusedCategoryId] = useState(null);

  const API_BASE_URL = "http://localhost:8000";
  const AUTH_TOKEN = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjMzOTdlNWUwNmRlYWNiZWFhNDA5NyIsImlhdCI6MTczNDYyODE5MSwiZXhwIjoxNzQyNDA0MTkxfQ.m05XyTM5DmaZsnZjKS40T2-RFW7mUwrtucCntDMSobo`;
  const headers = { Authorization: AUTH_TOKEN };

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/`, { headers });
      console.log("Categories fetched:", response.data);
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch items from API
  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/`, { headers });
      console.log("Items fetched:", response.data);
      setItems(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Add new category
  const handleAddCategory = async (name, description) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/categories/`,
        { name, description },
        { headers }
      );
      // setCategories((prevCategories) => [...prevCategories, response.data]);
      fetchCategories();
      alert("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category.");
    }
  };

  // Add new item
  const handleAddItem = async (cId, title, description, price, stock) => {
    try {
      console.log(cId);
      const requestBody = { title, cId,description, price, stock };
      const response = await axios.post(`${API_BASE_URL}/products/`, requestBody, { headers });
fetchItems();
      alert("Item added successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item.");
    }
  };
  const handleDeleteItem = async (item) => {
    try {
      alert(`Are you sure to delete Item: ${item.title}`);
      await axios.delete(`${API_BASE_URL}/products/${item._id}`, { headers });
      fetchItems();
      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  }

  // Handle category click
  const handleCategoryClick = (id) => {
    setFocusedCategoryId(id === focusedCategoryId ? null : id);
  };

  // Filter items by search term
  const filteredItems = (categoryId) =>{
    console.log("categoryId",categoryId);
    if(searchTerm){

      return items.filter(
         (item) =>
           item.title?.toLowerCase().includes(searchTerm?.toLowerCase()) &&
           (!categoryId || item.cId === categoryId)
       );
    }else{
      const it=items.filter(item => item.cId === categoryId);
      console.log("it",it);
      return it;
    }
  }

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
        <input type="text" name="description" placeholder="Category Description" />
        <button type="submit" className="add-category-btn">Add Category</button>
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
          <option value="" disabled selected>Select a Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        <input type="text" name="description" placeholder="Item Description" />
        <input type="number" name="price" placeholder="Item Price" required />
        <input type="number" name="stock" placeholder="Item Stock" required />
        <button type="submit" className="add-item-btn">Add Item</button>
      </form>

      <div className="category-list">
        {categories.map((category) => (
          <div key={category._id} className="category-container">
            <h3 onClick={() => handleCategoryClick(category._id)}>{category.name}</h3>
            <ul className="item-list">
              {filteredItems(category._id).map((item) => (
                <li key={item._id} className="item-list-item">
                  <span>{item.title}</span>
                  <span>${item.price}</span>
                  <span>{item.stock} in stock</span>
                  <button className="edit-btn" onClick={() => alert(`Edit Item: ${item._id}`)}>Edit</button>
                  <button className="delete-btn" onClick={()=>handleDeleteItem(item)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemManagement;
