import React, { useEffect } from "react";
import Login from "@/Components/Ui/Login/Login";
import * as Yup from "yup";
import { useLoginUserMutation } from "@/Services/loginSignup";
import { useRouter } from "next/router";
import Toast, { showToast } from "@/Components/Common/Toaster/Toaster";

export const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
};

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Index() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const router = useRouter();

  useEffect(() => {
    if (
      localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken")
    ) {
      router.push("/dashboard");
    }
  }, []);

  const handleSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    loginUser(values)
      .unwrap()
      .then((response) => {
        if (response) {
          showToast("success", "Login successful!");
          if (values.rememberMe) {
            localStorage.setItem("authToken", response.access);
          } else {
            sessionStorage.setItem("authToken", response.access);
          }
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        const errorMessage = err?.data?.message || "Login failed";
        setErrors({ server: errorMessage });
        showToast("error", errorMessage);
      })
      .finally(() => {
        setSubmitting(false);
      });

    resetForm();
  };

  return (
    <>
      <Login handleSubmit={handleSubmit} isLoading={isLoading} />
      <Toast />
    </>
  );
}

export default Index;
