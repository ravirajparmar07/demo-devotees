import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const RolePermission = createApi({
  reducerPath: "RolePermission",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    getRolePermission: builder.query({
      query: (token) => ({
        url: "api/role/role-permissions",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addRole: builder.mutation({
      query: ({ newItem, token }) => ({
        url: "/role/role-permissions/",
        method: "POST",
        body: newItem,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateRole: builder.mutation({
      query: ({ id, updatedData, token }) => ({
        url: `path${id}`,
        method: "PATCH",
        body: updatedData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteRole: builder.mutation({
      query: ({ token, deleteId }) => {
        return {
          url: `/role/role-permissions/${deleteId}/`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetRolePermissionQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = RolePermission;
