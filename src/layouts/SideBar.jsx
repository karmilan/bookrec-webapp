import { Box, Drawer } from "@mui/material";
import React from "react";
import DrawerMenu from "./DrawerMenu";

const SideBar = ({
  drawerWidth,
  container,
  mobileOpen,
  handleDrawerTransitionEnd,
  handleDrawerClose,
}) => {
  const drawer = <DrawerMenu />;

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              mt: "120px",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              //   mt: "200px",
              height: "100vh",
              color: "#fff",
              backgroundColor: "transparent",
              borderRight: "3px solid rgb(255 255 255 / 12%)",
              left: "unset",
              position: "sticky",
              pt: "30px",
              pl: "20px",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;
