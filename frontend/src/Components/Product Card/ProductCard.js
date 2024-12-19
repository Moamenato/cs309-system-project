import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Tooltip,
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

const ProductCard = ({ product }) => {
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
      <Card
        sx={{
          maxWidth: 300,
          minHeight: 420,
          margin: 2,
          backgroundColor: theme.palette.background.default,
          display: "flex",
          flexDirection: "column",
          "@media (max-width: 600px)": {
            maxWidth: "100%",
            margin: "10px 0",
          },
        }}
      >
        <Link
          to={`/products/${product._id}`}
          style={{ textDecoration: "none" }}
        >
          <CardMedia
            component="img"
            height="200"
            image={
              product._id ? require(`../../images/${product._id}.jpg`) : ""
            }
            alt={product.title}
            sx={{
              objectFit: "contain",
              borderRadius: 4,
            }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: theme.palette.info.main,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {product.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.primary.main }}
            >
              {product.price}$
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: inStock ? "green" : "red",
                fontWeight: "bold",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {inStock ? "In stock" : "Out of stock"}
            </Typography>
          </CardContent>
        </Link>

        {inStock && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Tooltip title="Decrease quantity">
              <IconButton
                onClick={handleDecrease}
                disabled={quantity === 1}
                sx={{
                  backgroundColor: "#f1f1f1",
                  "&:disabled": { backgroundColor: "#e0e0e0" },
                }}
              >
                <Remove />
              </IconButton>
            </Tooltip>
            <Typography variant="body1" sx={{ marginX: 2, fontSize: 16 }}>
              {quantity}
            </Typography>
            <Tooltip title="Increase quantity">
              <IconButton
                onClick={handleIncrease}
                disabled={quantity === product.stock}
                sx={{
                  backgroundColor: "#f1f1f1",
                  "&:disabled": { backgroundColor: "#e0e0e0" },
                }}
              >
                <Add />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            disabled={!inStock}
            onClick={handleAddToCart}
            sx={{
              padding: "8px 16px",
              backgroundColor: inStock ? theme.palette.primary.main : "#cccccc",
              "&:hover": {
                backgroundColor: inStock
                  ? theme.palette.primary.dark
                  : "#e0e0e0",
              },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default ProductCard;