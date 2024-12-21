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
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "user");
    formData.append("typeId", user._id);
    // console.log(formData);
    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASEURL}/images`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log(data);
      setImagePreview(
        `${import.meta.env.REACT_APP_BASEURL}/images/user/` + user._id
      );
      window.location.reload();
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, image: data.path })
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    if (user?.image) {
      // setImagePreview(user.image);
      setImagePreview(
        `${import.meta.env.REACT_APP_BASEURL}/images/user/${user._id}`
      );
    } else if (user?._id) {
      setImagePreview(
        `${import.meta.env.REACT_APP_BASEURL}/images/user/${user._id}`
      );
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
