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

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Logged in user:", data.user);
        navigate("/home");
        window.location.reload();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
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
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom color="primary">
            Login
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
