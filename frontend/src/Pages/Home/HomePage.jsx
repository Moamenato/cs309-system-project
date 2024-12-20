import "../../Styles/HomePage.css";
import BackToTopButton from "../../Components/BackToTopButton";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import ProductSwiper from "../../Components/ProductSwiper/ProductSwiper";
import image1 from "../../Assets/image1.jpg";
import image2 from "../../Assets/image2.jpg";
import image3 from "../../Assets/image3.jpg";
import React, { useState, useEffect } from "react";
export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products/");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  // Mock landing images, later will apply api
  const images = [image1, image2, image3];

  return (
    <div className="home">
      <BackToTopButton />

      <ImageSlider images={images} />

      <div className="featured-products">
        <div className="container">
          <SectionHeader heading="Featured Products" />
          <ProductSwiper products={products} />
        </div>
      </div>
    </div>
  );
}
