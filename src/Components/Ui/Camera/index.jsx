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

  const token = useAuthToken();

  const { data, isLoading, refetch } = useCameraDataQuery(token);

  const { data: dropdownData } = useGetTempleDataQuery();

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

  const [deletecamera, { isLoading: isDeleting }] = useDeletecameraMutation();
  const [updateCamera] = useUpdateCameraMutation();

  const handleDeleteData = async (cameraId) => {
    try {
      await deletecamera({ token, cameraId }).unwrap();
      handleClosePopup();
    } catch (error) {
      console.error("Error deleting camera:", error);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await updateCamera({
        cameraId: popupData?.id,
        updatedData: updatedData,
      });
      if (response.error) {
        console.error("Failed to update camera:", response.error);
      } else {
        handleClosePopup();
      }
    } catch (error) {
      console.error("Error updating camera:", error);
    }
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
    />
  );
};

export default index;
