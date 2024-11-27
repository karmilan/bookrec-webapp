import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import bookService from "../services/BookService";

const ViewBook = ({ bookId }) => {
  const { token } = useContext(AuthContext);
  const currentToken = token || localStorage.getItem("token");

  const [book, setBook] = useState(null);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        // const response = await axios.get(`/books/${bookId}`);
        const response = await bookService.getBookById(bookId, currentToken);
        setBook(response);
        console.log("res<><><>", response);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    fetchBook();
  }, [bookId]);
  const toggleFavourite = () => {
    setBook((prevBook) => ({
      ...prevBook,
      isFavourite: !prevBook.isFavourite,
    }));
  };
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          mb: 3,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "15px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        {" "}
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", sm: "40%" },
            height: "auto",
            maxHeight: 300,
          }}
          image={`${import.meta.env.VITE_API_URL}/${book.image}`}
          alt={book.title}
        />{" "}
        <CardContent
          sx={{
            width: { xs: "100%", sm: "60%" },
            textAlign: { xs: "center", sm: "left" },
            padding: "20px",
          }}
        >
          {" "}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {" "}
            <Typography variant="h5" component="div" gutterBottom>
              {" "}
              {book.title}{" "}
            </Typography>{" "}
            {/* <IconButton
              onClick={toggleFavourite}
              color={isFavourite ? "error" : "default"}
            >
              {" "}
              {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}{" "}
            </IconButton>{" "} */}
          </Box>{" "}
          <Typography variant="subtitle1" color="textSecondary">
            {" "}
            Author: {book.author}{" "}
          </Typography>{" "}
          <Typography variant="subtitle2" color="textSecondary" mb={2}>
            {" "}
            Genre: {book.genre}{" "}
          </Typography>{" "}
          <Typography variant="body1" mt={2} mb={2}>
            {" "}
            {book.description}{" "}
          </Typography>{" "}
          <Typography variant="body2" color="textSecondary" mb={2}>
            {" "}
            Reading Status: {book.readingStatus}{" "}
          </Typography>{" "}
          {/* <Button variant="contained" color="primary" onClick={toggleFavourite}>
            {" "}
            {isFavourite ? "Remove from Favourites" : "Add to Favourites"}{" "}
          </Button>{" "} */}
        </CardContent>{" "}
      </Card>
    </>
  );
};

export default ViewBook;
