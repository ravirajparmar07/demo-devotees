import React from "react";
import logo from "@/assets/images/logo.png";
import background from "@/assets/images/background.jpg";
import InputField from "@/Components/Common/InputField/InputField";
import Image from "next/image";
import { Formik, Form } from "formik";
import Button from "@/Components/Common/Button/Button";
import Loader from "@/Components/Common/Loader/Loader";

const ForgotPassword = ({ validationSchema, handleSubmit, isLoading }) => {
  return (
    <>
      <Loader isLoading={isLoading} />
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${background.src})`,
        }}
      >
        <div className="bg-white py-10 px-12 rounded-lg shadow-lg max-w-md w-full max-sm:mx-5 max-xs:px-6">
          <div className="text-center">
            <Image
              src={logo}
              alt="Company Logo"
              className="mx-auto w-24 h-16 mb-5"
            />
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Forgot Password?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Enter your email and instructions will be sent to you!
            </p>
          </div>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="mt-4">
                  <Button
                    type="submit"
                    className="w-full font-medium py-2.5 px-5 rounded-4 transition bg-button hover:bg-red-700 text-white max-xl:py-1.5"
                    disabled={isLoading}
                  >
                    {isLoading ? "Verifying..." : "Verify Email"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
