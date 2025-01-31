import React from "react";
import { Formik, Form } from "formik";
import InputField from "@/Components/Common/InputField/InputField";
import { validationSchema, initialValues } from "./index";
import Button from "@/Components/Common/Button/Button";

const ChangePassword = ({
  handleSubmit,
  isError,
  isLoading,
  error,
  handleCancel,
}) => {
  return (
    <div className="px-38 pb-58 pt-38">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form className="space-y-4">
            <div className="flex flex-col gap-4 max-2xl:gap-4">
              <div className="flex gap-4 max-xl:flex-col">
                <div className="grow">
                  <InputField
                    label="Old Password"
                    name="oldpassword"
                    type="password"
                    placeholder="Enter old password"
                    value={values.oldpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="grow">
                  <InputField
                    label="New Password"
                    name="newpassword"
                    type="password"
                    placeholder="Enter new password"
                    value={values.newpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="grow">
                  <InputField
                    label="Confirm Password"
                    name="confirmpassword"
                    type="password"
                    placeholder="Re-enter new password"
                    value={values.confirmpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="flex gap-2.5 justify-end max-sm:flex-col">
                <Button
                  type="submit"
                  className="w-fit text-sm py-2.5 px-5 rounded-4 transition bg-button hover:bg-red-700 text-white max-sm:w-full max-xl:py-1.5"
                  disabled={isLoading}
                >
                  Change Password
                </Button>

                <Button
                  className="py-2.5 px-5 rounded-4 transition text-sm font-normal bg-gray-100 hover:bg-gray-300 text-gray-800 max-sm:w-full max-xl:py-1.5"
                  onClick={handleCancel}
                  type="button"
                >
                  <span className="px-2.5">Cancel</span>
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {isError && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default ChangePassword;
