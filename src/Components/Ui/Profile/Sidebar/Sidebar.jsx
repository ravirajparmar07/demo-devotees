import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo.png";
import Dashboard from "@/assets/svg/Dashboard";
import RealtimeCounting from "@/assets/svg/RealtimeCounting";
import Camera from "@/assets/svg/Camera";
import UserAccess from "@/assets/svg/UserAccess";
import { useRouter } from "next/router";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import withAuth from "@/hoc/withAuth";

const Sidebar = ({ open }) => {
  const router = useRouter();

  const menuItems = [
    { icon: <Dashboard />, text: "Dashboard", route: "/dashboard" },
    {
      icon: <RealtimeCounting />,
      text: "Real-time Counting",
      route: "/real-time-counting",
    },
    { icon: <Camera />, text: "Camera and AI Hardware", route: "/camera" },
    {
      icon: <UserAccess />,
      text: "User Access & Permissions",
      route: "/user-roles",
    },
  ];

  const handleNavigation = (route) => {
    router.push(route);
  };

  return (
    <div
      className={`h-screen overflow-hidden bg-gray-900 py-3.5 max-md:hidden max-lg:h-full ${
        open ? "px-5 " : "px-3.5"
      }`}
    >
      <Image src={logo} alt="logo" className="block mx-auto" />
      <div className="mt-30 h-calc-full-minus-70 overflow-y-auto hide-scrollbar">
        <p className={`text-white text-xs ${open ? "block" : "hidden"}`}>
          MENU
        </p>
        <List className="mt-5 text-gray-400 flex flex-col gap-4 text-wrap ">
          {menuItems.map((item, index) => {
            const isActive = router.pathname === item.route;
            return (
              <ListItem
                className="hover:bg-red-700 hover:rounded translate-x-0"
                key={index}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  onClick={() => handleNavigation(item.route)}
                  sx={[
                    open
                      ? { justifyContent: "initial" }
                      : { justifyContent: "center" },
                    isActive
                      ? { backgroundColor: " #c92e2c", borderRadius: "4px" }
                      : {},
                  ]}
                  className={`p-3.5 flex gap-2.5 items-center group hover:rounded cursor-pointer `}
                >
                  <ListItemIcon
                    sx={[
                      { minWidth: 0, justifyContent: "center" },
                      isActive ? { color: "white" } : { color: "gray" },
                    ]}
                    className={`${
                      isActive ? "text-white" : "group-hover:text-gray-100 "
                    }`}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={[
                      open ? { opacity: 1 } : { opacity: 0, display: "none" },
                      isActive ? { color: "white" } : { color: "gray" },
                    ]}
                    className={`${
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-100"
                    }`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default withAuth(Sidebar);
