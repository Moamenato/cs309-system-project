import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  Box,
  Button,
  Typography,
  IconButton,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F4CE14",
    },
    secondary: {
      main: "#495E57",
    },
    info: {
      main: "#45474B",
    },
    background: {
      default: "#F5F7F8",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

function ProductPage() {
  const { ProductID } = useParams();
  const apiUrl = `http://localhost:8000/products`;

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/${ProductID}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [ProductID]);

  const inStock = product.stock > 0;

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (inStock) {
      alert(`${quantity} ${product.title} added to cart!`);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          margin: "20px",
          padding: "20px",
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={3} sx={{ width: "100%" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={
                product._id ? require(`../../images/${product._id}.jpg`) : ""
              }
              alt={product.title}
              style={{
                maxWidth: "100%",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: theme.palette.info.main,
                marginBottom: 2,
              }}
            >
              {product.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: theme.palette.info.main, marginBottom: 3 }}
            >
              {product.description}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", marginBottom: 3 }}>
              {product.tags &&
                product.tags.map((tag, index) => (
                  <Box
                    key={index}
                    sx={{
                      margin: "5px",
                      padding: "8px 16px",
                      border: `2px solid ${theme.palette.primary.main}`,
                      borderRadius: "50px",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                        color: "#fff",
                      },
                    }}
                  >
                    {tag}
                  </Box>
                ))}
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                marginBottom: 2,
              }}
            >
              Price: ${product.price}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: inStock ? "#28a745" : "#dc3545",
                marginBottom: 3,
              }}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </Typography>

            {inStock && (
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                <IconButton
                  onClick={handleDecrease}
                  disabled={quantity === 1}
                  sx={{ backgroundColor: "#f1f1f1", marginRight: 1 }}
                >
                  <Remove />
                </IconButton>
                <Typography variant="h6" sx={{ marginX: 2 }}>
                  {quantity}
                </Typography>
                <IconButton
                  onClick={handleIncrease}
                  disabled={quantity === product.stock}
                  sx={{ backgroundColor: "#f1f1f1", marginLeft: 1 }}
                >
                  <Add />
                </IconButton>
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 3 }}
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default ProductPage;
