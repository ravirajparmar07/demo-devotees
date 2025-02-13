import Image from "next/image";
import { Formik, Form } from "formik";
import InputField from "@/Components/Common/InputField/InputField";
import Button from "@/Components/Common/Button/Button";
import logo from "@/assets/images/logo.png";
import background from "@/assets/images/background.jpg";
import { initialValues, validationSchema } from "./index";
import Loader from "@/Components/Common/Loader/Loader";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login({ isLoading, handleSubmit }) {
  const router = useRouter();

  useEffect(() => {
    const rememberedUserEmail = localStorage.getItem("rememberedEmail");
    const authToken = localStorage.getItem("authToken");

    if (rememberedUserEmail && authToken && router.pathname !== "/dashboard") {
      router.push("/dashboard");
    } else if (
      (!rememberedUserEmail || !authToken) &&
      router.pathname !== "/"
    ) {
      router.push("/");
    }
  }, [router.pathname]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <div
        className="flex items-center justify-center h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${background.src})`,
        }}
      >
        <div className="bg-white shadow-lg rounded-lg py-10 px-55 w-full max-w-497 max-sm:mx-5 max-xs:px-10">
          <div className="text-center">
            <Image
              src={logo}
              priority
              alt="Logo"
              className="mx-auto w-92 h-66 mb-1"
            />
            <h2 className="text-22 font-semibold text-gray-900 mb-1">
              Welcome Back!
            </h2>
            <p className="text-gray-500 font-normal text-base mb-30">
              Enter login credentials to access your account.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur }) => {
              return (
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
                  <InputField
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-between w-full max-sm:flex max-sm:flex-col">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          className="form-checkbox h-4 w-4 text-red-600 border"
                          checked={values.rememberMe}
                          onChange={handleChange}
                        />
                        <span className="ml-2 text-sm font-normal text-gray-900 my-17">
                          Remember me
                        </span>
                      </div>
                      <div className="max-sm:pb-3">
                        <span className="ml-2 text-sm font-normal text-gray-900 my-17">
                          <a href="/forgotpassword">Forgot Password</a>
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-2.5 px-5 rounded-4 transition bg-button hover:bg-red-700 text-white max-xl:py-1.5"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Sign In"}
                  </Button>
                </Form>
              );
            }}
          </Formik>

          <div className="text-sm flex gap-1 justify-center mt-17 max-xl:mt-1.5 max-xs:flex-col max-xs:justify-center  max-xs:items-center">
            <p className="text-gray-900 font-normal">Don’t Have an Account? </p>
            <p>
              <a
                href="/register"
                className="w-full text-link font-medium hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
