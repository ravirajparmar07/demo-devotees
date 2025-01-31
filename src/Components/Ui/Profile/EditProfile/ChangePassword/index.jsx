import React, { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";
import * as Yup from "yup";
import { useUpdatePasswordMutation } from "@/Services/myprofile";
import { useRouter } from "next/router";
import useAuthToken from "@/Components/Common/CustomHooks/useAuthToken";

export const validationSchema = Yup.object({
  oldpassword: Yup.string()
    .required("Old password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "*Password must contain at least one special character"
    ),
  newpassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    ),
  confirmpassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newpassword")], "Passwords must match"),
});

export const initialValues = {
  oldpassword: "",
  newpassword: "",
  confirmpassword: "",
};

const index = () => {
  const token = useAuthToken();

  const [updatePassword, { isLoading, isError, error }] =
    useUpdatePasswordMutation(token);
  const router = useRouter();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await updatePassword({
        token,
        oldpassword: values.oldpassword,
        newpassword: values.newpassword,
      }).unwrap();

      resetForm();
    } catch (err) {
      console.error("Error changing password:", err);
    }
  };
  const handleCancel = () => {
    router.push("/profile");
  };
  return (
    <ChangePassword
      handleSubmit={handleSubmit}
      isError={isError}
      isLoading={isLoading}
      error={error}
      handleCancel={handleCancel}
    />
  );
};

export default index;
