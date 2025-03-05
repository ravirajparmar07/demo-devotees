import React, { useEffect, useState, useRef } from "react";
import Listing from "@/Components/Ui/Listing/Listing";
import withAuth from "@/hoc/withAuth";
import Loader from "@/Components/Common/Loader/Loader";
import {
  useGetCrowdStateQuery,
  useGetTempleDataQuery,
} from "@/Services/dashboard";
import { useCameraDataQuery } from "@/Services/camera";
import moment from "moment";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const { pathname } = router;
  const { id } = router.query;

  const [filter, setFilter] = useState(moment().format("YYYY"));
  const [cameraFeeds, setCameraFeeds] = useState({});
  const wsRefs = useRef({});

  const { data: templename } = useGetTempleDataQuery();
  const { data: temple_data } = useCameraDataQuery({ temple_id: id });
  const {
    data: totalCount,
    isLoading,
    refetch,
  } = useGetCrowdStateQuery({ id, query: `filter=${filter}` });
  const { data: cameraData, isLoading: isCameraLoading } = useCameraDataQuery();

  useEffect(() => {
    refetch();
  }, [filter]);

  useEffect(() => {
    if (cameraData) {
      cameraData.slice(0, 12).forEach((cam) => {
        if (wsRefs.current[cam.id]) {
          wsRefs.current[cam.id].close();
        }

        const encodedIp = encodeURIComponent(cam.ip_address);
        const ws = new WebSocket(
          `ws://192.168.1.152:8000/ws/camera/${encodedIp}`
        );

        ws.onopen = () => console.log(`WebSocket connected: Camera ${cam.id}`);

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.frame) {
              setCameraFeeds((prev) => ({
                ...prev,
                [cam.id]: `data:image/jpeg;base64,${data.frame}`,
              }));
            }
          } catch (error) {
            console.error(
              `Error parsing WebSocket data for camera ${cam.id}:`,
              error
            );
          }
        };

        ws.onclose = () => {
          console.log(
            `WebSocket closed for Camera ${cam.id}, retrying in 10s...`
          );
          setTimeout(() => {
            if (
              !wsRefs.current[cam.id] ||
              wsRefs.current[cam.id].readyState === WebSocket.CLOSED
            ) {
              wsRefs.current[cam.id] = ws;
            }
          }, 10000);
        };

        ws.onerror = (error) =>
          console.error(`WebSocket error for Camera ${cam.id}:`, error);

        wsRefs.current[cam.id] = ws;
      });
    }

    return () => {
      Object.values(wsRefs.current).forEach((ws) => ws.close());
    };
  }, [cameraData]);

  const selectedTemple = templename?.find(
    (temple) => temple.id === parseInt(id)
  );
  const templeName = selectedTemple?.name || "Unknown Temple";

  if (isLoading || isCameraLoading) {
    return <Loader isLoading={true} text="Loading listing data..." />;
  }

  const handleBack = (path) => {
    router.push(path);
  };

  const templeData =
    temple_data?.slice(0, 12).map((cam) => ({
      id: cam.id,
      ip_address: cam.ip_address,
      gate: cam.gate,
      feed: cameraFeeds[cam.id] || null,
    })) || [];

  return (
    <Listing
      pathname={pathname}
      router={router}
      templeName={templeName}
      totalCount={totalCount}
      handleBack={handleBack}
      filter={filter}
      templeData={templeData}
      setFilter={setFilter}
    />
  );
};

export default withAuth(Index);
