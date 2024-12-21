import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: { main: "#F4CE14" },
    secondary: { main: "#495E57" },
    info: { main: "#45474B" },
    background: { default: "#F5F7F8" },
  },
  typography: { fontFamily: "Arial, sans-serif" },
});

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASEURL}/auth`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            phone_number: phoneNumber,
            isAdmin: false,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        console.log("Registered user:", data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        navigate("/home");
        window.location.reload();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: 3,
          p: 4,
          mt: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              marginBottom: 2,
              color: theme.palette.primary.main,
              textAlign: "center",
            }}
          >
            Register
          </Typography>

          {message && (
            <Box mt={2}>
              <Alert
                severity={message.includes("success") ? "success" : "error"}
                sx={{
                  backgroundColor: message.includes("Invalid email or password")
                    ? theme.palette.primary.main
                    : message.includes("success")
                    ? theme.palette.primary.main
                    : theme.palette.info.main,
                  color: theme.palette.background.default,
                }}
              >
                {message}
              </Alert>
            </Box>
          )}

          <Box
            sx={{
              width: "100%",
              maxWidth: 500,
              padding: 3,
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{
                  marginBottom: 2,
                  backgroundColor: "#FFFFFF",
                }}
              />

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  marginBottom: 2,
                  backgroundColor: "#FFFFFF",
                }}
              />

              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  marginBottom: 2,
                  backgroundColor: "#FFFFFF",
                }}
              />

              <TextField
                label="Phone (optional)"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                sx={{
                  marginBottom: 2,
                  backgroundColor: "#FFFFFF",
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: theme.palette.secondary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                  },
                  mt: 2,
                }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
