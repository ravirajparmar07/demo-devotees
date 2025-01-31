import { useEffect, useState } from "react";

const useAuthToken = () => {
  const [token, setToken] = useState(
    localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken") ||
      " "
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localToken = localStorage.getItem("authToken");
      const sessionToken = sessionStorage.getItem("authToken");
      setToken(localToken || sessionToken || "");
    }
  }, []);

  return token;
};

export default useAuthToken;
