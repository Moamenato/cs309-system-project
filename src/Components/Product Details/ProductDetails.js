import React, { useState } from "react";
import {
  createTheme,
  ThemeProvider,
  Box,
  Button,
  Typography,
  IconButton,
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

function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ padding: 4, backgroundColor: theme.palette.background.default }}
      >
        <Typography variant="h3" align="center">
          {product.title}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary">
          Product Description
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <img
            src={product._id ? require(`../../images/${product._id}.jpg`) : ""}
            alt={product.title}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
          <Box sx={{ width: "60%" }}>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="h6" color="textPrimary">
              Price: ${product.price}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Tags: {product.tags ? product.tags.join(", ") : "N/A"}
            </Typography>

            <Typography
              variant="body2"
              sx={{ marginTop: 1, color: inStock ? "green" : "red" }}
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
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ProductDetails;
