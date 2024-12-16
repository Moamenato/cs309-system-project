import React from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container">
      <div className="overlay-container">{/* content here */}</div>
      <button id="register" onClick={goToRegister}>
        Go to Register
      </button>
    </div>
  );
}
