import React from "react";
import Profile from "@/Components/Common/Profile/Profile";
import Edit from "@/assets/svg/Edit";
import Button from "@/Components/Common/Button/Button";
import Loader from "@/Components/Common/Loader/Loader";

const MyProfile = ({ handleEditClick, data, isLoading }) => {
  if (isLoading) {
    return <Loader isLoading={true} text="Loading profile data..." />;
  }

  if (!data) {
    return;
  }

  return (
    <>
      <p className="text-lg">User Profile</p>
      <div className="rounded flex bg-white mt-2.5 max-sm:flex-col max-md:flex-row max-lg:flex-col">
        <div className="rounded max-sm:w-auto max-md:w-2/4 max-lg:w-auto max-xl:w-2/4 max-2xl:w-1/3">
          <Profile />
        </div>
        <div className="px-38 pt-7 pb-12 border-l border-gray-100 w-[78%] max-sm:w-full max-sm:px-8 max-lg:w-full">
          <div className="flex justify-between max-sm:flex-col-reverse max-sm:gap-6 max-sm:items-center">
            <p className="text-lg">Basic Details</p>
            <Button
              className="w-fit font-normal py-2.5 px-5 rounded-4 transition bg-button hover:bg-red-700 text-white max-xl:py-1.5"
              onClick={handleEditClick}
            >
              <div className="flex gap-1 items-center justify-center px-1.5">
                <span>
                  <Edit />
                </span>
                <span className="text-sm">Edit Profile</span>
              </div>
            </Button>
          </div>
          <div className="w-full mt-3.5">
            <div className="flex items-start border-b border-gray-100 pb-4 pt-6">
              <span className="text-gray-400 font-normal whitespace-nowrap min-w-138">
                First Name :
              </span>
              <span className="text-gray-900 w-full max-xs:pl-5">
                {data?.first_name}
              </span>
            </div>
            <div className="flex items-start border-b border-gray-100 pb-4 pt-6">
              <span className="text-gray-400 font-normal whitespace-nowrap min-w-138">
                Last Name :
              </span>
              <span className="text-gray-900 w-full max-xs:pl-5">
                {data?.last_name}
              </span>
            </div>
            <div className="flex items-start border-b border-gray-100 pb-4 pt-6">
              <span className="text-gray-400 font-normal whitespace-nowrap min-w-138">
                Mobile :
              </span>
              <span className="text-gray-900 w-full max-xs:pl-5">
                {data?.phone_number}
              </span>
            </div>
            <div className="flex items-start border-b border-gray-100 pb-4 pt-6">
              <span className="text-gray-400 font-normal whitespace-nowrap min-w-138">
                E-mail :
              </span>
              <span className="text-gray-900 w-full max-xs:pl-5">
                {data?.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
