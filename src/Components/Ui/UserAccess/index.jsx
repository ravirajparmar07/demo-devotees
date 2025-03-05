import React, { useEffect, useState } from "react";
import UserAccess from "@/Components/Ui/UserAccess/UserAccess";
import {
  useAddRoleMutation,
  useDeleteRoleMutation,
  useGetPermissionDataQuery,
  useGetRolePermissionQuery,
  useUpdateRoleMutation,
} from "@/Services/RolePermission";
import * as Yup from "yup";
import { showToast } from "@/Components/Common/Toaster/Toaster";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [token, setToken] = useState("");

  const {
    data: roles,
    isFetching,
    error: fetchError,
    isLoading,
    refetch,
  } = useGetRolePermissionQuery(token);

  const { data } = useGetPermissionDataQuery(token);

  const [deleteRole] = useDeleteRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const [addRole, { isLoading: isAddingRole }] = useAddRoleMutation();

  const [formValues, setFormValues] = useState({
    userRole: "",
    permissions: {},
    selectAll: false,
  });

  const validationSchema = Yup.object({
    userRole: Yup.string().required("User  role is required"),
  });

  const itemsPerPage = 7;
  const handlePageChange = (page) => setCurrentPage(page);

  const filteredData = (roles || [])
    .map((item) => ({
      id: item.id,
      name: item.name || "",
      permissions:
        item.permissions?.map((perm) => perm.permission__name).join(", ") || "",
      created_by_name: item.created_by_name
        ? String(item.created_by_name).toLowerCase()
        : "",
    }))
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.permissions.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.created_by_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalData = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const columns = [
    { label: "Id", field: "id" },
    { label: "ROLES", field: "name" },
    { label: "PERMISSIONS", field: "permissions" },
    { label: "CREATED BY", field: "created_by_name" },
    { label: "ACTION", field: "action" },
  ];

  useEffect(() => {
    if (roles) setRows(roles);
  }, [roles]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleAddRoleClick = () => {
    setIsPopupOpen(true);
    setIsEditing(false);
    setPopupData(null);
  };

  const handleSelectAll = (e, setFieldValue) => {
    const isChecked = e.target.checked;

    const updatedPermissions = data.reduce(
      (acc, permission) => ({ ...acc, [permission.name]: isChecked }),
      {}
    );

    const selectedIds = isChecked
      ? data.map((permission) => permission.id)
      : [];

    setFieldValue("permissions", updatedPermissions);
    setFieldValue("selectAll", isChecked);
    setFieldValue("selectedIds", selectedIds);
  };

  const handlePermissionChange = (e, values, setFieldValue) => {
    const { name, checked } = e.target;
    const updatedPermissions = { ...values.permissions, [name]: checked };

    const selectedIds = Object.keys(updatedPermissions)
      .filter((key) => updatedPermissions[key])
      .map((key) => {
        const permission = data.find((perm) => perm.name === key);
        return permission ? permission.id : null;
      })
      .filter(Boolean);

    const isAllSelected = data.every(
      (permission) => updatedPermissions[permission.name]
    );

    setFieldValue("permissions", updatedPermissions);
    setFieldValue("selectAll", isAllSelected);
    setFieldValue("selectedIds", selectedIds);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsOpenView(false);
    setIsEditing(false);
    setIsDelete(false);
    setPopupData(null);
  };

  const handleSubmitForm = async (values) => {
    const selectedPermissionIds = Object.keys(values.permissions)
      .filter((key) => values.permissions[key])
      .map((key) => {
        const permission = data.find((perm) => perm.name === key);
        return permission ? permission.id : null;
      })
      .filter(Boolean);

    const formData = {
      name: values.userRole,
      permissions: selectedPermissionIds,
    };

    try {
      const response = await addRole({ token, formData }).unwrap();
      showToast("success", "Role added successfully.");
      await refetch();
      handleClosePopup();
    } catch (error) {
      showToast("error", error.data?.message || "Failed to add role.");
    }
    setIsPopupOpen(false);
  };

  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (popupData) {
      setFormValues({
        userRole: popupData?.name,
        permissions: popupData?.permissions || {},
        selectAll: Object.values(popupData?.permissions || {}).every(
          (val) => val === true
        ),
      });
    } else {
      setFormValues({
        userRole: "",
        permissions: {},
        selectAll: false,
      });
    }
  }, [popupData]);

  const handleUpdate = async (updatedData) => {
    if (!popupData?.id) {
      showToast("error", "Invalid role ID.");
      return;
    }

    const formData = {
      name: updatedData.userRole,
      permissions: selectedIds,
    };

    try {
      const response = await updateRole({
        id: popupData.id,
        updatedData: formData,
        token,
      }).unwrap();

      if (response?.role?.id) {
        showToast("success", "Role updated successfully.");

        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === popupData.id
              ? { ...row, name: formData.name, permissions: selectedIds }
              : row
          )
        );

        handleClosePopup();
      } else {
        showToast("error", "Failed to update role.");
      }
    } catch (error) {
      showToast("error", error.data?.message || "Fail to update role.");
    }
    setIsPopupOpen(false);
  };

  const handleEditClick = (row) => {
    setPopupData(row);
    setIsOpenView(false);
    setIsEditing(true);
    setIsPopupOpen(true);
  };

  const handleViewClick = (row) => {
    setPopupData(row);
    setIsOpenView(true);
  };

  const handleDeleteClick = (row) => {
    setDeleteId(row.id);
    setIsOpenView(false);
    setPopupData(row);
    setIsDelete(true);
  };

  const handleDeleteData = async () => {
    try {
      await deleteRole({ token, deleteId }).unwrap();
      showToast("success", "Role deleted successfully.");
      await refetch();
      handleClosePopup();
    } catch (error) {
      showToast("error", "Failed to delete role.");
    }
  };

  return (
    <UserAccess
      handleDeleteClick={handleDeleteClick}
      handleEditClick={handleEditClick}
      handleViewClick={handleViewClick}
      handleClosePopup={handleClosePopup}
      handlePermissionChange={handlePermissionChange}
      handleSelectAll={handleSelectAll}
      initialValues={formValues}
      columns={columns}
      handleAddRoleClick={handleAddRoleClick}
      validationSchema={validationSchema}
      handleSearchChange={handleSearchChange}
      searchTerm={searchTerm}
      filteredData={filteredData}
      isPopupOpen={isPopupOpen}
      isOpenView={isOpenView}
      isDelete={isDelete}
      popupData={popupData}
      isEditing={isEditing}
      totalData={totalData}
      itemsPerPage={itemsPerPage}
      currentData={currentData}
      handlePageChange={handlePageChange}
      currentPage={currentPage}
      handleUpdate={handleUpdate}
      handleDeleteData={handleDeleteData}
      isLoading={isLoading}
      handleSubmitForm={handleSubmitForm}
      data={data}
    />
  );
};

export default Index;
