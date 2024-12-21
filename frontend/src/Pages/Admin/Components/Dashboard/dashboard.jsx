import React, { useState, useEffect } from "react";
import "./dashboard.css";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchItems();
    fetchUsers();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };
  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:8000/products");
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8000/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };
  
  const stats = [
    { title: "Total Users", value: users.length },
    { title: "Total Categories", value: categories.length },
    { title: "Total Items", value: items.length },
    { title: "Total Orders", value: orders.length },
  ];

  return (
    <div className="dashboard-container">
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-box" key={index}>
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
