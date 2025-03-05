import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import LeftArrow from "@/assets/svg/LeftArrow";

const CameScreen = () => {
  const router = useRouter();
  const videoRef = useRef(null);
  const wsRef = useRef(null);
  const { cameraId, gateName } = router.query;

  const [imageSrc, setImageSrc] = useState("");
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cameraId) {
      const rtspUrl = `rtsp://admin:admin@123@192.168.1.${cameraId}:554/stream`;
      connectCamera(rtspUrl);
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [cameraId]);

  const connectCamera = (url) => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    const encodedRtspUrl = encodeURIComponent(url);
    const ws = new WebSocket(
      `ws://192.168.1.152:8000/ws/camera/${encodedRtspUrl}`
    );

    ws.onopen = () => {
      console.log(" WebSocket Connected");
      setConnected(true);
      setError("");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.frame) {
          setImageSrc(`data:image/jpeg;base64,${data.frame}`);
        }
      } catch (error) {
        console.error(" Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log(" WebSocket Disconnected. Retrying in 10s...");
      setConnected(false);
      setError("WebSocket disconnected. Trying to reconnect...");
      setTimeout(() => connectCamera(url), 10000);
    };

    ws.onerror = (error) => {
      console.error(" WebSocket Error:", error);
      setConnected(false);
      setError("WebSocket encountered an error.");
    };

    wsRef.current = ws;
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => router.push("/real-time-counting")}
          className="hover:underline flex items-center gap-2"
        >
          <span className="text-lg">
            <LeftArrow />
          </span>
          <span className="text-sm font-normal text-gray-700">Back</span>
        </button>
        <h2 className="text-xl font-medium text-option">
          {gateName || "Unknown Gate"}
        </h2>
      </div>

      <div className="p-5 bg-white rounded-lg shadow-lg">
        <div className="relative border border-gray-300 rounded-lg overflow-hidden">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Camera Feed"
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="w-full h-[480px] flex items-center justify-center bg-gray-200">
              <p className="text-gray-500">
                {error || (connected ? "Loading stream..." : "Connecting...")}
              </p>
            </div>
          )}

          <div className="absolute top-4 left-4 text-white text-sm px-3 py-1 rounded-md shadow-md">
            Camera: {cameraId || "N/A"}
          </div>
          <div className="absolute top-4 right-4 bg-red-600 text-white text-sm px-3 py-1 rounded-md shadow-md">
            {gateName || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameScreen;
