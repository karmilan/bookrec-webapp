import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const UpdateBook = ({ book, onClose, onUpdate }) => {
  const { token } = useContext(AuthContext);
  const currentToken = token || localStorage.getItem("token");
  const [formData, setFormData] = useState({ ...book });
  console.log("BKId", book._id);

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
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("genre", formData.genre);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const tokenVal = currentToken.replace(/"/g, "");
      const response = await axios.put(
        `http://localhost:5000/api/books/${book._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${tokenVal}`,
          },
        }
      );
      console.log("data", formData);
      console.log("onUpdate", response.data);

      onUpdate(response.data);
      onClose();
    } catch (err) {
      console.error("Error updating book", err);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Update Book</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Title"
            variant="outlined"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
            fullWidth
          />
          <TextField
            label="Author"
            variant="outlined"
            name="author"
            value={formData.author}
            onChange={onChange}
            required
            fullWidth
          />
          <TextField
            label="Genre"
            variant="outlined"
            name="genre"
            value={formData.genre}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            value={formData.description}
            onChange={onChange}
            multiline
            rows={4}
            fullWidth
          />
          <input
            id="upload-image"
            type="file"
            name="image"
            onChange={onChange}
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit">
            Update Book
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateBook;
