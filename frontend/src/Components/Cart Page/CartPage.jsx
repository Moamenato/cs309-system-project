import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";

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

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutError, setCheckoutError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;

  useEffect(() => {
    if (!userId) {
      console.error("User not found in localStorage");
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch(`https://epic-hardware-test-os6r45i7v-moamenatos-projects.vercel.app/cart/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setCartItems(data.items);
        } else {
          console.error("Failed to fetch cart:", data);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
      setLoading(false);
    };

    fetchCart();
  }, [userId]);

  const deleteItem = async (cartItemId) => {
    try {
      const response = await fetch(
        `https://epic-hardware-test-os6r45i7v-moamenatos-projects.vercel.app/cart/${userId}/remove-item`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId: cartItemId }),
        }
      );

      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== cartItemId)
        );
      } else {
        console.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        `https://epic-hardware-test-os6r45i7v-moamenatos-projects.vercel.app/cart/checkout/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Checkout successful!");
        setCartItems([]);
      } else {
        setCheckoutError(data.message || "Error during checkout");
      }
    } catch (error) {
      setCheckoutError("Error during checkout");
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, cartItem) => {
        return total + cartItem.item.price * cartItem.quantity;
      }, 0)
      .toFixed(2);
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
        sx={{ padding: 2, backgroundColor: theme.palette.background.default }}
      >
        {cartItems.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              width: "100%",
              textAlign: "center",
              color: theme.palette.info.main,
            }}
          >
            Your cart is empty.
          </Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: theme.palette.background.default }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="cart table">
              <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#F4CE14",
                      color: theme.palette.background.default,
                      fontWeight: "bold",
                    }}
                  >
                    Product Details
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#F4CE14",
                      color: theme.palette.background.default,
                      fontWeight: "bold",
                    }}
                  >
                    Unit Price
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#F4CE14",
                      color: theme.palette.background.default,
                      fontWeight: "bold",
                    }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#F4CE14",
                      color: theme.palette.background.default,
                      fontWeight: "bold",
                    }}
                  >
                    Subtotal
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#F4CE14",
                      color: theme.palette.background.default,
                      fontWeight: "bold",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((cartItem) => (
                  <TableRow key={cartItem._id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={`https://epic-hardware-test-os6r45i7v-moamenatos-projects.vercel.app/images/item/${cartItem.item._id}`}
                          alt={cartItem.item.title}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "contain",
                            marginRight: 10,
                          }}
                        />
                        {cartItem.item.title}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.info.main }}>
                      ${cartItem.item.price}
                    </TableCell>
                    <TableCell>{cartItem.quantity}</TableCell>
                    <TableCell sx={{ color: theme.palette.background.primary }}>
                      ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteItem(cartItem._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    colSpan={3}
                    sx={{ fontWeight: "bold", textAlign: "right" }}
                  >
                    Total:
                  </TableCell>
                  <TableCell
                    sx={{ color: theme.palette.info.main, fontWeight: "bold" }}
                  >
                    ${calculateTotal()}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {checkoutError && (
          <Typography
            variant="body1"
            sx={{ color: "red", textAlign: "center", marginTop: 2 }}
          >
            {checkoutError}
          </Typography>
        )}

        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            disabled={cartItems.length === 0}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CartPage;
