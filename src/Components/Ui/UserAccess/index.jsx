import React, { useEffect, useState } from "react";
import UserAccess from "@/Components/Ui/UserAccess/UserAccess";
import {
  useDeleteRoleMutation,
  useGetRolePermissionQuery,
} from "@/Services/RolePermission";
import * as Yup from "yup";
import { showToast } from "@/Components/Common/Toaster/Toaster";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken") ||
        ""
      );
    }
    return "";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(
        localStorage.getItem("authToken") ||
          sessionStorage.getItem("authToken") ||
          ""
      );
    }
  }, []);

  const {
    data: roles,
    isFetching,
    error: fetchError,
    isLoading,
    refetch,
  } = useGetRolePermissionQuery(token);

  console.log("roles = ", roles);

  const [deleteRole] = useDeleteRoleMutation();

  useEffect(() => {
    if (roles) setRows(roles);
  }, [roles]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleAddRoleClick = () => {
    setIsPopupOpen(true);
    setIsEditing(false);
    setPopupData(null);
  };

  const validationSchema = Yup.object({
    userRole: Yup.string().required("User role is required"),
  });

  const itemsPerPage = 7;
  const handlePageChange = (page) => setCurrentPage(page);

  const filteredData = (roles || [])
    .map((item) => ({
      id: item.id,
      rl: item.role?.name || "",
      pi: item.permission?.name || "",
      cb: item.created_by ? String(item.created_by).toLowerCase() : "",
    }))
    .filter(
      (item) =>
        item.rl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.pi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cb.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalData = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const columns = [
    { label: "Id", field: "id" },
    { label: "ROLES", field: "rl" },
    { label: "PERMISSIONS", field: "pi" },
    { label: "CREATED BY", field: "cb" },
    { label: "ACTION", field: "action" },
  ];

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const initialValues = {
    userRole: popupData?.userRole || "",
    permissions: popupData?.permissions || {},
    selectAll: false,
  };

  const handleSelectAll = (e, setFieldValue) => {
    const isChecked = e.target.checked;
    const allPermissions = [
      "View Camera",
      "Add Camera",
      "Edit Camera",
      "Delete Camera",
    ];
    const updatedPermissions = allPermissions.reduce(
      (acc, permission) => ({ ...acc, [permission]: isChecked }),
      {}
    );
    setFieldValue("permissions", updatedPermissions);
    setFieldValue("selectAll", isChecked);
  };

  const handlePermissionChange = (e, values, setFieldValue) => {
    const { name, checked } = e.target;
    const updatedPermissions = { ...values.permissions, [name]: checked };
    const isAllSelected = Object.values(updatedPermissions).every(
      (val) => val === true
    );
    setFieldValue("permissions", updatedPermissions);
    setFieldValue("selectAll", isAllSelected);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsOpenView(false);
    setIsEditing(false);
    setIsDelete(false);
  };

  const handleSubmitForm = (values) => {
    handleClosePopup();
  };

  const handleViewClick = (row) => {
    setPopupData(row);
    setIsOpenView(true);
  };

  const handleEditClick = (row) => {
    setPopupData(row);
    setIsOpenView(false);
    setIsEditing(true);
    setIsPopupOpen(true);
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
      console.error("Error deleting role:", error);
      showToast("error", "Failed to delete role.");
    }
  };

  return (
    <UserAccess
      handleDeleteClick={handleDeleteClick}
      handleEditClick={handleEditClick}
      handleViewClick={handleViewClick}
      handleClosePopup={handleClosePopup}
      handleSubmitForm={handleSubmitForm}
      handlePermissionChange={handlePermissionChange}
      handleSelectAll={handleSelectAll}
      initialValues={initialValues}
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
      handleDeleteData={handleDeleteData}
      isLoading={isLoading}
    />
  );
};

export default Index;
