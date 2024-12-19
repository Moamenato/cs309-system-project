import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../../Styles/AdminHomePage.css";
import Dashboard from "./Components/Dashboard/dashboard";
import UserManagement from "./Components/Usermanagment/usermanagement";
import ItemManagement from "./Components/Itemmangment/itemmangment";
import Profile from "./Components/profile/profile";

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
        <Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/user-management" element={<UserManagement />} />
  <Route path="/item-management" element={<ItemManagement />} />
  <Route path="/settings" element={<Profile />} />
</Routes>

      </main>
    </div>
  );
}
