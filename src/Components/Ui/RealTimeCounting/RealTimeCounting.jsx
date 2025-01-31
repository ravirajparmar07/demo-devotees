import React, { useState, useEffect } from "react";
import Button from "@/Components/Common/Button/Button";
import Filter from "@/assets/svg/Filter";
import ReusableTable from "../../Common/ReusableTable/ReusableTable";
import { data } from "@/utils/data";
import Pagination from "@/Components/Common/Pagination/Pagination";
import { useRouter } from "next/router";

const RealTimeCounting = () => {
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data.slice(startIndex, endIndex).map((item, index) => ({
    ...item,
    srNo: startIndex + index + 1,
  }));

  const columns = [
    { field: "srNo", label: "Sr. No" },
    { field: "gateName", label: "Gate Number/Name" },
    { field: "entryCount", label: "Entry Count" },
    { field: "exitCount", label: "Exit Count" },
    { field: "cameraId", label: "Camera ID" },
    { field: "devoteeCount", label: "Devotee Count" },
    { field: "detectionDate", label: "Detection Date" },
    { field: "action", label: "Action" },
  ];
  const router = useRouter();
  const handleViewClick = () => {
    router.push("/camescreen");
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
            <Button className="bg-option py-2.5 px-4 rounded hover:bg-[#ab2f2e] w-full sm:w-auto">
              <div className="flex gap-2 items-center justify-center">
                <span>
                  <Filter />
                </span>
                <span className="text-white">Filter</span>
              </div>
            </Button>
          </div>
        </div>

        <ReusableTable
          columns={columns}
          rows={currentData}
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
