import React from "react";
import Button from "@/Components/Common/Button/Button";
import Arrow from "@/assets/svg/Arrow";
import { useRouter } from "next/router.js";
import Skeleton from "@mui/material/Skeleton";
import { Avatar } from "@mui/material";

const TempleCard = ({ image, name, crowdData, id, loading }) => {
  const router = useRouter();

  const handleEditClick = (id) => {
    router.push(`/dashboard/${id}`);
  };

  if (loading) {
    return (
      <div className="relative col-span-6 max-sm:col-span-12 border-0 rounded-4 shadow-bs bg-white p-4">
        <Skeleton variant="rectangular" height={200} className="mb-4" />
        <div className="absolute top-5 text-white flex justify-between right-8">
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            width={120}
            height={60}
          />
        </div>
        <div className="grid grid-cols-3 text-center mt-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col">
              <Skeleton variant="text" width="80%" className="mb-2" />
              <Skeleton variant="text" width="50%" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative col-span-6 max-sm:col-span-12 border-0 rounded-4 shadow-bs bg-white">
      <div className="w-full h-[218px] flex items-center justify-center bg-[#bdbdbd] font-semibold text-5xl rounded">
        {image ? (
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`}
            alt={name}
            className="w-full h-[218px] max-lg:object-cover rounded-r rounded-l"
          />
        ) : (
          <Avatar>{name?.charAt(0).toUpperCase() || "?"}</Avatar>
        )}
      </div>
      <div className="absolute top-3 text-white flex justify-between left-6 right-5">
        <p className="text-21 font-bold max-xl:text-lg max-lg:text-base text-black">
          {name}
        </p>
        <div
          className="bg-white p-[10px] max-lg:p-[6px] flex gap-[10px] max-lg:gap-[6px] rounded-4 justify-center items-center"
          onClick={() => handleEditClick(id)}
        >
          <Button
            type="submit"
            className="text-option text-sm font-normal max-lg:text-xs"
          >
            View more
          </Button>
          <Arrow />
        </div>
      </div>
      <div className="grid grid-cols-3 text-center">
        <div
          className={`flex flex-col gap-5 max-xl:gap-4 max-lg:gap-0 py-9 max-xl:py-7 max-lg:py-5`}
        >
          <p className="text-13 max-xl:text-xs max-lg:text-[10px] text-Dashblack font-normal">
            TOTAL CROWD
          </p>
          <span className="text-3xl max-xl:text-26 max-lg:text-22 max-md:text-22 text-Dashblack2 font-semibold max-lg:font-medium">
            {crowdData?.total_crowd || 0}
          </span>
        </div>
        <div
          className={`flex flex-col gap-5 max-xl:gap-4 max-lg:gap-0 py-9 max-xl:py-7 max-lg:py-5 border-x`}
        >
          <p className="text-13 max-xl:text-xs max-lg:text-[10px] text-Dashblack font-normal">
            TOTAL IN
          </p>
          <span className="text-3xl max-xl:text-26 max-lg:text-22 max-md:text-22 text-Dashblack2 font-semibold max-lg:font-medium">
            {crowdData?.total_in_count || 0}
          </span>
        </div>
        <div
          className={`flex flex-col gap-5 max-xl:gap-4 max-lg:gap-0 py-9 max-xl:py-7 max-lg:py-5`}
        >
          <p className="text-13 max-xl:text-xs max-lg:text-[10px] text-Dashblack font-normal">
            TOTAL OUT
          </p>
          <span className="text-3xl max-xl:text-26 max-lg:text-22 max-md:text-22 text-Dashblack2 font-semibold max-lg:font-medium">
            {crowdData?.total_out_count || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TempleCard;
