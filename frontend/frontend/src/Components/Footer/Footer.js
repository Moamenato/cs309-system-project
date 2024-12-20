import React from "react";
import { Box, Typography, Link, IconButton, createTheme, ThemeProvider } from "@mui/material";
import { Facebook, Instagram, YouTube, Email } from "@mui/icons-material";

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

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.main, 
          color: "white",
          padding: "20px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            marginBottom: 2,
          }}
        >
          <Link
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <IconButton sx={{ color: "white" }}>
              <Facebook />
            </IconButton>
          </Link>

          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <IconButton sx={{ color: "white" }}>
              <Instagram />
            </IconButton>
          </Link>

          <Link
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <IconButton sx={{ color: "white" }}>
              <YouTube />
            </IconButton>
          </Link>

          <Link
            href="mailto:your-email@example.com"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <IconButton sx={{ color: "white" }}>
              <Email />
            </IconButton>
          </Link>
        </Box>

        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          &copy; 2024 Your Company. All rights reserved.
        </Typography>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/privacy-policy"
            sx={{ color: "white", textDecoration: "none" }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            sx={{ color: "white", textDecoration: "none" }}
          >
            Terms of Service
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
