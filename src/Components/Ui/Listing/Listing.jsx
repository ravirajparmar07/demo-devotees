import React, { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import crowd from "@/assets/images/crowd.png";
import totalin from "@/assets/images/totalin.png";
import totalout from "@/assets/images/totalout.png";
import Live from "@/assets/svg/Live";
import CustomBarChart from "./CustomBarChart";
import LeftArrow from "@/assets/svg/LeftArrow";
import UpperArrow from "@/assets/svg/UpperArrow";
import { useRouter } from "next/router";
import {
  useGetCrowdStateQuery,
  useGetTempleDataQuery,
} from "@/Services/dashboard";
import Pagination from "@/Components/Common/Pagination/Pagination";
import Loader from "@/Components/Common/Loader/Loader";

const Listing = ({ data }) => {
  const router1 = useRouter();
  const router = useRouter();
  const { id } = router1.query;

  const [filter, setFilter] = useState(moment().format("YYYY"));

  const { data: templename } = useGetTempleDataQuery();
  const {
    data: totalCount,
    isLoading,
    refetch,
  } = useGetCrowdStateQuery({
    id,
    query: `filter=${filter}`,
  });
  useEffect(() => {
    refetch();
  }, [filter]);

  const selectedTemple = templename?.find(
    (temple) => temple.id === parseInt(id)
  );
  const templeName = selectedTemple?.name || "Unknown Temple";
  if (isLoading) {
    return <Loader isLoading={true} text="Loading listing data..." />;
  }
  const handleBack = (path) => {
    router.push(path);
  };

  const CameraView = [
    {
      id: 1,
      name: "cam1",
      location: "gate 1",
      url: "https://www.youtube.com/embed/mKCieTImjvU?autoplay=1&mute=1",
    },
    {
      id: 2,
      name: "cam1",
      location: "gate 1",
      url: "https://www.youtube.com/embed/v_YJdREi9tU?autoplay=1&mute=1",
    },
    {
      id: 3,
      name: "cam1",
      location: "gate 1",
      url: "https://www.youtube.com/embed/AOpUvJzebWA?autoplay=1&mute=1",
    },
    {
      id: 4,
      name: "cam1",
      location: "gate1",
      url: "https://www.youtube.com/embed/TZikBxNaaQk?autoplay=1&mute=1",
    },
    {
      id: 5,
      name: "cam1",
      location: "gate1",
      url: "https://www.youtube.com/embed/HhFw2q9921Y?autoplay=1&mute=1",
    },
    {
      id: 6,
      name: "cam1",
      location: "gate1",
      url: "https://www.youtube.com/embed/VN8lnHlHqxM?autoplay=1&mute=1",
    },
    {
      id: 7,
      name: "cam1",
      location: "gate1",
      url: "https://www.youtube.com/embed/r-TPJDQSqv0?autoplay=1&mute=1",
    },
    {
      id: 8,
      name: "cam1",
      location: "gate1",
      url: "https://www.youtube.com/embed/wKg71lcs5Nw?autoplay=1&mute=1",
    },
    {
      id: 9,
      name: "cam1",
      location: "gate1",
      url: "https://www.youtube.com/embed/u73rp5y9Iyk?autoplay=1&mute=1",
    },
    {
      id: 10,
      name: "cam1",
      location: "gate1",
      url: "https://www.youtube.com/embed/TZikBxNaaQk?autoplay=1&mute=1",
    },
    {
      id: 11,
      name: "cam1",
      location: "gate1",
      url: "https://www.youtube.com/embed/4Q9jq-tdOoE?autoplay=1&mute=1",
    },
    {
      id: 12,
      name: "cam1",
      location: "gate1",
      url: "https://www.youtube.com/embed/VN8lnHlHqxM?autoplay=1&mute=1",
    },
  ];

  return (
    <div className="flex gap-6 flex-col">
      <div className="flex items-center gap-[18px] cursor-pointer">
        <div
          className="flex gap-[18px] items-center"
          onClick={() => handleBack("/dashboard")}
        >
          <LeftArrow />
          <p className="text-Dashblack2 text-lg font-normal">Back</p>
        </div>
        <span className="text-option text-xl font-medium">{templeName}</span>
      </div>
      <div className="grid grid-cols-12 gap-6 ">
        <div className="col-span-6 max-xl:col-span-12 ">
          <div className="flex flex-col  max-xl:flex-col gap-4">
            <div className="rounded-4 bg-white shadow-bs">
              <div className="flex items-center gap-3 px-6 py-[12px] border-b">
                <Live />
                <p className="text-lg font-normal">Live</p>
              </div>
              <div className="grid grid-cols-3 max-xs:grid-cols-1 ">
                <div className="flex flex-col max-xs:flex-row-reverse max-sm:justify-between text-center max-xs:gap-8 gap-3 max-xl:gap-4 max-lg:gap-0 max-xl:p-5  px-5 py-3 max-sm:items-center max-sm:border">
                  <div className="h-12 w-12 bg-count rounded-md flex justify-center items-center">
                    <Image src={crowd} alt="crowd" />
                  </div>
                  <div className="flex flex-col text-left gap-3 max-xl:gap-4  max-lg:gap-0">
                    <p className="text-13 h-11 p-1 flex items-center max-sm:text-center max-xl:text-xs max-lg:text-10 text-Dashblack font-normal">
                      TOTAL CROWD DETECTED
                    </p>
                    <span className="text-28 max-xl:text-26 max-lg:text-22 max-md:text-22 max-sm:text-center max-xs:pl-2 max-xs:text-left text-Dashblack2 font-semibold max-lg:font-medium">
                      620
                    </span>
                  </div>
                </div>
                <div className="flex flex-col max-xs:flex-row-reverse max-sm:justify-between text-center max-xs:gap-8  gap-3 max-xl:gap-4 max-lg:gap-0 max-xl:p-5 px-5 py-3 max-sm:items-center max-sm:border border-x">
                  <div className="h-12 w-12 bg-count rounded-md flex justify-center items-center">
                    <Image src={totalin} alt="crowd" />
                  </div>
                  <div className="flex flex-col text-left gap-3 max-xl:gap-4  max-lg:gap-0">
                    <p className="text-13 h-11 p-1 flex items-center max-sm:text-center max-xl:text-xs max-lg:text-10 text-Dashblack font-normal">
                      TOTAL IN
                    </p>
                    <span className="text-28 max-xl:text-26 max-lg:text-22 max-md:text-22 max-sm:text-center text-Dashblack2 font-semibold max-lg:font-medium">
                      {totalCount?.total_in_count ?? 7}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col max-xs:flex-row-reverse max-sm:justify-between text-center max-xs:gap-8  gap-3 max-xl:gap-4 max-lg:gap-0 max-xl:p-5 px-5 py-3 max-sm:items-center max-sm:border">
                  <div className="h-12 w-12 bg-count rounded-md flex justify-center items-center">
                    <Image src={totalout} alt="crowd" />
                  </div>
                  <div className="flex flex-col text-left gap-3 max-xl:gap-4  max-lg:gap-0">
                    <p className="text-13 h-11 p-1 flex items-center max-sm:text-center max-xl:text-xs max-lg:text-10 text-Dashblack font-normal">
                      TOTAL OUT
                    </p>
                    <span className="text-28 max-xl:text-26 max-lg:text-22 max-md:text-22 max-sm:text-center text-Dashblack2 font-semibold max-lg:font-medium">
                      {totalCount?.total_out_count ?? 7}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-4 bg-white shadow-bs">
              <div className="flex items-center gap-3 px-6 py-[12px] border-b">
                <button
                  className={`text-lg font-normal ${
                    filter === moment().format("GGGG-WW")
                      ? "text-option bg-count py-1 px-2 rounded"
                      : ""
                  }`}
                  onClick={() => setFilter(moment().format("GGGG-WW"))}
                >
                  Week
                </button>
                <button
                  className={`text-lg font-normal ${
                    filter === moment().format("YYYY-MM")
                      ? "text-option bg-count py-1 px-2 rounded"
                      : ""
                  }`}
                  onClick={() => setFilter(moment().format("YYYY-MM"))}
                >
                  Month
                </button>
                <button
                  className={`text-lg font-normal ${
                    filter === moment().format("YYYY")
                      ? "text-option bg-count py-1 px-2 rounded"
                      : ""
                  }`}
                  onClick={() => setFilter(moment().format("YYYY"))}
                >
                  Year
                </button>
              </div>
              <div className="grid grid-cols-3 max-xs:grid-cols-1">
                <div className="flex flex-col max-xs:flex-row-reverse max-sm:justify-between text-center max-xs:gap-8  gap-3 max-xl:gap-4 max-lg:gap-0 max-xl:p-5 px-5 py-3 max-sm:items-center max-sm:border">
                  <div className="h-12 w-12 bg-count rounded-md flex justify-center items-center">
                    <Image src={crowd} alt="crowd" />
                  </div>
                  <div className="text-left max-sm:text-center">
                    <p className="text-13 h-11 p-1 flex items-center max-sm:text-center max-xl:text-xs max-lg:text-10 text-Dashblack font-normal">
                      TOTAL CROWD DETECTED
                    </p>
                    <span className="text-28 max-xl:text-26 max-lg:text-22 max-md:text-22 max-lg:font-medium font-semibold text-Dashblack2">
                      200
                    </span>
                  </div>
                  <div className="flex items-center max-sm:flex-col gap-1">
                    <div className="flex items-center bg-count px-2 py-1 rounded-4 gap-1">
                      <UpperArrow />
                      <p className="text-11 max-2xl:text-8 text-Orange">
                        16.24%
                      </p>
                    </div>
                    <p className="text-sm text-lightblack max-2xl:text-8 max-xs:leading-3">
                      vs. previous month
                    </p>
                  </div>
                </div>
                <div className="flex flex-col max-xs:flex-row-reverse max-sm:justify-between text-center max-xs:gap-8  gap-3 max-xl:gap-4 max-lg:gap-0 max-xl:p-5 px-5 py-3 max-sm:items-center max-sm:border border-x">
                  <div className="h-12 w-12 bg-count rounded-md flex justify-center items-center">
                    <Image src={totalin} alt="crowd" />
                  </div>
                  <div className="text-left max-sm:text-center">
                    <p className="text-13 h-11 p-1 flex items-center max-sm:text-center max-xl:text-xs max-lg:text-10 text-Dashblack font-normal">
                      TOTAL IN
                    </p>
                    <span className="text-28 max-xl:text-26 max-lg:text-22 max-md:text-22 max-lg:font-medium font-semibold text-Dashblack2">
                      {totalCount?.total_in_count ?? "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center max-sm:flex-col gap-1">
                    <div className="flex items-center bg-count px-2 py-1 rounded-4 gap-1">
                      <UpperArrow />
                      <p className="text-11 max-2xl:text-8 text-Orange">
                        16.24%
                      </p>
                    </div>
                    <p className="text-sm text-lightblack max-2xl:text-8 max-xs:leading-3">
                      vs. previous month
                    </p>
                  </div>
                </div>
                <div className="flex flex-col max-xs:flex-row-reverse max-sm:justify-between text-center max-xs:gap-8  gap-3 max-xl:gap-4 max-lg:gap-0 max-xl:p-5 px-5 py-3 max-sm:items-center max-sm:border">
                  <div className="h-12 w-12 bg-count rounded-md flex justify-center items-center">
                    <Image src={totalout} alt="crowd" />
                  </div>
                  <div className="text-left max-sm:text-center">
                    <p className="text-13 h-11 p-1 flex items-center max-sm:text-center max-xl:text-xs max-lg:text-10 text-Dashblack font-normal">
                      TOTAL OUT
                    </p>
                    <span className="text-28 max-xl:text-26 max-lg:text-22 max-md:text-22 max-lg:font-medium font-semibold text-Dashblack2">
                      {totalCount?.total_out_count ?? "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center max-sm:flex-col gap-1">
                    <div className="flex items-center bg-count px-2 py-1 rounded-4 gap-1">
                      <UpperArrow />
                      <p className="text-11 max-2xl:text-8 text-Orange">
                        16.24%
                      </p>
                    </div>
                    <p className="text-sm text-lightblack max-2xl:text-8 max-xs:leading-3">
                      vs. previous month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 max-xl:col-span-12 border-0 max-xl:h-[490px] rounded-4 bg-white shadow-bs ">
          <CustomBarChart />
        </div>
      </div>
      <div className="border-0 rounded-4 bg-white shadow-bs text-center">
        <div className="py-5 px-6 border-b text-left">
          <p>Camera View</p>
        </div>
        {/* In use 
          <Pagination
            totalData={data.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div> */}
        {/* In use */}
        <div className="grid grid-cols-12 gap-5 max-sm:gap-3 p-4">
          {CameraView.map((view, index) => (
            <div
              key={index}
              className="grid col-span-3 max-lg:col-span-4 max-sm:col-span-12"
            >
              <div className="relative">
                <div>
                  <embed
                    src={view.url}
                    width="100%"
                    height="241"
                    title={`Camera ${view.id}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
                <div className="absolute top-3 text-white flex justify-between left-6 right-5">
                  <p className="text-sm">{view.name}</p>
                  <span className="bg-red-700 py-1 px-2 rounded-4 text-xs">
                    {view.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listing;
