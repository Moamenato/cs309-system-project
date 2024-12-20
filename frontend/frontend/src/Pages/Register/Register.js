import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Container,
  Grid,
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
      const response = await fetch("http://localhost:8000/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phone_number: phoneNumber,
          isAdmin: false,
        }),
      });

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

  const textFieldStyles = {
    "& .MuiInputBase-input": { color: theme.palette.info.main },
    "& .MuiInputLabel-root": { color: theme.palette.secondary.main },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: theme.palette.secondary.main },
      "&:hover fieldset": { borderColor: theme.palette.primary.main },
      "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
    },
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
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom color="primary">
            Register
          </Typography>
          {message && (
            <Box mt={2}>
              <Alert
                severity={message.includes("success") ? "success" : "error"}
                sx={{
                  backgroundColor: message.includes("success")
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
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "100%" }}
          >
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  aria-label="Name"
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email"
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Password"
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phone"
                  label="Phone (optional)"
                  name="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  aria-label="Phone"
                  sx={textFieldStyles}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.background.default,
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.info.main,
                },
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
