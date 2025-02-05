import React from "react";
import Image from "next/image";
import Hamburger from "../../../../assets/svg/Hamburger";
import Screen from "@/assets/svg/Screen";
import DrawerSidebar from "@/Components/Ui/Drawer/DrawerSidebar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@emotion/react";
import { Padding } from "@mui/icons-material";

const Header = ({
  handleProfileClick,
  handleClose,
  handleClick,
  anchorEl,
  handleDrawerOpen,
  data,
}) => {
  const theme1 = useTheme();

  return (
    <div className="flex justify-between px-5 shadow-md max-sm:px-0">
      <div className="flex justify-between items-center">
        <div className="max-md:hidden md:visible">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5 }}
          >
            <Hamburger />
          </IconButton>
        </div>

        <div className="max-md:visible md:hidden">
          <DrawerSidebar />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Screen />

        <Button
          id="basic-button"
          aria-controls={anchorEl ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl ? "true" : undefined}
          onClick={handleClick}
          className="p-0"
          disableRipple
          disableFocusRipple
        >
          <div className="bg-gray-100 flex h-full items-center gap-1 px-3.5 py-4 cursor-pointer">
            {data?.profile_picture_url ? (
              <Image
                src={data?.profile_picture_url}
                alt="Profile"
                height={36}
                width={36}
                className="rounded-full object-cover h-9 w-9"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-gray-400 text-white flex items-center justify-center">
                {data?.first_name ? data.first_name[0].toUpperCase() : "?"}
              </div>
            )}
            <div>
              <div className="text-gray-900 text-xs flex items-center gap-1.5">
                <p>{data?.first_name}</p>
                <p>{data?.last_name}</p>
              </div>
              <p className="text-xs text-gray-600 mt-2 max-sm:mt-0">
                Administrator
              </p>
            </div>
          </div>
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          disablePortal
          disableEnforceFocus
          BackdropProps={{
            invisible: true,
          }}
          sx={{
            mt: 1,
            "& .MuiPaper-root": {
              width: anchorEl ? anchorEl.getBoundingClientRect().width : "auto",
            },
          }}
        >
          <MenuItem onClick={handleProfileClick} className="px-9">
            Profile
          </MenuItem>
          <MenuItem
            id="logout-menu-item"
            onClick={handleClose}
            className="px-9"
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
