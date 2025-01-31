import React from "react";
import ForgotPassword from "./ForgotPassword";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useResetPasswordMutation } from "@/Services/loginSignup";
import Toast, { showToast } from "../../Common/Toaster/Toaster";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const handleSubmit = async (values, { resetForm }, setPassword, router) => {
  try {
    await setPassword({ email: values.email }).unwrap();
    resetForm();
    showToast("success", "Password reset email sent successfully.");
  } catch (err) {
    const errorMessage =
      err?.data?.message || "Failed to reset password. Please try again.";
    showToast("error", errorMessage);
  }
};

function Index() {
  const [setPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();

  return (
    <>
      <ForgotPassword
        validationSchema={validationSchema}
        handleSubmit={(values, actions) =>
          handleSubmit(values, actions, setPassword, router)
        }
        isLoading={isLoading}
      />
      <Toast />
    </>
  );
}

export default Index;
