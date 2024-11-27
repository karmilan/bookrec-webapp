import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import UpdateBook from "./UpdateBook";

const BookItem = ({ book, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = () => setIsFavorited(!isFavorited);

  return (
    <Card
      sx={{
        maxWidth: 247,
        mb: 2,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          sx={{ width: "247px", height: "300px", objectFit: "cover" }}
          image={`${import.meta.env.VITE_API_URL}/${book.image}`}
        />
        <IconButton
          aria-label="add to favorites"
          onClick={handleFavorite}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: isFavorited ? "error.main" : "white",
          }}
        >
          {isFavorited ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Box>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "#333" }}
        >
          {book.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <IconButton aria-label="edit" onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => onDelete(book._id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
      {isEditing && (
        <UpdateBook
          book={book}
          onClose={() => setIsEditing(false)}
          onUpdate={onUpdate}
        />
      )}
    </Card>
  );
};

export default BookItem;
