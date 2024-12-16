import "../../Styles/HomePage.css";
import Header from "../../Components/Header/Header";
import NavBar from "../../Components/Header/NavBar";
import BackToTopButton from "../../Components/BackToTopButton";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import ProductSwiper from "../../Components/ProductSwiper/ProductSwiper";
import { mockProductData } from "../../Data/Products"; // Importing the mock data

export default function HomePage() {
  // Mock landing images, later will apply api
  const images = [
    "https://via.placeholder.com/1920x1080/FF5733/FFFFFF?text=Image+1",
    "https://via.placeholder.com/1920x1080/33C1FF/FFFFFF?text=Image+2",
    "https://via.placeholder.com/1920x1080/FFC933/FFFFFF?text=Image+3",
  ];

  return (
    <div className="home">
      <Header />

      <NavBar />

      <BackToTopButton />

      <ImageSlider images={images} />

      <div className="container">
        <div className="ad">
          <img
            src="https://via.placeholder.com/1200x400/000000/FFFFFF?text=Ad "
            alt="ad"
            className="ad"
          />
        </div>
      </div>

      {/* <div className="container">
        <SectionHeader
          heading="Why buy from us?"
          description="With more than 10 years of experience in computer components, which helps us to meet your needs in purchasing the best components at the lowest prices."
        />
      </div> */}

      <div className="featured-products">
        <div className="container">
          <SectionHeader
            heading="Featured Products"
            description="CHECK LATEST PRODUCTS FROM FEATURES CATEGORIES..."
          />
          <ProductSwiper products={mockProductData} />
        </div>
      </div>

      <div className="container">
        <div className="ad">
          <img
            src="https://via.placeholder.com/1200x400/000000/FFFFFF?text=Ad "
            alt="ad"
            className="ad"
          />
        </div>
      </div>
    </div>
  );
}
