import React, { useState } from "react";
import {
  useAddTempleMutation,
  useGetTempleDataQuery,
} from "@/Services/dashboard";
import withAuth from "@/hoc/withAuth";
import * as Yup from "yup";
import DashBoard from "../../Ui/DashBoard/DashBoard";
import { showToast } from "@/Components/Common/Toaster/Toaster";
import useAuthToken from "@/Components/Common/CustomHooks/useAuthToken";

const Index = () => {
  const { data, isLoading, isError, refetch, status } = useGetTempleDataQuery();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleItems, setVisibleItems] = useState(4);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const token = useAuthToken();

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
      console.error("Add Temple failed:", error);
      showToast("error", "Add Temple failed. Please try again.");
    }
  };

  return (
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
    />
  );
};

export default withAuth(Index);
