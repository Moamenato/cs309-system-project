import React from "react";
import "./profile.css";

function Profile() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
