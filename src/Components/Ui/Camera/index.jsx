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
import Loader from "@/Components/Common/Loader/Loader";

export const validationSchema = Yup.object({
  ip_address: Yup.string().required("IP address is required"),
  camera_id: Yup.string().required("Camera ID is required"),
  gate: Yup.string().required("Gate number required"),
  temple: Yup.string().required("Please select temple"),
});

const index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const token = useAuthToken();

  const { data, isLoading, isError, refetch, status } = useCameraDataQuery(
    token
      ? { token, filterData, searchTerm: searchTerm.toString() }
      : skipToken,
    { refetchOnMountOrArgChange: true }
  );

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const filters = [
    { label: "CameraId", value: "camera_id" },
    { label: "Gate", value: "gate " },
    { label: "Status", value: "status " },
  ];
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
    setDeleteId(row.id);
    setIsOpenView(false);
    setPopupData(row);
    setIsDelete(true);
  };
  const [addcamera] = useAddcameraMutation(token);

  const handleSubmitForm = async (values, { resetForm }) => {
    try {
      setIsProcessing(true);
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
    } finally {
      setIsProcessing(false);
    }

    resetForm();
  };

  const handleDeleteData = async () => {
    try {
      setIsProcessing(true);
      await deletecamera({ token, deleteId }).unwrap();
      showToast("success", "Camera deleted successfully.");
      await refetch();
      handleClosePopup();
    } catch (error) {
      console.error("Error deleting camera:", error);
      showToast("error", "Failed to delete camera.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      setIsProcessing(true);
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
    } finally {
      setIsProcessing(false);
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
    setFilterData(items.value);
  };

  const handleOrderClick = () => {
    console.log("handleOrderClick");
  };
  return (
    <>
      {isProcessing || isDeleting ? (
        <Loader isLoading text="Processing..." />
      ) : null}
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
        setSearchTerm={setSearchTerm}
      />
    </>
  );
};

export default index;
