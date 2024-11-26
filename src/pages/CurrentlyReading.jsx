import { Container, Grid2 } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import AuthContext from "../context/AuthContext";
import bookService from "../services/BookService";

const books2 = [
  {
    title: "Book Title 1",
    author: "Author 1",
    review: "This is a great book about...",
    image: "https://books.lk/wp-content/uploads/2024/09/books-3.jpg",
    rating: 2,
  },
  {
    title: "Book Title 1",
    author: "Author 1",
    review: "This is a great book about...",
    image: "https://books.lk/wp-content/uploads/2024/09/books-3.jpg",
    rating: 2,
  },
  {
    title: "Book Title 1",
    author: "Author 1",
    review: "This is a great book about...",
    image: "https://books.lk/wp-content/uploads/2024/09/books-3.jpg",
    rating: 2,
  },
  {
    title: "Book Title 1",
    author: "Author 1",
    review: "This is a great book about...",
    image: "https://books.lk/wp-content/uploads/2024/09/books-3.jpg",
    rating: 2,
  },
  {
    title: "Book Title 1",
    author: "Author 1",
    review: "This is a great book about...",
    image: "https://books.lk/wp-content/uploads/2024/09/books-3.jpg",
    rating: 2,
  },
  {
    title: "Book Title 1",
    author: "Author 1",
    review: "This is a great book about...",
    image: "https://books.lk/wp-content/uploads/2024/09/books-3.jpg",
    rating: 2,
  },
  {
    title: "Book Title 1",
    author: "Author 1",
    review: "This is a great book about...",
    image: "https://books.lk/wp-content/uploads/2024/09/books-3.jpg",
    rating: 2,
  },
  {
    title: "Book Title 1",
    author: "Author 1",
    review: "This is a great book about...",
    image: "https://books.lk/wp-content/uploads/2024/09/books-3.jpg",
    rating: 2,
  },
  {
    title: "Book Title 1",
    author: "Author 1",
    review: "This is a great book about...",
    image: "https://books.lk/wp-content/uploads/2024/09/books-3.jpg",
    rating: 2,
  },
  {
    title: "Book Title 1",
    author: "Author 1",
    review: "This is a great book about...",
    image: "https://books.lk/wp-content/uploads/2024/09/books-3.jpg",
    rating: 2,
  },
  {
    title: "Book Title 1",
    author: "Author 1",
    review: "This is a great book about...",
    image: "https://books.lk/wp-content/uploads/2024/09/books-3.jpg",
    rating: 2,
  },
  {
    title: "Book Title 1",
    author: "Author 1",
    review: "This is a great book about...",
    image: "https://books.lk/wp-content/uploads/2024/09/books-3.jpg",
    rating: 2,
  },
  {
    title: "Book Title 1",
    author: "Author 1",
    review: "This is a great book about...",
    image: "https://books.lk/wp-content/uploads/2024/09/books-3.jpg",
    rating: 2,
  },
  {
    title: "Book Title 1",
    author: "Author 1",
    review: "This is a great book about...",
    image: "https://books.lk/wp-content/uploads/2024/09/books-3.jpg",
    rating: 2,
  },
  {
    title: "Book Title 1",
    author: "Author 1",
    review: "This is a great book about...",
    image: "https://books.lk/wp-content/uploads/2024/09/books-3.jpg",
    rating: 2,
  },
];

const CurrentlyReading = () => {
  //   const { user } = useContext(AuthConte);
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
        const currentlyReading = response.filter(
          (book) => book.readingStatus === "Currently Reading"
        );

        console.log(">>>>", response);
        console.log("currentlyReading", currentlyReading);
        setBooks(currentlyReading);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBooks();
  }, []);
  console.log("book>>>>", books);

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

export default CurrentlyReading;
