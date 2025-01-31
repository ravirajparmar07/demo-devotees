import React from "react";
import Register from "@/Components/Ui/Register/Register";
import * as Yup from "yup";
import { useRegisterUserMutation } from "@/Services/loginSignup";
import Toast, { showToast } from "@/Components/Common/Toaster/Toaster";

export const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("*First name is required")
    .min(3, "*First name must be at least 3 characters"),
  last_name: Yup.string()
    .required("*Last name is required")
    .min(3, "*Last name must be at least 3 characters"),
  email: Yup.string()
    .email("*Invalid email address")
    .required("*Email is required"),
});

export const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
};

const Index = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await registerUser(values).unwrap();

      showToast("success", "Registered Successfully.");
    } catch (error) {
      console.error("Registration failed:", error);
      showToast("error", "Registration failed. Please try again.");
    }

    resetForm();
  };

  return (
    <>
      <Register handleSubmit={handleSubmit} isLoading={isLoading} />
      <Toast />
    </>
  );
};

export default Index;
