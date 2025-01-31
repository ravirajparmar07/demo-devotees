import React, { useEffect, useState } from "react";
import MyProfile from "./MyProfile";
import { useRouter } from "next/router";
import { useProfileDataQuery } from "@/Services/myprofile";
import useAuthToken from "@/Components/Common/CustomHooks/useAuthToken";

const index = () => {
  const token = useAuthToken();

  const router = useRouter();
  const handleEditClick = () => {
    router.push("/editprofile");
  };

  const { data, isLoading } = useProfileDataQuery(token);

  return (
    <MyProfile
      handleEditClick={handleEditClick}
      data={data}
      isLoading={isLoading}
    />
  );
};

export default index;
