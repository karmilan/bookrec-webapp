import React from "react";
import { Route, Routes } from "react-router";
import { BookPage } from "../pages/BookPage";
import WishList from "../pages/WishList";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <SideBar />
      <Routes>
        <Route path="/" element={<BookPage />} />
      </Routes>
      <Routes>
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </>
  );
};

export default Layout;
