import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductCard from "../Product Card/ProductCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const ProductList = () => {
  const { CategoryID } = useParams();
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/relations/${CategoryID}`
        );

        const data = await response.json();
        setProducts(data[0].items);
        setCategory(data[0].category);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    if (CategoryID) {
      fetchProducts();
    }
  }, [CategoryID]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 2,
          padding: 2,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          {category.name ? `Products in Category: ${category.name}` : ""}
        </Typography>

        {loading ? (
          <CircularProgress color="primary" />
        ) : products.length > 0 ? (
          <Grid container spacing={2} justifyContent="center">
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">
            No products found in this category.
          </Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ProductList;
