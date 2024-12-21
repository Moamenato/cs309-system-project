import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Menu,
  MenuItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://epic-hardware-test-os6r45i7v-moamenatos-projects.vercel.app/products/search/title",
          { title: query }
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching items:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleProductClick = (itemId) => {
    navigate(`/products/${itemId}`);
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleFocus = (e) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Box position="relative">
      <TextField
        label="Search for an item..."
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={handleFocus}
        sx={{
          mb: 2,
          height: "40px",
        }}
      />
      {searchQuery.length > 2 && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(searchResults.length) && !loading}
          onClose={() => setSearchResults([])}
          PaperProps={{
            sx: {
              maxHeight: 200,
              width: "500px",
              overflowY: "auto",
              borderRadius: 2,
              boxShadow: 2,
              zIndex: 1000,
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            searchResults.map((item) => (
              <MenuItem
                key={item._id}
                onClick={() => handleProductClick(item._id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 1,
                  cursor: "pointer",
                }}
              >
                <img
                  src={
                    item._id
                      ? `https://epic-hardware-test-os6r45i7v-moamenatos-projects.vercel.app/images/item/${item._id}`
                      : ""
                  }
                  alt={item.title}
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 10,
                    borderRadius: 4,
                    objectFit: "cover",
                  }}
                />
                <ListItemText
                  primary={item.title}
                  sx={{
                    fontSize: "14px",
                    color: "#333",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                />
              </MenuItem>
            ))
          )}
        </Menu>
      )}
    </Box>
  );
};

export default SearchBar;
