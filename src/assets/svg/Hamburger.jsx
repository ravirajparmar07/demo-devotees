import React from "react";

const Hamburger = ({ onClick }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className="cursor-pointer"
    >
      <path
        d="M4 5H14M4 12H20M4 19H20"
        stroke="#3B3B3B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Hamburger;
