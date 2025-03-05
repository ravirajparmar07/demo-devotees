import React, { useState } from "react";
import {
  useAddTempleMutation,
  useGetFilteredDataQuery,
  useGetTempleDataQuery,
} from "@/Services/dashboard";
import withAuth from "@/hoc/withAuth";
import * as Yup from "yup";
import DashBoard from "../../Ui/DashBoard/DashBoard";
import { showToast } from "@/Components/Common/Toaster/Toaster";
import useAuthToken from "@/Components/Common/CustomHooks/useAuthToken";
import Loader from "@/Components/Common/Loader/Loader";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const { data, isLoading, isError, refetch, status } = useGetTempleDataQuery(
    { filterData, searchTerm },
    { refetchOnMountOrArgChange: true }
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleItems, setVisibleItems] = useState(4);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // useGetFilteredDataQuery(filterData);

  const token = useAuthToken();

  const filters = [{ label: "Name (A-Z)", value: "-name" }];

  const [addTemple, { isLoading: isAdding, isError: isAddError, isSuccess }] =
    useAddTempleMutation(token);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedImage(null);
  };

  const handleAddCamera = () => {
    setIsPopupOpen(true);
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("image", file);
    }
  };

  const initialValues = {
    ip: "",
    cameraID: "",
    gate_number: "",
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Temple Name is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmitForm = async (values, { resetForm }) => {
    try {
      setIsProcessing(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("address", values.address);

      if (values.image) {
        formData.append("image", values.image);
      }

      const payload = {
        token: token,
        newTemple: formData,
      };

      const response = await addTemple(payload).unwrap();

      showToast("success", "Temple added successfully.");
      resetForm();
      setIsPopupOpen(false);
      await refetch();
    } catch (error) {
      showToast("error", "Add Temple failed. Please try again.");
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
    console.log("handleFilterClick = ", items.value);
    setFilterData(items.value);
  };

  const handleOrderClick = () => {
    console.log("handleOrderClick");
  };

  return (
    <>
      {isProcessing ? <Loader isLoading text="Processing..." /> : null}
      <DashBoard
        data={data}
        isLoading={isLoading}
        isError={isError}
        handleAddCamera={handleAddCamera}
        handleClosePopup={handleClosePopup}
        isPopupOpen={isPopupOpen}
        selectedImage={selectedImage}
        handleFileChange={handleFileChange}
        initialValues={initialValues}
        validationSchema={validationSchema}
        handleSubmitForm={handleSubmitForm}
        setIsPopupOpen={setIsPopupOpen}
        refetch={refetch}
        visibleItems={visibleItems}
        setVisibleItems={setVisibleItems}
        isDataLoading={isDataLoading}
        setIsDataLoading={setIsDataLoading}
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

export default withAuth(Index);
