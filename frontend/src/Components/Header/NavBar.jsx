import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`nav-bar ${isSticky ? "sticky" : ""}`}>
      <div className="container">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/profile">ContactUs</Link>
        <Link to="/contact">ContactUs</Link>
      </div>
    </div>
  );
}
