import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useRouter } from "next/router";
import { useProfileDataQuery } from "@/Services/myprofile";
import useAuthToken from "@/Components/Common/CustomHooks/useAuthToken";

const index = ({ handleDrawerOpen, isSidebarOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const token = useAuthToken();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const router = useRouter();

  const { data } = useProfileDataQuery(token);

  const handleClose = (event) => {
    setAnchorEl(null);

    if (event.target.textContent === "Logout") {
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      router.push("/");
    }
  };

  const handleProfileClick = () => {
    router.push("/profile");
    setAnchorEl(null);
  };
  return (
    <Header
      handleProfileClick={handleProfileClick}
      router={router}
      handleClose={handleClose}
      handleClick={handleClick}
      open={open}
      isSidebarOpen={isSidebarOpen}
      anchorEl={anchorEl}
      handleDrawerOpen={handleDrawerOpen}
      data={data}
    />
  );
};

export default index;
