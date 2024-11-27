import { Container, Grid2 } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import AuthContext from "../context/AuthContext";
import bookService from "../services/BookService";

const CompletedBookPage = () => {
  const { token } = useContext(AuthContext);
  const currentToken = token || localStorage.getItem("token");

  // --------------------fetch all books-----------------------
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log("token>>>>", currentToken);
        const response = await bookService.getAllBooks(currentToken);
        const completedReading = response.filter(
          (book) => book.readingStatus === "Completed"
        );
        setBooks(completedReading);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBooks();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <Container>
      <Grid2 container spacing={2}>
        {books.map((book, index) => (
          <Grid2 item xs={12} md={6} lg={4} key={index}>
            <BookCard book={book} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default CompletedBookPage;
