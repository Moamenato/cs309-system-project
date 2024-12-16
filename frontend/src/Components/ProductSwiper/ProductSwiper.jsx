import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ProductSwiper.css";
import { useNavigate } from "react-router-dom";

const ProductSwiper = ({ products }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const swiperRef = useRef(null);

  // Add to Cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setPopupMessage(`${product.name} added to the cart!`);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  // Filter products
  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.category === filter);

  // hover to stop auto swipe
  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  // Hover away and resume autoplay
  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <div className="product-swiper">
      {/* Filter Section */}
      <div className="filter-container">
        <label htmlFor="filter">Filter by Category: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Latest</option>
          <option value="bundles">Bundles</option>
          <option value="best">Best Sellers</option>
          <option value="specials">Specials</option>
          <option value="soon">Coming Soon</option>
        </select>
      </div>

      {/* Swiper Section */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        spaceBetween={20}
        slidesPerView={4}
        // slidesPerGroup={4}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop={true}
        watchOverflow={true}
        ref={swiperRef}
      >
        {filteredProducts.map((product, index) => (
          <SwiperSlide key={index}>
            <div
              className="product-card"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={product.image} alt={product.name} />
              <span>{product.category}</span>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                {/* Display the category */}
              </div>
              <button
                className="add-to-cart"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="site-button" onClick={() => navigate("/products")}>
        SEE ALL PRODUCTS
      </button>

      {/* Popup Notification */}
      {showPopup && (
        <div className="popup-notification">
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ProductSwiper;
