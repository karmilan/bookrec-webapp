import React, { useState } from "react";
import BooksList from "../components/BookList";

const LibraryPage = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleEdit = (book) => {
    setSelectedBook(book);
  };
  return (
    <>
      <BooksList />
    </>
  );
};

export default LibraryPage;
