import React from "react";

const Popup = ({ title, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white !w-580 py-30 px-6 rounded shadow-lg relative max-sm:mx-5 max-md:ml-0 max-xl:ml-250">
        {title && (
          <h2 className="text-lg font-semibold pb-5 mb-4 border-b border-borderGray">
            {title}
          </h2>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Popup;
