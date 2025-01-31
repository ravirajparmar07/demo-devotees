import React from "react";
import { Formik, Form } from "formik";
import InputField from "@/Components/Common/InputField/InputField";
import { validationSchema } from "./index";
import Button from "@/Components/Common/Button/Button";
import Loader from "@/Components/Common/Loader/Loader";
const BasicDetail = ({
  data,
  isLoading,
  initialValues,
  isUpdating,
  handleSubmitForm,
  handleCancel,
}) => {
  if (isLoading) {
    return <Loader isLoading={true} text="Loading user details..." />;
  }

  return (
    <div className="px-38 pb-7 pt-38">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur }) => (
          <Form className="space-y-4">
            <div className="flex flex-col gap-4 max-2xl:gap-4">
              <div className="flex gap-4 max-md:flex-col max-lg:flex-row max-xl:flex-col">
                <div className="grow">
                  <InputField
                    label="First Name"
                    type="text"
                    name="first_name"
                    placeholder="Enter first name"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="grow">
                  <InputField
                    label="Last Name"
                    type="text"
                    name="last_name"
                    placeholder="Enter last name"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="flex gap-4 max-md:flex-col max-lg:flex-row max-xl:flex-col">
                <div className="grow">
                  <InputField
                    label="Mobile"
                    name="phone_number"
                    type="tel"
                    placeholder="Enter mobile number"
                    value={values.phone_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="grow">
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                  />
                </div>
              </div>
              <div className="flex gap-2.5 justify-end max-sm:flex-col">
                <div>
                  <Button
                    type="submit"
                    className="w-fit text-sm py-2.5 px-5 rounded-4 transition bg-button hover:bg-red-700 text-white max-sm:w-full max-xl:py-1.5"
                    disabled={isUpdating}
                  >
                    <span className="px-2.5">
                      {isUpdating ? "Updating..." : "Update"}
                    </span>
                  </Button>
                </div>
                <div>
                  <Button
                    className="py-2.5 px-5 rounded-4 transition text-sm font-normal bg-gray-100 hover:bg-gray-300 text-gray-800 max-sm:w-full max-xl:py-1.5"
                    onClick={handleCancel}
                    type="button"
                  >
                    <span className="px-2.5">Cancel</span>
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BasicDetail;
