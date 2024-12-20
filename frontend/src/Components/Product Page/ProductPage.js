import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  Box,
  Button,
  Typography,
  IconButton,
  CircularProgress,
  Grid,
  TextField,
  Rating,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import FeedbackReviews from "../FeedbackReviews/FeedbackReviews";

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
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const { ProductID } = useParams();
  const apiUrl = `http://localhost:8000/products`;

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);

  const userId = JSON.parse(localStorage.getItem("user"))?._id; // Safe check for userId

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
  }, [ProductID, apiUrl]);

  const inStock = product?.stock > 0;

  const handleIncrease = () => {
    if (quantity < product?.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!inStock) return;

    try {
      const response = await fetch("http://localhost:8000/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userId,
          items: [{ item: ProductID, quantity: quantity }],
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setCartDialogOpen(true);
      } else {
        console.error("Failed to add item to cart:", data);
        alert("You exceed amount of the stock.");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("An error occurred while adding the item to cart.");
    }
  };

  const handleSubmitFeedback = async () => {
    if (!rating || !comment) {
      setFeedbackMessage("Please provide both a rating and a comment.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: ProductID,
          user: userId,
          rating: rating,
          comment: comment,
        }),
      });

      if (response.ok) {
        setFeedbackMessage("Feedback submitted successfully.");
        setRating(null);
        setComment("");
        setOpenDialog(true);
      } else {
        setFeedbackMessage("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setFeedbackMessage("An error occurred while submitting feedback.");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    window.location.reload();
  };

  const handleCartDialogClose = () => {
    setCartDialogOpen(false);
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
                product?._id ? require(`../../images/${product._id}.jpg`) : ""
              }
              alt={product?.title || "Product image"}
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
              {product?.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: theme.palette.info.main, marginBottom: 3 }}
            >
              {product?.description}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", marginBottom: 3 }}>
              {product?.tags &&
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
              Price: ${product?.price}
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
                  disabled={quantity === product?.stock}
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

        <Divider sx={{ marginY: 4 }} />
        <Grid item xs={12} sx={{ marginTop: 5 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: theme.palette.info.main,
              marginBottom: 3,
            }}
          >
            Leave Feedback
          </Typography>

          <Box sx={{ marginBottom: 3 }}>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              size="large"
            />
          </Box>

          <TextField
            label="Your Comment"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmitFeedback}
            sx={{ marginTop: 2 }}
          >
            Submit Feedback
          </Button>

          {feedbackMessage && (
            <Typography variant="body1" sx={{ marginTop: 2, color: "#dc3545" }}>
              {feedbackMessage}
            </Typography>
          )}
        </Grid>

        <Divider sx={{ marginY: 4 }} />

        <Grid item xs={12} sx={{ marginTop: 5 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: theme.palette.info.main,
              marginBottom: 3,
            }}
          >
            Feedbacks
          </Typography>
          <FeedbackReviews />
        </Grid>
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Feedback Submission</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Your feedback has been submitted successfully!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={cartDialogOpen} onClose={handleCartDialogClose}>
        <DialogTitle>Cart Update</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {quantity} {product?.title} added to cart successfully!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCartDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default ProductPage;
