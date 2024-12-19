import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Website Pages
import HomePage from "./Pages/Home/HomePage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CartPage from "./Pages/CartPage";
import ProfilePage from "./Pages/ProfilePage";
import ContactUs from "./Pages/ContactUs";
import Products from "./Pages/Products";
import { AdminHomePage } from "./Pages/Admin/adminhomepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AdminHomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
