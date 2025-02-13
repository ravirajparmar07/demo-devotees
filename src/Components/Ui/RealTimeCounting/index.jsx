import React from "react";
import RealTimeCounting from "@/Components/Ui/RealTimeCounting/RealTimeCounting";

const index = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);

    if (event.target.textContent === "Logout") {
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      router.push("/");
    }
  };
  return (
    <RealTimeCounting
      handleClick={handleClick}
      handleClose={handleClose}
      anchorEl={anchorEl}
    />
  );
};

export default index;
