import Box from "@mui/material/Box";
import * as React from "react";
import { Route, Routes } from "react-router";
import BookForm from "../components/BookForm";
import { BookPage } from "../pages/BookPage";
import CompletedBookPage from "../pages/CompletedBookPage";
import CurrentlyReading from "../pages/CurrentlyReading";
import LibraryPage from "../pages/LibraryPage";
import ReviewPage from "../pages/ReviewPage";
import WishList from "../pages/WishList";
import Navbar from "./NavBar";
import SideBar from "./SideBar";

const drawerWidth = 240;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: { xs: "contents", sm: "flex" } }}>
        <SideBar
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          handleDrawerTransitionEnd={handleDrawerTransitionEnd}
          handleDrawerClose={handleDrawerClose}
        />

        <Box
          sx={{
            ml: "auto",
            p: "50px",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Routes>
            <Route path="/" element={<BookPage />} />
          </Routes>
          <Routes>
            <Route path="/wishlist" element={<WishList />} />
          </Routes>
          <Routes>
            <Route path="/currentlyreading" element={<CurrentlyReading />} />
          </Routes>
          <Routes>
            <Route path="/library" element={<LibraryPage />} />
          </Routes>
          <Routes>
            <Route path="/addbook" element={<BookForm />} />
          </Routes>
          <Routes>
            <Route path="/reviews" element={<ReviewPage />} />
          </Routes>
          <Routes>
            <Route path="/completed-books" element={<CompletedBookPage />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
