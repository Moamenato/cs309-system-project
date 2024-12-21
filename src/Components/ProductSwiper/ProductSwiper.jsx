import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  createTheme,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link for routing

const theme = createTheme({
  palette: {
    primary: { main: "#F4CE14" },
    secondary: { main: "#495E57" },
    info: { main: "#45474B" },
    background: { default: "#F5F7F8" },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

const ProductSwiper = ({ products }) => {
  const [cart, setCart] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const productsPerView = isMobile ? 1 : isTablet ? 2 : 4;

  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user._id : null;

    if (!userId) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASEURL}/cart/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userId,
            items: [{ item: product._id, quantity: 1 }],
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`${product.title} added to cart!`);
        setCart((prevCart) => [...prevCart, product]);
      } else {
        console.error("Failed to add item to cart:", data);
        alert("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("An error occurred while adding the item to cart.");
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? products.length - productsPerView
        : prevIndex - productsPerView
    );
  };

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + productsPerView) % products.length
    );
  };

  const visibleProducts = products
    .slice(currentIndex, currentIndex + productsPerView)
    .concat(
      products.slice(
        0,
        Math.max(0, currentIndex + productsPerView - products.length)
      )
    );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          p: 3,
          borderRadius: 2,
        }}
      >
        {products.length > 0 ? (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Prev Button */}
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePrev}
              sx={{
                borderRadius: "50%",
                minWidth: "40px",
                height: "40px",
                mb: isMobile ? 2 : 0,
                mx: isMobile ? 0 : 2,
              }}
            >
              &lt;
            </Button>

            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {visibleProducts.map((product, index) => (
                <Card
                  key={index}
                  sx={{
                    width: isMobile ? "100%" : 320,
                    height: 400,
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 3,
                    backgroundColor: "white",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Link
                    to={`/products/${product._id}`} // Add the link here
                    key={index}
                    style={{ textDecoration: "none" }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={
                        product._id
                          ? `${import.meta.env.REACT_APP_BASEURL}/images/item/${
                              product._id
                            }`
                          : ""
                      }
                      alt={product.title}
                      sx={{
                        objectFit: "cover",
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.secondary.main,
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          marginTop: 1,
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                        }}
                      >
                        {product.title.length > 15
                          ? `${product.title.substring(0, 15)}...`
                          : product.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.info.main,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.tags.join(", ")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.info.main,
                          marginTop: 1,
                        }}
                      >
                        ${product.price}
                      </Typography>
                    </CardContent>
                  </Link>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleNext}
              sx={{
                borderRadius: "50%",
                minWidth: "40px",
                height: "40px",
                mt: isMobile ? 2 : 0,
                mx: isMobile ? 0 : 2,
              }}
            >
              &gt;
            </Button>
          </Box>
        ) : (
          <Typography
            variant="h6"
            align="center"
            sx={{ color: theme.palette.secondary.main }}
          >
            No products available.
          </Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ProductSwiper;
