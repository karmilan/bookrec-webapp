import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import bookService from "../services/BookService";

const AddBook = () => {
  const { token } = useContext(AuthContext);
  const currentToken = token || localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newBook = { title, author, image, description, genre };

    try {
      await bookService.addBook(newBook, currentToken);
      setTitle("");
      setAuthor("");
      setImage("");
      setDescription("");
      setGenre("");
    } catch (error) {
      console.error("There was an error adding the book!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Add a New Book
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Author"
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <TextField
          label="Image URL"
          variant="outlined"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          //   required
        />
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          label="Genre"
          variant="outlined"
          multiline
          rows={4}
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Book"}
        </Button>
      </Box>
    </Container>
  );
};

export default AddBook;
