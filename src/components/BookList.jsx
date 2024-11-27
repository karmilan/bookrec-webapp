import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid2,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import AuthContext from "../context/AuthContext";
import bookService from "../services/BookService";
import BookItem from "./BookItem";

const BookList = () => {
  const { token } = useContext(AuthContext);
  // const theme = useTheme;
  // const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const isMobile = useMediaQuery("(max-width:600px)");

  const currentToken = token || localStorage.getItem("token");
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async () => {
    try {
      // const tokenVal = currentToken.replace(/"/g, "");
      // const response = await axios.get("http://localhost:5000/api/books", {
      //   headers: {
      //     Authorization: `Bearer ${tokenVal}`,
      //   },
      // });
      const response = await bookService.getAllBooks(currentToken);

      setBooks(response);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // const tokenVal = currentToken.replace(/"/g, "");
      // await axios.delete(`http://localhost:5000/api/books/${id}`, {
      //   headers: {
      //     Authorization: `Bearer ${tokenVal}`,
      //   },
      // });
      await bookService.deleteBook(id, currentToken);

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: isMobile ? "center" : "space-between",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: "50%" }}
        /> */}

        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            width: isMobile ? "100%" : "50%",
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "5px",
            "& .MuiInputBase-input": { color: "#333" },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#333",
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#333",
            },
            "& .MuiInputLabel-root": { color: "#555" },
          }}
        />

        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/addbook"
          startIcon={<Add />}
          sx={{
            width: isMobile ? "100%" : "auto",
            // backgroundColor: "#0056b3",
            "&:hover": { backgroundColor: "#9c27b0ab", color: "#fff" },
          }}
        >
          Add New Book
        </Button>
      </Box>

      <Grid2 container spacing={2}>
        {filteredBooks.map((book) => (
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
