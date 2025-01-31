import React, { useState } from "react";
import Profile from "@/Components/Common/Profile/Profile";
import BasicDetail from "./BasicDetail/index";
import ChangePassword from "./ChangePassword/index";

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <>
      <p className="text-lg">Edit Profile</p>
      <div className="rounded flex bg-white mt-2.5 max-sm:flex-col max-md:flex-row max-lg:flex-col">
        <div className="rounded max-sm:w-auto max-md:w-2/4 max-lg:w-auto max-xl:w-2/4 max-2xl:w-1/3">
          <Profile />
        </div>
        <div className="border-l border-gray-100 w-[78%] max-lg:w-full">
          <div className="border-b border-gray-100">
            <ul className="flex px-1.5 gap-1.5 max-sm:justify-center max-md:justify-start max-lg:justify-center">
              <li
                className={`pt-7 pb-2.5 px-30 cursor-pointer ${
                  activeTab === "basic"
                    ? "border-b border-option text-option"
                    : "border-b border-transparent "
                } `}
                onClick={() => setActiveTab("basic")}
              >
                Basic Details
              </li>
              <li
                className={`pt-7 pb-2.5 px-30 cursor-pointer ${
                  activeTab === "password"
                    ? "border-b border-option text-option"
                    : "border-b border-transparent "
                } `}
                onClick={() => setActiveTab("password")}
              >
                Change Password
              </li>
            </ul>
          </div>
          {activeTab === "basic" && <BasicDetail />}
          {activeTab === "password" && <ChangePassword />}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
