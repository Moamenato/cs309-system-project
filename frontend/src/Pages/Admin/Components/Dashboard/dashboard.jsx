import React from "react";
import "./dashboard.css";

function Dashboard() {
  const stats = [
    { title: "Total Users", value: 125 },
    { title: "Total Categories", value: 320 },
    { title: "Total Items", value: 320 },
    { title: "Total Orders", value: 150 },
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
