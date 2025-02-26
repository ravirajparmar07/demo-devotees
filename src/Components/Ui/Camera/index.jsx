import React, { useState } from "react";
import Camera from "./Camera";
import * as Yup from "yup";
import {
  useAddcameraMutation,
  useCameraDataQuery,
  useDeletecameraMutation,
  useUpdateCameraMutation,
} from "@/Services/camera";
import { showToast } from "@/Components/Common/Toaster/Toaster";
import { useGetTempleDataQuery } from "@/Services/dashboard";
import useAuthToken from "@/Components/Common/CustomHooks/useAuthToken";
import { useRouter } from "next/router";

export const validationSchema = Yup.object({
  ip_address: Yup.string().required("IP address is required"),
  camera_id: Yup.string().required("Camera ID is required"),
  gate: Yup.string().required("Gate number required"),
  temple: Yup.string().required("Please select temple"),
});

const index = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // console.log("deleteId  =", deleteId);

  const token = useAuthToken();

  const { data, isLoading, refetch } = useCameraDataQuery(token);

  const { data: dropdownData } = useGetTempleDataQuery();

  const [deletecamera, { isLoading: isDeleting }] = useDeletecameraMutation();

  const [updateCamera] = useUpdateCameraMutation();

  const totalData = Array.isArray(data) ? data.length : 0;
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = Array.isArray(data)
    ? data.slice(startIndex, endIndex).map((item, index) => ({
        id: item.id,
        ip: item.ip_address,
        cid: item.camera_id,
        gate: item.gate,
        status: item.status,
      }))
    : [];

  const filteredData = data?.map((item) => ({
    id: item.id,
    ip: item.ip_address,
    cid: item.camera_id,
    gate: item.gate,
    status: item.status,
  }));

  const initialValues = {
    ip_address: popupData?.ip || "",
    camera_id: popupData?.cid || "",
    gate: popupData?.gate || "",
    temple: "",
  };

  const columns = [
    { label: "SR. NO", field: "id" },
    { label: "IP ADDRESS", field: "ip" },
    { label: "CAMERA ID", field: "cid" },
    { label: "GATE NUMBER/NAME", field: "gate" },
    { label: "CAMERA STATUS", field: "status" },
    { label: "Action", field: "action" },
  ];

  const filters = [
    { label: "SR. No" },
    { label: "Ip Address" },
    { label: "Camera Id" },
    { label: "Gate No/Name" },
  ];

  const handleAddCamera = () => {
    setIsPopupOpen(true);
    setIsEditing(false);
    setPopupData(null);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsOpenView(false);
    setIsEditing(false);
    setIsDelete(false);
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
    console.log("row = ", row.id);

    setDeleteId(row.id);
    setIsOpenView(false);
    setPopupData(row);
    setIsDelete(true);
  };
  const [addcamera] = useAddcameraMutation(token);

  const handleSubmitForm = async (values, { resetForm }) => {
    try {
      const payload = {
        token: token,
        cameraData: values,
      };

      const response = await addcamera(payload).unwrap();

      showToast("success", "Add Camera Successfully.");
      await refetch();
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Add Camera failed:", error);
      showToast("error", "Add Camera failed. Please try again.");
    }

    resetForm();
  };

  const handleDeleteData = async () => {
    console.log("Attempting to delete camera with ID:", deleteId);

    try {
      await deletecamera({ token, deleteId }).unwrap();
      showToast("success", "Camera deleted successfully.");
      await refetch();
      handleClosePopup();
    } catch (error) {
      console.error("Error deleting camera:", error);
      showToast("error", "Failed to delete camera.");
    }
  };

  const handleUpdate = async (updatedData) => {
    console.log("updatedData = ", updatedData);

    try {
      const response = await updateCamera({
        cameraId: popupData?.id,
        updatedData: updatedData,
      }).unwrap();

      showToast("success", "Camera updated successfully.");
      await refetch();
      handleClosePopup();
    } catch (error) {
      console.error("Error updating camera:", error);
      showToast("error", "Failed to update camera.");
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);

    if (event.target.textContent === "Logout") {
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      router.push("/");
    }
  };

  const handleFilterClick = (items) => {
    console.log("handleFilterClick", items.label);
  };

  const handleOrderClick = () => {
    console.log("handleOrderClick");
  };
  return (
    <Camera
      handleSubmitForm={handleSubmitForm}
      handleAddCamera={handleAddCamera}
      handleClosePopup={handleClosePopup}
      handleViewClick={handleViewClick}
      handleEditClick={handleEditClick}
      handleDeleteClick={handleDeleteClick}
      columns={columns}
      initialValues={initialValues}
      isPopupOpen={isPopupOpen}
      isOpenView={isOpenView}
      popupData={popupData}
      isEditing={isEditing}
      isDelete={isDelete}
      data={data}
      token={token}
      handleDeleteData={handleDeleteData}
      handleUpdate={handleUpdate}
      filteredData={filteredData}
      isLoading={isLoading}
      dropdownData={dropdownData}
      totalData={totalData}
      itemsPerPage={itemsPerPage}
      currentData={currentData}
      handlePageChange={handlePageChange}
      currentPage={currentPage}
      handleClick={handleClick}
      handleClose={handleClose}
      anchorEl={anchorEl}
      filters={filters}
      handleFilterClick={handleFilterClick}
      handleOrderClick={handleOrderClick}
    />
  );
};

export default index;
