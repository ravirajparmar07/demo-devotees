import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = async (args, api, extraOptions) => {
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const refreshToken =
    localStorage.getItem("refreshToken") ||
    sessionStorage.getItem("refreshToken");

  const headers = new Headers();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response = await fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: () => headers,
  })(args, api, extraOptions);

  if (response.error && response.error.status === 401) {
    if (!refreshToken) {
      console.error("No refresh token available. User needs to log in again.");
      return response;
    }

    const refreshResponse = await fetch(
      "https://crowd-counting-backend.projectanddemoserver.com/api/users/refresh-token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    if (refreshResponse.ok) {
      const refreshData = await refreshResponse.json();
      const newAccessToken = refreshData.access;

      localStorage.setItem("authToken", newAccessToken);
      sessionStorage.setItem("authToken", newAccessToken);

      const retryHeaders = new Headers();
      retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);

      response = await fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        prepareHeaders: () => retryHeaders,
      })(args, api, extraOptions);
    } else {
      console.error("Refresh token failed, logging out...");
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("refreshToken");

      window.location.href = "/";
    }
  }

  return response;
};
