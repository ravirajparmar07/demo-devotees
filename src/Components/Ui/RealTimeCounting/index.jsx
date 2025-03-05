import React from "react";
import RealTimeCounting from "@/Components/Ui/RealTimeCounting/RealTimeCounting";
import { useRealTimeCountingQuery } from "@/Services/realCounting";

const index = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { data, isLoading, isError } = useRealTimeCountingQuery();

  if (isError) {
    return (
      <div className="text-center text-red-500">Error loading data...</div>
    );
  }

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
      data={data}
      isLoading={isLoading}
      isError={isError}
      handleClick={handleClick}
      handleClose={handleClose}
      anchorEl={anchorEl}
    />
  );
};

export default index;
