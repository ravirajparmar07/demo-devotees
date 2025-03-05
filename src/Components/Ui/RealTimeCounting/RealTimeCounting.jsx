import React, { useState, useEffect } from "react";
import Button from "@/Components/Common/Button/Button";
import Filter from "@/assets/svg/Filter";
import ReusableTable from "../../Common/ReusableTable/ReusableTable";
import { data } from "@/utils/data";
import Pagination from "@/Components/Common/Pagination/Pagination";
import { useRouter } from "next/router";
import { Menu, MenuItem } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";

const RealTimeCounting = ({ data = [], isLoading, isError, filters = [] }) => {
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);

  console.log("data", data);

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
    { field: "action", label: "Action" },
  ];
  const router = useRouter();
  const handleViewClick = () => {
    router.push("/camescreen");
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
      <div>
        <p className="text-lg">Real-Time Counting</p>
        <div className="bg-white p-5 flex flex-col lg:flex-row justify-between items-center mt-3 rounded mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search gate number or name"
              className="w-full sm:w-[300px] lg:w-[387px] py-2.5 pl-3 border border-gray-200 rounded"
            />
            <div
              id="basic-button"
              aria-controls={anchorEl ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={anchorEl ? "true" : undefined}
              onClick={handleClick}
              className="p-0"
            >
              <Button className="bg-option py-2.5 px-4 rounded hover:bg-[#ab2f2e] w-full sm:w-auto">
                <div className="flex gap-2 items-center justify-center">
                  <span>
                    <Filter />
                  </span>
                  <span className="text-white">Filter</span>
                </div>
              </Button>
            </div>
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
                  minWidth: "unset",
                  width: "auto",
                  maxWidth: "auto",
                },
              }}
            >
              {filters.map((items) => (
                <MenuItem className="px-9" key={items.label}>
                  <div
                    className="flex gap-4 items-center justify-between w-full"
                    onClick={() => handleFilterClick(items)}
                  >
                    <p>{items.label}</p>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderClick();
                      }}
                    >
                      <ImportExportIcon />
                    </div>
                  </div>
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>

        <ReusableTable
          columns={columns}
          rows={currentData}
          isLoading={isLoading}
          isError={isError}
          onViewClick={handleViewClick}
          buttonConfig={{ view: true, edit: false, delete: false }}
        />
      </div>
      <Pagination
        totalData={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default RealTimeCounting;
