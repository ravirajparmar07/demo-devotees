import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const RolePermission = createApi({
  reducerPath: "RolePermission",
  baseQuery,
  endpoints: (builder) => ({
    getRolePermission: builder.query({
      query: () => ({
        url: "api/role/role-permissions",
      }),
    }),
    addRole: builder.mutation({
      query: ({ newItem }) => ({
        url: "/role/role-permissions/",
        method: "POST",
        body: newItem,
      }),
    }),
    updateRole: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `path${id}`,
        method: "PATCH",
        body: updatedData,
      }),
    }),
    deleteRole: builder.mutation({
      query: ({ deleteId }) => {
        return {
          url: `/role/role-permissions/${deleteId}/`,
          method: "DELETE",
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
