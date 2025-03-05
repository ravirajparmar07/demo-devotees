import React from "react";
import Button from "@/Components/Common/Button/Button";
import FilterIcon from "@/assets/svg/Filter";
import ReusableTable from "../../Common/ReusableTable/ReusableTable";
import Pagination from "@/Components/Common/Pagination/Pagination";
import { Menu, MenuItem } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";

const RealTimeCounting = ({
  currentData,
  columns,
  filters,
  currentPage,
  itemsPerPage,
  totalData,
  handlePageChange,
  handleViewClick,
  handleClick,
  handleClose,
  anchorEl,
  setSearchTerm,
  handleFilterClick,
  handleOrderClick,
  isLoading,
  isError,
}) => {
  return (
    <>
      <div>
        <p className="text-lg">Real-Time Counting</p>
        <div className="bg-white p-5 flex flex-col lg:flex-row justify-between items-center mt-3 rounded mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search gate number or name"
              onChange={(e) => setSearchTerm(e.target.value)}
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
                    <FilterIcon />
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
        totalData={totalData}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default RealTimeCounting;
