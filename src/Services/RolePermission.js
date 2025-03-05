import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const RolePermission = createApi({
  reducerPath: "RolePermission",
  baseQuery,
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getRolePermission: builder.query({
      query: (token) => ({
        url: "api/role/useraccesspermissions",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Items"],
    }),

    getPermissionData: builder.query({
      query: (token) => ({
        url: "api/role/permissions/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    addRole: builder.mutation({
      query: ({ token, formData }) => ({
        url: "api/role/role-permissions/",
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updateRole: builder.mutation({
      query: ({ id, updatedData, token }) => ({
        url: `api/role/update-role-permissions/${id}/`,
        method: "PUT",
        body: updatedData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Items"],
    }),
    deleteRole: builder.mutation({
      query: ({ deleteId, token }) => ({
        url: `api/role/roles/${deleteId}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetRolePermissionQuery,
  useGetPermissionDataQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = RolePermission;
