import { React, useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    background: {
      default: "#F5F7F8",
    },
    primary: {
      main: "#F4CE14",
    },
    secondary: {
      main: "#495E57",
    },
    text: {
      primary: "#45474B",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://epic-hardware-test-os6r45i7v-moamenatos-projects.vercel.app/auth/login", {
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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          maxHeight: "70vh",
          backgroundColor: theme.palette.background.default,
          padding: 2,
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
          Login
        </Typography>

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
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column" }}
          >
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
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
