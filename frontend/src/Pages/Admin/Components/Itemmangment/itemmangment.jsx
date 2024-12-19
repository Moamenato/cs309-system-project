import React, { useState } from "react";
import "./itemmangment.css";

function ItemManagement() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Category A",
      items: [
        { id: 1, name: "Item 1", price: 100, stock: 50 },
        { id: 2, name: "Item 2", price: 150, stock: 30 },
      ],
    },
    {
      id: 2,
      name: "Category B",
      items: [
        { id: 3, name: "Item 3", price: 200, stock: 20 },
        { id: 4, name: "Item 4", price: 250, stock: 40 },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleAddCategory = () => {
    alert("Add Category functionality to be implemented");
  };

  const handleEditCategory = (id) => {
    alert(`Edit Category with ID: ${id}`);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleDeleteItem = (categoryId, itemId) => {
    setCategories(categories.map((category) =>
      category.id === categoryId
        ? { ...category, items: category.items.filter(item => item.id !== itemId) }
        : category
    ));
  };

  const filteredItems = (items) => {
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="item-management-container">
      <h2>Item Management</h2>
      <button className="add-category-btn" onClick={handleAddCategory}>
        Add New Category
      </button>
      
      <input
        type="text"
        placeholder="Search Items"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <div className="category-list">
        {categories.map((category) => (
          <div key={category.id} className="category-container">
            <h3>{category.name}</h3>
            <button
              className="edit-category-btn"
              onClick={() => handleEditCategory(category.id)}
            >
              Edit Category
            </button>
            <button
              className="delete-category-btn"
              onClick={() => handleDeleteCategory(category.id)}
            >
              Delete Category
            </button>
            
            <table className="item-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems(category.items).map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>{item.stock}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => alert(`Edit Item with ID: ${item.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteItem(category.id, item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemManagement;
