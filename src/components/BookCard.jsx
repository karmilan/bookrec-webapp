import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const BookCard = ({ book }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [rating, setRating] = useState(book.rating || 0);

  const handleFavorite = () => setIsFavorited(!isFavorited);
  const handleRatingChange = (event, newValue) => setRating(newValue);

  return (
    <Card
      sx={{
        mb: 2,
        position: "relative",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: "247px", height: "300px", objectFit: "cover" }}
        height="140"
        image={`http://localhost:5000/${book.image}`}
      />
      <IconButton
        onClick={handleFavorite}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#808080ad",
          m: 2,
          bgcolor: "#fff",
        }}
      >
        {" "}
        {isFavorited ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon />
        )}{" "}
      </IconButton>
      <CardContent>
        <Typography gutterBottom component="div">
          {book.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.review}
        </Typography>
        <Rating
          name="book-rating"
          value={rating}
          onChange={handleRatingChange}
          readOnly={true}
        />
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          pb: 2,
        }}
      >
        {/* <IconButton aria-label="add to favorites" onClick={handleFavorite}>
          {isFavorited ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton> */}
      </Box>
    </Card>
  );
};

export default BookCard;
