import React from "react";
import EditProfile from "./EditProfile";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const { pathname } = router;
  return <EditProfile pathname={pathname} router={router} />;
};

export default index;
