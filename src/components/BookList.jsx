import { Container, Grid2, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import BookItem from "./BookItem";

const BookList = () => {
  const { token } = useContext(AuthContext);
  const currentToken = token || localStorage.getItem("token");
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const tokenVal = currentToken.replace(/"/g, "");
      const response = await axios.get("http://localhost:5000/api/books", {
        headers: {
          Authorization: `Bearer ${tokenVal}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const tokenVal = currentToken.replace(/"/g, "");
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenVal}`,
        },
      });
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  const handleUpdate = (updatedBook) => {
    console.log("updatedBook", updatedBook);

    setBooks(
      books.map((book) => (book._id === updatedBook._id ? updatedBook : book))
    );
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ color: "#fff", marginTop: "20px" }}
      >
        Book List
      </Typography>
      <Grid2 container spacing={2}>
        {books.map((book) => (
          <Grid2 item xs={12} sm={6} md={4} key={book._id}>
            <BookItem
              book={book}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default BookList;
