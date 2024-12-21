import React, { useRef } from "react";

const ImageUploadButton = ({ item }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "item");
    formData.append("typeId", item._id);

    try {
      const response = await fetch("http://localhost:8000/images", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        style={{
          backgroundColor: "#F4CE14",
          color: "#000",
          padding: "5px 10px",
          fontSize: "12px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Upload Image
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploadButton;
