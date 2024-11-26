import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const BookForm = ({ onSave }) => {
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
      const response = await axios.post(
        "http://localhost:5000/api/books",
        data,
        {
          headers: {
            Authorization: `Bearer ${tokenVal}`,
          },
        }
      );
      onSave(response.data);
    } catch (err) {
      console.error("Error saving book", err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Genre</label>
        <input type="text" name="genre" value={genre} onChange={onChange} />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={description}
          onChange={onChange}
        ></textarea>
      </div>
      <div>
        <label>Cover Image</label>
        <input type="file" name="image" onChange={onChange} />
      </div>
      <button type="submit">Save Book</button>
    </form>
  );
};

export default BookForm;
