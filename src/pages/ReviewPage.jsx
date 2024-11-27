import React from "react";
import { useLocation } from "react-router";
import BookReview from "../components/BookReview";
import ViewBook from "../components/ViewBook";

const ReviewPage = () => {
  const location = useLocation();
  const { bookID } = location.state;
  console.log("iddd>>", bookID);

  return (
    <>
      <ViewBook bookId={bookID} />
      <BookReview bookId={bookID} />
    </>
  );
};

export default ReviewPage;
