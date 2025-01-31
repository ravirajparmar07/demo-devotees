import React, { useEffect, useState } from "react";
import BasicDetail from "./BasicDetail";
import * as Yup from "yup";
import { useProfileDataQuery } from "@/Services/myprofile";
import { useUpdateProfileMutation } from "@/Services/myprofile";
import { useRouter } from "next/router";
import { showToast } from "@/Components/Common/Toaster/Toaster";
import useAuthToken from "@/Components/Common/CustomHooks/useAuthToken";

export const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters"),
  last_name: Yup.string()
    .required("Last name is required")
    .min(3, "Last name must be at least 3 characters"),
  phone_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const index = () => {
  const token = useAuthToken();

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
  });

  const { data, isLoading, refetch } = useProfileDataQuery(token);
  const [updateProfile, { isLoading: isUpdating, error }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (data) {
      setInitialValues({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        phone_number: data.phone_number || "",
        email: data.email || "",
      });
    }
  }, [data]);
  const router = useRouter();
  const handleSubmitForm = async (values) => {
    try {
      const response = await updateProfile({
        token,
        profileData: values,
      }).unwrap();

      showToast("success", "profiile update Successfully.");
      refetch();
      router.push("/profile");
    } catch (err) {
      console.error("Error updating profile:", err);
      showToast("error", "Profile updatation failed. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <BasicDetail
      data={data}
      isLoading={isLoading}
      initialValues={initialValues}
      token={token}
      isUpdating={isUpdating}
      updateProfile={updateProfile}
      refetch={refetch}
      handleSubmitForm={handleSubmitForm}
      handleCancel={handleCancel}
    />
  );
};

export default index;
