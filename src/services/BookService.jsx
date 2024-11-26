import api from "./Api";

const bookService = {
  getAllBooks: async (token) => {
    const tokenVal = token.replace(/"/g, "");
    const response = await api.get("/books", {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    console.log("response>>", response);

    return response.data;
  },

  getBookById: async (id) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  addBook: async (bookData, token) => {
    console.log(bookData);
    console.log(token);

    const tokenVal = token.replace(/"/g, "");
    const response = await api.post("/books", bookData, {
      headers: {
        Authorization: `Bearer ${tokenVal}`,
      },
    });
    console.log("response>>", response);
    return response.data;
  },

  updateBook: async (id, bookData) => {
    const response = await api.put(`/updatebook/${id}`, bookData);
    console.log("response>>>", response);
    return response.data;
  },

  deleteBook: async (id) => {
    const response = await api.delete(`/deletebook/${id}`);
    return response.data;
  },
};

export default bookService;
