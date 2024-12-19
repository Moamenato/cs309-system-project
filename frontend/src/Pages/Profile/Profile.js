import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

const UserPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user.image) {
      setImagePreview(user.image);
    }
  }, [user]);

  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Typography
            variant="h5"
            color="secondary"
            align="center"
            sx={{ mt: 4 }}
          >
            User not found.
          </Typography>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box
          sx={{
            mt: 4,
            textAlign: "center",
            backgroundColor: "background.default",
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom color="primary">
            User Profile
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {imagePreview ? (
                  <Avatar
                    src={imagePreview}
                    alt="Profile"
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      border: "2px solid",
                      borderColor: "secondary.main",
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      backgroundColor: "secondary.main",
                    }}
                  />
                )}
                <Button variant="contained" component="label" color="primary">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                  />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box>
                <TextField
                  label="Name"
                  value={user.name}
                  fullWidth
                  margin="normal"
                  InputProps={{ readOnly: true }}
                  color="secondary"
                />
                <TextField
                  label="Email"
                  value={user.email}
                  fullWidth
                  margin="normal"
                  InputProps={{ readOnly: true }}
                  color="secondary"
                />
                <TextField
                  label="Phone Number"
                  value={user.phone_number || "N/A"}
                  fullWidth
                  margin="normal"
                  InputProps={{ readOnly: true }}
                  color="secondary"
                />
                <TextField
                  label="Member Since"
                  value={new Date(user.createdAt).toLocaleDateString()}
                  fullWidth
                  margin="normal"
                  InputProps={{ readOnly: true }}
                  color="secondary"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserPage;
