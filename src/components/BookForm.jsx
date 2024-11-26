import {
  Box,
  Button,
  Container,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(5),
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.shape.borderRadius,
}));

const BookForm = () => {
  const { token } = useContext(AuthContext);
  const currentToken = token || localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    image: null,
  });

  const { title, author, genre, description } = formData;

  const onChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("author", author);
    data.append("genre", genre);
    data.append("description", description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const tokenVal = currentToken.replace(/"/g, "");
      await axios.post("http://localhost:5000/api/books", data, {
        headers: {
          Authorization: `Bearer ${tokenVal}`,
        },
      });
      setFormData({
        title: "",
        author: "",
        genre: "",
        description: "",
        image: null,
      });
    } catch (err) {
      console.error("Error saving book", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ color: "#fff", marginTop: "20px" }}
      >
        Add a New Book
      </Typography>
      <FormPaper>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Title"
            variant="outlined"
            name="title"
            value={title}
            onChange={onChange}
            required
            fullWidth
          />
          <TextField
            label="Author"
            variant="outlined"
            name="author"
            value={author}
            onChange={onChange}
            required
            fullWidth
          />
          <TextField
            label="Genre"
            variant="outlined"
            name="genre"
            value={genre}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            value={description}
            onChange={onChange}
            multiline
            rows={4}
            fullWidth
          />
          <InputLabel htmlFor="upload-image">Cover Image</InputLabel>
          <TextField
            id="upload-image"
            type="file"
            name="image"
            onChange={onChange}
            fullWidth
            sx={{ border: "none" }}
          />
          <Button variant="contained" color="secondary" type="submit" fullWidth>
            Save Book
          </Button>
        </Box>
      </FormPaper>
    </Container>
  );
};

export default BookForm;
