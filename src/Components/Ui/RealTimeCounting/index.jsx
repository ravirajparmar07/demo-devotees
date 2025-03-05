import React, { useState } from "react";
import RealTimeCounting from "@/Components/Ui/RealTimeCounting/RealTimeCounting";
import { useRouter } from "next/router";
import { useRealTimeCountingQuery } from "@/Services/realCounting";
import { skipToken } from "@reduxjs/toolkit/query";

const Index = () => {
  const router = useRouter();
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const { data, isLoading, isError, refetch, status } =
    useRealTimeCountingQuery(
      token
        ? { token, filterData, searchTerm: searchTerm.toString() }
        : skipToken,
      { refetchOnMountOrArgChange: true }
    );

  const handleFilterClick = (filter) => {
    console.log("Filter clicked:", filter);
    setFilterData(filter);
    refetch();
  };

  const filters = [
    {
      label: "CameraId",
      value: "camera_id",
      onClick: () => handleFilterClick("camera_id"),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data.slice(startIndex, endIndex).map((item, index) => ({
    ...item,
    srNo: startIndex + index + 1,
    devoteeCount: item.entry_count - item.exit_count,
  }));

  const columns = [
    { field: "srNo", label: "Sr. No" },
    { field: "gate", label: "Gate Number/Name" },
    { field: "entry_count", label: "Entry Count" },
    { field: "exit_count", label: "Exit Count" },
    { field: "camera_id", label: "Camera ID" },
    { field: "devoteeCount", label: "Devotee Count" },
    { field: "detected_date", label: "Detection Date" },
    {
      field: "action",
      label: "Action",
      render: (row) => (
        <button
          onClick={() => handleViewClick(row)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          View
        </button>
      ),
    },
  ];

  const handleViewClick = (camera) => {
    router.push({
      pathname: "/camescreen",
      query: {
        cameraId: camera.cameraId,
        gateName: camera.gateName,
        videoUrl: "https://www.youtube.com/embed/v_YJdREi9tU?autoplay=1&mute=1",
      },
    });
  };

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
    <>
      <RealTimeCounting
        currentData={currentData}
        isLoading={isLoading}
        columns={columns}
        filters={filters}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalData={Array.isArray(data) ? data.length : 0}
        handlePageChange={handlePageChange}
        handleViewClick={handleViewClick}
        handleClick={handleClick}
        handleClose={handleClose}
        anchorEl={anchorEl}
        setSearchTerm={setSearchTerm}
        handleFilterClick={handleFilterClick}
      />
    </>
  );
};

export default Index;
