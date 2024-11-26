import React, { useState } from "react";
import BookForm from "../components/BookForm";
import BooksList from "../components/BookList";

const LibraryPage = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleEdit = (book) => {
    setSelectedBook(book);
  };
  return (
    <>
      {/* <AddBook /> */}
      <BookForm />
      <BooksList />
    </>
  );
};

export default LibraryPage;
