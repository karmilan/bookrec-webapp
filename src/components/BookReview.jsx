import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Grid2,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const BookReview = ({ bookId }) => {
  const { token } = useContext(AuthContext);
  const currentToken = token || localStorage.getItem("token");

  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  const fetchReviews = async () => {
    try {
      const tokenVal = currentToken.replace(/"/g, "");
      const response = await axios.get(
        `http://localhost:5000/api/reviews/book/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${tokenVal}`,
          },
        }
      );
      setReviews(response.data);
    } catch (err) {
      console.error("Error fetching reviews", err);
    }
  };

  const handleReviewToggle = () => {
    setShowReviews(!showReviews);
    if (!showReviews && reviews.length === 0) {
      fetchReviews();
    }
  };

  const handleAddReview = async (event) => {
    event.preventDefault();
    try {
      const tokenVal = currentToken.replace(/"/g, "");

      const response = await axios.post(
        "http://localhost:5000/api/reviews",
        {
          bookId,
          rating: newReview.rating,
          comment: newReview.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenVal}`,
          },
        }
      );
      setReviews([...reviews, response.data]);
      setNewReview({ rating: 0, comment: "" });
    } catch (error) {
      console.error("Error adding review", error);
    }
  };

  const handleReviewChange = (field, value) => {
    setNewReview((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box>
      <Button
        color="secondary"
        onClick={handleReviewToggle}
        variant="contained"
        sx={{ mb: 2 }}
      >
        {showReviews ? "Hide Reviews" : "Show Reviews"}
      </Button>
      <Collapse in={showReviews}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Reviews
          </Typography>

          <Grid2 container justifyContent="center" spacing={3} mt={3}>
            {" "}
            {reviews.map((review) => (
              <Grid2 item xs={12} sm={8} md={6} lg={4} key={review._id}>
                {" "}
                <Card sx={{ width: "100%" }}>
                  {" "}
                  <CardContent>
                    {" "}
                    <Box display="flex" alignItems="center" gap={2}>
                      {" "}
                      <Avatar>
                        {review.userId.charAt(0).toUpperCase()}
                      </Avatar>{" "}
                      <Typography variant="h6">
                        User: {review.userId}
                      </Typography>{" "}
                    </Box>{" "}
                    <Rating name="read-only" value={review.rating} readOnly />{" "}
                    <Typography variant="body2" color="textSecondary">
                      Comment: {review.comment}
                    </Typography>{" "}
                  </CardContent>{" "}
                </Card>{" "}
              </Grid2>
            ))}{" "}
          </Grid2>
        </Box>
      </Collapse>
      <Box component="form" onSubmit={handleAddReview} sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add Your Review
        </Typography>
        <Rating
          name="rating"
          sx={{
            "& .MuiRating-icon": { color: "white" },
            "& .MuiRating-iconFilled": { color: "#faaf00" },
            "& .MuiRating-iconHover": { color: "white" },
          }}
          value={newReview.rating}
          onChange={(e, newValue) => handleReviewChange("rating", newValue)}
        />
        <TextField
          label="Comment"
          variant="outlined"
          value={newReview.comment}
          onChange={(e) => handleReviewChange("comment", e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{
            mt: 2,
            "& .MuiInputLabel-root": {
              "&.Mui-focused": { borderColor: "white" },
            },
            "&. MuiOutlinedInput-input": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
            input: { color: "white" },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
        >
          Submit Review
        </Button>
      </Box>
    </Box>
  );
};

export default BookReview;
