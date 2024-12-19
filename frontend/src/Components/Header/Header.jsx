import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faPen,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const goToRegister = () => navigate("/register");
  const goToLogin = () => navigate("/login");
  const goToProfile = () => navigate("/profile");
  const goToCart = () => navigate("/cart");

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
    setTotalPrice(totalPrice + item.price);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="left">
          <img
            src={require("../../Assets/logo.jpg")}
            alt="logo"
            className="logo"
          />
        </div>

        <div className="mid">
          <SearchBar placeholder="Search here..." caseSensitive={false} />
        </div>

        <div className="right">
          {user ? (
            <div className="auth">
              <div className="auth-btn" onClick={goToProfile}>
                <FontAwesomeIcon icon={faUser} className="icon" />
                <p>{user.name || "Profile"}</p>
              </div>
              <div className="auth-btn" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
                <p>Logout</p>
              </div>
            </div>
          ) : (
            <div className="auth">
              <div className="auth-btn" onClick={goToLogin}>
                <FontAwesomeIcon icon={faUser} className="icon" />
                <p>Login</p>
              </div>
              <div className="auth-btn" onClick={goToRegister}>
                <FontAwesomeIcon icon={faPen} className="icon" />
                <p>Register</p>
              </div>
            </div>
          )}
          <div className="cart" onClick={goToCart}>
            <FontAwesomeIcon icon={faCartShopping} className="button" />
          </div>
        </div>
      </div>
    </div>
  );
}
