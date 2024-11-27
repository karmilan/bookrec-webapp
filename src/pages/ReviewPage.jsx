import React from "react";
import { useLocation } from "react-router";

const ReviewPage = () => {
  const location = useLocation();
  const { bookID } = location.state;
  console.log("iddd>>", bookID);

  return <>ReviewPage {bookID}</>;
};

export default ReviewPage;
