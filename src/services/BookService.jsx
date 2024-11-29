import api from "./Api";

const bookService = {
  getAllBooks: async (token) => {
    const tokenVal = token.replace(/"/g, "");
    console.log("token", token);

    const response = await api.get("/books", {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    console.log("response>>", response);

    return response.data;
  },

  getBookById: async (id, token) => {
    const tokenVal = token.replace(/"/g, "");
    const response = await api.get(`/books/${id}`, {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    return response.data;
  },

  addBook: async (bookData, token) => {
    console.log(bookData);

    const tokenVal = token.replace(/"/g, "");
    console.log("tokenVal", tokenVal);

    const response = await api.post("/books", bookData, {
      headers: {
        Authorization: `Bearer ${tokenVal}`,
      },
    });
    console.log("response>>", response);
    return response;
    // return response.data;
  },

  updateBook: async (id, bookData, token) => {
    const tokenVal = token.replace(/"/g, "");
    const response = await api.put(`/books/${id}`, bookData, {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    console.log("response>>>", response);
    return response.data;
  },

  deleteBook: async (id, token) => {
    const tokenVal = token.replace(/"/g, "");
    const response = await api.delete(`/books/${id}`, {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    return response.data;
  },
};

export default bookService;
