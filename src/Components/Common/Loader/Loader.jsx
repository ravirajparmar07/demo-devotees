import React from "react";

export default function Loader({ isLoading, text = "Loading..." }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-lg font-medium">{text}</p>
      </div>
    </div>
  );
}
