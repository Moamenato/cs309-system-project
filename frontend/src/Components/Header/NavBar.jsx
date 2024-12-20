import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Container,
  Hidden,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ArrowDropDown, Menu as MenuIcon } from "@mui/icons-material";
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

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/relations");
        const data = await response.json();
        const categoryList = data.map((relation) => relation.category);
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (categoryId) => {
    navigate(`/category/${categoryId}`);
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: theme.palette.secondary.main }}
            >
              <Link
                to="/"
                style={{
                  color: "#F4CE14",
                  textDecoration: "none",
                }}
              >
                Epic Hardware
              </Link>
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Hidden smDown>
                <Button
                  component={Link}
                  to="/"
                  sx={{
                    color: theme.palette.secondary.main,
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  Home
                </Button>
                <Button
                  component={Link}
                  to="/about"
                  sx={{
                    color: theme.palette.secondary.main,
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  About
                </Button>

                <Button
                  onClick={handleMenuClick}
                  sx={{
                    color: theme.palette.secondary.main,
                    display: "flex",
                    alignItems: "center",
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  Categories
                  <ArrowDropDown />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  MenuListProps={{ "aria-labelledby": "categories-button" }}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category._id}
                      onClick={() => handleCategorySelect(category._id)}
                      sx={{
                        color: theme.palette.info.main,
                        "&:hover": {
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.background.default,
                        },
                      }}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Hidden>

              <Hidden smUp>
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={() => toggleDrawer(true)}
                  sx={{
                    display: { sm: "none", xs: "block" },
                    marginLeft: "auto",
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          display: { sm: "none", xs: "block" },
        }}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem
              button
              component={Link}
              to="/"
              onClick={() => toggleDrawer(false)}
            >
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/about"
              onClick={() => toggleDrawer(false)}
            >
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button onClick={handleMenuClick}>
              <ListItemText primary="Categories" />
            </ListItem>
            {categories.map((category) => (
              <ListItem
                key={category._id}
                button
                onClick={() => handleCategorySelect(category._id)}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
};

export default Navbar;
