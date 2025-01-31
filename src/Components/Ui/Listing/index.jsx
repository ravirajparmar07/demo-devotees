import React from "react";
import Listing from "@/Components/Ui/Listing/Listing";
import { useRouter } from "next/router";
import withAuth from "@/hoc/withAuth";

const index = () => {
  const data = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
  const router = useRouter();
  const { pathname } = router;
  return <Listing pathname={pathname} router={router} data={data} />;
};

export default withAuth(index);
