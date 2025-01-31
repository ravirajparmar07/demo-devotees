import React from "react";
import Layout from "../../../Layout/index";
import { useRouter } from "next/router";
import MyProfile from "./MyProfile/index";

const index = () => {
  const router = useRouter();
  const { pathname } = router;

  return <Layout>{pathname === "/profile" && <MyProfile />}</Layout>;
};

export default index;
