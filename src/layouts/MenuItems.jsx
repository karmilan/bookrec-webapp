import { MenuItem, Typography } from "@mui/material";
import { Link } from "react-router";

const MenuItems = ({ navMenuText, linkTo, onClick }) => {
  return (
    <>
      {onClick ? (
        <MenuItem onClick={onClick}>
          <Typography sx={{ textAlign: "center" }}>{navMenuText}</Typography>
        </MenuItem>
      ) : (
        <MenuItem>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={linkTo}
          >
            <Typography sx={{ textAlign: "center" }}>{navMenuText}</Typography>
          </Link>
        </MenuItem>
      )}
    </>
  );
};

export default MenuItems;
