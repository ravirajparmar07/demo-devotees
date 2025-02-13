import React from "react";
import Image from "next/image";
import { Formik, Form } from "formik";
import background from "../../../assets/images/background.jpg";
import logo from "../../../assets/images/logo.png";
import InputField from "@/Components/Common/InputField/InputField";
import { validationSchema, initialValues } from "./index";
import Button from "@/Components/Common/Button/Button";

const Register = ({ handleSubmit, isLoading }) => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${background.src})`,
      }}
    >
      <div className="bg-white shadow-lg rounded-lg py-10 px-55 max-w-497 w-full max-sm:px-30 max-sm:py-7 max-sm:mx-5 max-md:py-7">
        <div className="text-center">
          <Image src={logo} priority alt="Logo" className="w-92 h-66 mx-auto" />
          <h2 className="text-xl font-semibold text-gray-900 text-22 mt-5 max-md:mt-3.5 max-2xl:mt-2">
            Create New Account
          </h2>
          <p className="text-gray-500 mb-30 mt-1 text-gray max-xs:mb-5 max-xl:mb-3.5 max-2xl:mb-2.5">
            Sign up to continue to Devotee Analysis.
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="space-y-4">
              <div className="flex flex-col gap-4 max-sm:gap-2.5 max-md:gap-3 max-xl:gap-3.5 max-2xl:gap-2.5">
                <InputField
                  label="First Name"
                  type="text"
                  name="first_name"
                  placeholder="Enter First Name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <InputField
                  label="Last Name"
                  type="text"
                  name="last_name"
                  placeholder="Enter Last Name"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* below code is usefull for future */}

                {/* <div className="flex items-center mt-2.5">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    value={values.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 border-2 border-red-800 rounded-4 m-1"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm font-normal text-gray-900"
                  >
                    Remember me
                  </label>
                </div> */}

                <Button
                  type="submit"
                  className="w-full font-medium py-2.5 px-5 rounded-4 transition bg-button hover:bg-red-700 text-white max-xl:py-1.5"
                >
                  {isLoading ? "Logging in..." : "Sign Up"}
                </Button>

                <div className="text-sm flex gap-1 justify-center ">
                  <p className="text-gray-900 font-normal">
                    Already have an account?{" "}
                  </p>
                  <p>
                    <a
                      href="/"
                      className=" text-link font-medium hover:underline"
                    >
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
