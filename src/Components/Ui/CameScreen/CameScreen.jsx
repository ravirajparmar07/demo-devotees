import React from "react";
import view from "@/assets/images/view.png";
import Image from "next/image";
import LeftArrow from "@/assets/svg/LeftArrow";
import { useRouter } from "next/router";

const CameScreen = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/real-time-counting");
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handleBackClick}
          className="hover:underline flex items-center gap-2"
        >
          <span className="text-lg">
            <LeftArrow />
          </span>
          <span className="text-sm font-normal text-gray-700">Back</span>
        </button>
        <h2 className="text-xl font-medium text-option">Silver Door</h2>
      </div>
      <div className="p-5 bg-white rounded-lg shadow-lg">
        <div className="relative border border-gray-300 rounded-lg overflow-hidden">
          <Image
            src={view}
            alt="Temple View"
            className="w-full h-auto object-cover"
          />
          <div className="absolute top-4 left-4 text-white text-sm px-3 py-1 rounded-md shadow-md">
            CAM1 | 15-11-2024 | 12:20 PM
          </div>
          <div className="absolute top-4 right-4 bg-red-600 text-white text-sm px-3 py-1 rounded-md shadow-md">
            Gate 1
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameScreen;
