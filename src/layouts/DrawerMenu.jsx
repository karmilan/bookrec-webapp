import {
  Assistant,
  Favorite,
  LocalLibrary,
  ThumbUpAlt,
} from "@mui/icons-material";
import {
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
        listIcon={<ThumbUpAlt />}
      />

      <DrawerList
        listColor="white"
        listIconColor="white"
        listItemText="Recommendations"
        listIcon={<Assistant />}
      />
    </>
  );
};

export default DrawerMenu;
