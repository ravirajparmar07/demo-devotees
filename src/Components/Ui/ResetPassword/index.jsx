import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import ResetPassword from "@/Components/Ui/ResetPassword/ResetPassword";
import { useSetPasswordMutation } from "@/Services/loginSignup";
import Toast, { showToast } from "@/Components/Common/Toaster/Toaster";

export const ResetPasswordSchema = Yup.object().shape({
  new_password: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .required("New password is required"),
  new_confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function Index() {
  const [setPassword, { isLoading }] = useSetPasswordMutation();
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.token) {
      setToken(router.query.token);
    }
  }, [router.query.token]);

  const handleSubmit = async (values, { resetForm }) => {
    if (!token) {
      showToast("error", "Invalid or expired token. Please try again.");
      return;
    }

    if (values.new_password !== values.new_confirm_password) {
      showToast("error", "Passwords do not match");
      return;
    }

    try {
      await setPassword({
        new_password: values.new_password,
        new_confirm_password: values.new_confirm_password,
        token,
      }).unwrap();

      resetForm();
      showToast("success", "Password set successfully.");
      setTimeout(() => router.push("/"), 2000);
    } catch (err) {
      const errorMessage =
        err?.data?.message || "Failed to reset password. Please try again.";
      showToast("error", errorMessage);
    }
  };

  const uib = { new_password: "", new_confirm_password: "" };
  return (
    <>
      <Toast />
      <ResetPassword
        initialValues={uib}
        validationSchema={ResetPasswordSchema}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
}

export default Index;
