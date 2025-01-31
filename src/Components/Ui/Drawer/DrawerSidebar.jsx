import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Hamburger from "@/assets/svg/Hamburger";
import logo from "@/assets/images/logo.png";
import Dashboard from "@/assets/svg/Dashboard";
import RealtimeCounting from "@/assets/svg/RealtimeCounting";
import Camera from "@/assets/svg/Camera";
import UserAccess from "@/assets/svg/UserAccess";
import Image from "next/image";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

const DrawerSidebar = () => {
  const [state, setState] = React.useState({
    left: false,
  });

  const router = useRouter();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, left: open });
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className="h-screen bg-gray-900 px-5 py-3.5 overflow-y-auto max-lg:h-full">
        <Image src={logo} alt="logo" className="block mx-auto" />

        <div className="mt-30">
          <p className="text-white text-xs">MENU</p>
          <div className="mt-5 text-gray-400">
            <ul className="flex flex-col gap-4">
              <li
                className={`p-3.5 flex gap-2.5 items-center group cursor-pointer ${
                  router.pathname === "/dashboard"
                    ? "bg-red-700 text-gray-100 rounded"
                    : "hover:bg-red-700 hover:text-gray-100 hover:rounded"
                }`}
                onClick={() => handleNavigation("/dashboard")}
              >
                <Dashboard />
                <div>Dashboard</div>
              </li>

              <li
                className={`p-3.5 flex gap-2.5 items-center group cursor-pointer ${
                  router.pathname === "/real-time-counting"
                    ? "bg-red-700 text-gray-100 rounded"
                    : "hover:bg-red-700 hover:text-gray-100 hover:rounded"
                }`}
                onClick={() => handleNavigation("/real-time-counting")}
              >
                <RealtimeCounting />
                <div>Real-time Counting</div>
              </li>
              <li
                className={`p-3.5 flex gap-2.5 items-center group cursor-pointer ${
                  router.pathname === "/camera"
                    ? "bg-red-700 text-gray-100 rounded"
                    : "hover:bg-red-700 hover:text-gray-100 hover:rounded"
                }`}
                onClick={() => handleNavigation("/camera")}
              >
                <Camera />
                <div>Camera and AI Hardware</div>
              </li>
              <li
                className={`p-3.5 flex gap-2.5 items-center group cursor-pointer ${
                  router.pathname === "/user-roles"
                    ? "bg-red-700 text-gray-100 rounded"
                    : "hover:bg-red-700 hover:text-gray-100 hover:rounded"
                }`}
                onClick={() => handleNavigation("/user-roles")}
              >
                <UserAccess />
                <div>User Access & Permissions</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        <Hamburger />
      </Button>
      <Drawer anchor="left" open={state.left} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
};

export default DrawerSidebar;
