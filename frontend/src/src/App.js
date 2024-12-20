import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Website Pages
import HomePage from "./Pages/Home/HomePage";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CartPage from "./Components/Cart Page/CartPage.jsx";
import ProfilePage from "./Pages/Profile/Profile";
import ProductPage from "./Components/Product Page/ProductPage";
import Navbar from "./Components/Header/NavBar.jsx";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer.js";
import ProductList from "./Components/Product List/ProductList";
import { AdminHomePage } from "./Pages/Admin/adminhomepage";
import Dashboard from "./Pages/Admin/Components/Dashboard/dashboard";
import UserManagement from "./Pages/Admin/Components/Usermanagment/usermanagement";
import ItemManagement from "./Pages/Admin/Components/Itemmangment/itemmangment";
import AdminProfile from "./Pages/Admin/Components/profile/profile";
import AdminHeader from "./Pages/Admin/Components/AdminHeader.jsx";

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = storedUser ? storedUser.isAdmin : false;

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="app">
      <div className="wrapper">
        <header>
          <Header />
          {!isAdmin && <Navbar onCategorySelect={handleCategorySelect} />}
          {isAdmin && <AdminHeader />}
        </header>
        <main>
          <Routes>
            {isAdmin ? (
              <>
                <Route path="/*" element={<AdminHomePage />} />
                <Route path="/admin/Dashboard" element={<Dashboard />} />
                <Route
                  path="/admin/user-management"
                  element={<UserManagement />}
                />
                <Route
                  path="/admin/item-management"
                  element={<ItemManagement />}
                />
                <Route path="/admin/settings" element={<AdminProfile />} />
              </>
            ) : (
              <>
                <Route path="/category/:CategoryID" element={<ProductList />} />
                <Route path="/*" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/products/:ProductID" element={<ProductPage />} />
              </>
            )}
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default App;
