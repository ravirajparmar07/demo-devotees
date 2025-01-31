import React from "react";
import { Formik, Form } from "formik";
import Image from "next/image";
import InputField from "../../Common/InputField/InputField";
import Button from "@/Components/Common/Button/Button";
import Loader from "@/Components/Common/Loader/Loader";
import logo from "../../../assets/images/logo.png";
import background from "../../../assets/images/background.jpg";

const ResetPassword = ({
  initialValues,
  validationSchema,
  handleSubmit,
  isLoading,
}) => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${background.src})`,
      }}
    >
      <Loader isLoading={isLoading} text="Resetting Password..." />
      <div className="bg-white shadow-lg rounded-lg py-10 px-55 w-full max-w-497 max-sm:mx-5 max-xs:px-10">
        <div className="text-center mb-6">
          <Image src={logo} alt="Logo" className="mx-auto w-24 h-16 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Reset Password
          </h2>
          <p className="text-gray-500 font-normal text-sm">
            Enter your new password below
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <div className="mb-4">
                <InputField
                  label="New Password"
                  name="new_password"
                  type="password"
                  placeholder="Enter new password"
                  value={values.new_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></InputField>
              </div>

              <div className="mb-4">
                <InputField
                  label="Confirm Password"
                  name="new_confirm_password"
                  type="password"
                  placeholder="Re-enter password"
                  value={values.new_confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></InputField>
              </div>

              <Button
                type="submit"
                className="w-full py-2.5 px-5 rounded-md transition bg-button hover:bg-red-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
