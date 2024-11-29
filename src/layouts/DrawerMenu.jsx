import {
  Assistant,
  Favorite,
  Home,
  LibraryBooks,
  LocalLibrary,
  OnlinePrediction,
  ThumbUpAlt,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router";

// menu list
const DrawerList = ({
  listColor,
  listIconColor,
  listItemText,
  listIcon,
  linkTo,
}) => {
  return (
    <>
      <List sx={{ color: listColor }}>
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={linkTo}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: listIconColor }}>
                {listIcon}
              </ListItemIcon>
              <ListItemText primary={listItemText} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </>
  );
};

const DrawerMenu = () => {
  return (
    <>
      <Box display={{ md: "none" }}>
        <DrawerList
          listColor="white"
          listIconColor="white"
          listItemText="Home"
          linkTo="/"
          listIcon={<Home />}
        />

        <DrawerList
          listColor="white"
          listIconColor="white"
          listItemText="Library"
          linkTo="/library"
          listIcon={<LibraryBooks />}
        />
      </Box>
      <DrawerList
        listColor="white"
        listIconColor="white"
        listItemText="Currently Reading"
        linkTo="/currentlyreading"
        listIcon={<LocalLibrary />}
      />

      <DrawerList
        listColor="white"
        listIconColor="white"
        listItemText="Wish List"
        linkTo="/wishlist"
        listIcon={<Favorite />}
      />

      <DrawerList
        listColor="white"
        listIconColor="white"
        listItemText="Completed"
        linkTo="/completed-books"
        listIcon={<ThumbUpAlt />}
      />

      <DrawerList
        listColor="white"
        listIconColor="white"
        listItemText="Recommendations"
        listIcon={<Assistant />}
      />

      <DrawerList
        listColor="white"
        listIconColor="white"
        listItemText="Discord"
        listIcon={<OnlinePrediction />}
      />
    </>
  );
};

export default DrawerMenu;
