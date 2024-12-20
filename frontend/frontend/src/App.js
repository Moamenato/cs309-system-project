import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Website Pages
import HomePage from "./Pages/Home/HomePage";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CartPage from "./Components/Cart Page/CartPage.jsx";
import ProfilePage from "./Pages/Profile/Profile";
import ProductPage from "./Components/Product Page/ProductPage";
import ContactUs from "./Pages/ContactUs";
import Navbar from "./Components/Header/NavBar.jsx"; // Import Navbar
import Header from "./Components/Header/Header";
import Products from "./Pages/Products";
import ProductList from "./Components/Product List/ProductList"; // Import ProductList
import { AdminHomePage } from "./Pages/Admin/adminhomepage";
import Dashboard from "./Pages/Admin/Components/Dashboard/dashboard";
import UserManagement from "./Pages/Admin/Components/Usermanagment/usermanagement";
import ItemManagement from "./Pages/Admin/Components/Itemmangment/itemmangment";
import AdminProfile from "./Pages/Admin/Components/profile/profile";
import Footer from "./Components/Footer/Footer.js";
function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Function to handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="app">
      <div class="wrapper">
        <header>
          <Header />
          <Navbar onCategorySelect={handleCategorySelect} />{" "}
        </header>
        <main>
          {" "}
          {/* Passing function to Navbar */}
          <Routes>
            <Route path="/category/:CategoryID" element={<ProductList />} />
            <Route path="/*" element={<HomePage />} />
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/admin/Dashboard" element={<Dashboard />} />
            <Route path="/admin/user-management" element={<UserManagement />} />
            <Route path="/admin/item-management" element={<ItemManagement />} />
            <Route path="/admin/settings" element={<AdminProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/products/:ProductID" element={<ProductPage />} />
          </Routes>
        </main>
        <footer>
          {" "}
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default App;
