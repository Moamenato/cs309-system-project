import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faPen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  // handle navigation
  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/register");
  };
  const goToLogin = () => {
    navigate("/login");
  };
  const goToCart = () => {
    navigate("/cart");
  };

  // tracking of number of items and total price
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // add item to the cart
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
          <SearchBar
            placeholder="Search here..."
            apiEndpoint="http://127.0.0.1:3000/api/search/title"
            caseSensitive={false}
          />
        </div>

        <div className="right">
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
          <div className="cart" onClick={goToCart}>
            <p>{`${cartItems.length} item(s) - ${totalPrice} EGP`}</p>
            <FontAwesomeIcon icon={faCartShopping} className="button" />
          </div>
        </div>
      </div>
    </div>
  );
}
