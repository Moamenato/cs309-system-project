import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../../Styles/AdminHomePage.css";

function Header() {
  const navLinks = [
    { path: "/", label: "Dashboard" },
    { path: "/user-management", label: "User Management" },
    { path: "/item-management", label: "Item Management" },
    { path: "/profileadime", label: "Profile" },
  ];

  return (
    <header className="admin-header">
      <nav>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function AdminHomePage() {
  return (
    <div className="admin-homepage">
      <Header />
      <main className="main-content">
      </main>
    </div>
  );
}
