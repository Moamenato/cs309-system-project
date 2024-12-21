import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  createTheme,
  ThemeProvider,
  Button,
  Rating,
} from "@mui/material";

const splitComment = (comment) => {
  const maxLength = 100;
  const lines = [];
  for (let i = 0; i < comment.length; i += maxLength) {
    lines.push(comment.slice(i, i + maxLength));
  }
  return lines;
};

const theme = createTheme({
  palette: {
    primary: { main: "#F4CE14" },
    secondary: { main: "#495E57" },
    info: { main: "#45474B" },
    background: { default: "#F5F7F8" },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

const FeedbackReviews = () => {
  const { ProductID } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleReviews, setVisibleReviews] = useState(4);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/feedback/item/${ProductID}`
        );
        const data = await response.json();

        const sortedFeedbacks = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setFeedbacks(sortedFeedbacks);
      } catch (err) {
        setError("Failed to fetch feedbacks");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [ProductID]);

  const handleShowMore = () => {
    setVisibleReviews(visibleReviews + 4);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          p: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <Typography
            variant="h6"
            align="center"
            sx={{ color: theme.palette.secondary.main }}
          >
            Loading feedbacks...
          </Typography>
        ) : error ? (
          <Typography
            variant="h6"
            align="center"
            sx={{ color: theme.palette.error.main }}
          >
            {error}
          </Typography>
        ) : feedbacks.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            sx={{ color: theme.palette.secondary.main }}
          >
            No feedbacks available for this product.
          </Typography>
        ) : (
          <>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ width: 1000 }}
            >
              {feedbacks.slice(0, visibleReviews).map((feedback) => (
                <Grid item xs={12} key={feedback._id}>
                  <Card
                    sx={{
                      boxShadow: 3,
                      backgroundColor: "white",
                      borderRadius: 2,
                      width: 1000,
                      marginBottom: 2,
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          marginBottom: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: theme.palette.secondary.main,
                            fontWeight: "bold",
                            marginBottom: 1,
                            marginRight: 2,
                          }}
                        >
                          {feedback.user? feedback.user.name :"deleted user"}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.info.main,
                            fontSize: "0.9rem",
                            marginTop: "4px",
                          }}
                        >
                          {new Date(feedback.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          marginBottom: 2,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                        }}
                      >
                        <Rating
                          value={feedback.rating}
                          readOnly
                          sx={{
                            color: theme.palette.primary.main,
                          }}
                        />
                        {splitComment(feedback.comment).map((line, index) => (
                          <Typography
                            key={index}
                            variant="body1"
                            sx={{
                              color: theme.palette.info.main,
                              fontStyle: "italic",
                              marginTop: 1,
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                              width: 1000,
                            }}
                          >
                            "{line}"
                          </Typography>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {visibleReviews < feedbacks.length && (
              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleShowMore}
                  sx={{ marginTop: 2 }}
                >
                  Show More
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default FeedbackReviews;
