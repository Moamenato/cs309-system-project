import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="overlay-container">{/* content here */}</div>
      <button id="Login" onClick={goToLogin}>
        Go to Login
      </button>
    </div>
  );
}
