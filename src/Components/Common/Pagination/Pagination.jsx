import React from "react";

const Pagination = ({ totalData, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalData / itemsPerPage);

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => start + idx);
  };

  return (
    <div className="flex justify-center mt-5 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white border hover:border-red-900"
        }`}
      >
        Previous
      </button>

      {range(1, totalPages).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-md ${
            currentPage === page
              ? "bg-button text-white"
              : "bg-white border hover:border-red-900"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white border hover:border-red-900"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
