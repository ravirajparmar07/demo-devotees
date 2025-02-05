import React, { useEffect } from "react";
import TempleCard from "@/Components/Common/DashBoard/TempleCard";
import Filter from "@/assets/svg/Filter";
import Plus from "@/assets/svg/Plus";
import PopupMenu from "@/Components/Common/Popup/Popup";
import { Form, Formik } from "formik";
import InputField from "@/Components/Common/InputField/InputField";
import emptyimg from "../../../assets/images/emptyimg.jpg";
import Image from "next/image";
import Button from "@/Components/Common/Button/Button";

const DashBoard = ({
  data,
  isLoading,
  isError,
  handleAddCamera,
  handleClosePopup,
  isPopupOpen,
  handleFileChange,
  initialValues,
  validationSchema,
  visibleItems,
  isDataLoading,
  setIsDataLoading,
  handleSubmitForm,
}) => {
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setIsDataLoading(false);
      }, 2000);
    }
  }, [isLoading]);

  if (isLoading && visibleItems === 4) {
    return (
      <div className="grid grid-cols-12 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <TempleCard key={index} loading={true} />
        ))}
      </div>
    );
  }

  if (isError || !Array.isArray(data)) {
    return (
      <div className="text-center text-red-500">Error loading data...</div>
    );
  }

  return (
    <>
      <p className="text-lg">Temple</p>
      <div className="bg-white p-5 flex max-sm:flex-col max-sm:gap-2.5 max-lg:flex-row justify-between items-center mt-3 rounded mb-6 max-lg:block">
        <div className="flex max-sm:w-full items-center gap-3 max-lg:w-full max-lg:block">
          <input
            type="text"
            placeholder="Search Temple"
            className="w-full md:w-full xl:w-[387px] py-2.5 pl-3 border border-gray-200 rounded"
          />
          <Button
            className="bg-option py-2.5 px-4 rounded hover:bg-button w-fit max-sm:w-fit max-lg:hidden"
            // onClick={handleAddCamera}
          >
            <div className="flex gap-2 items-center justify-center">
              <span>
                <Filter />
              </span>
              <span className="text-white">Filter</span>
            </div>
          </Button>
        </div>

        <div className="flex max-sm:w-full gap-4 max-lg:flex max-sm:mt-4 max-lg:mt-3">
          <Button
            className="bg-option py-2.5 px-4 rounded hover:bg-button max-sm:block lg:hidden max-lg:w-full"
            // onClick={handleAddCamera}
          >
            <div className="flex gap-2 items-center justify-center max-xs:text-10">
              <span>
                <Filter />
              </span>
              <span className="text-white">Filter</span>
            </div>
          </Button>
          <Button
            className="bg-option py-2.5 px-4 rounded hover:bg-button w-full max-lg:w-full lg:w-full"
            onClick={handleAddCamera}
          >
            <div className="flex gap-2 items-center justify-center max-xs:text-10">
              <span>
                <Plus />
              </span>
              <span className="text-white">Add Temple</span>
            </div>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {data.slice(0, visibleItems).map((post) => (
          <TempleCard
            key={post.id}
            image={post.image}
            name={post.name}
            crowdData={post.crowd_count}
            id={post.id}
          />
        ))}

        {visibleItems < data.length && isDataLoading && (
          <div className="col-span-12 flex justify-center py-4">
            <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {!isDataLoading &&
          data
            .slice(visibleItems)
            .map((post) => (
              <TempleCard
                key={post.id}
                image={post.image}
                name={post.name}
                crowdData={post.crowdData}
                id={post.id}
              />
            ))}
      </div>

      {isPopupOpen && (
        <PopupMenu
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          title="Add New Temple"
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitForm}
            enableReinitialize
          >
            {({
              values,
              handleChange,
              handleBlur,
              setFieldValue,
              errors,
              touched,
            }) => (
              <Form className="space-y-4" encType="multipart/form-data">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer w-20 h-20 flex items-center justify-center bg-gray-200 rounded border border-dashed hover:bg-gray-300"
                    >
                      <Image
                        src={
                          values.image
                            ? URL.createObjectURL(values.image)
                            : emptyimg
                        }
                        alt="Selected"
                        className="w-full h-full object-cover rounded"
                        width={80}
                        height={80}
                      />
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                    />
                  </div>

                  <InputField
                    label="Temple Name"
                    type="text"
                    name="name"
                    placeholder="Enter Temple Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <InputField
                    label="Address"
                    type="text"
                    name="address"
                    placeholder="Enter Address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.image && touched.image && (
                    <div className="text-red-500 text-sm">{errors.image}</div>
                  )}

                  <div className="flex gap-2.5 justify-end max-sm:flex-col">
                    <Button
                      type="submit"
                      className="w-fit text-sm py-2.5 px-5 rounded-4 transition bg-button hover:bg-red-700 text-white max-sm:w-full max-xl:py-1.5"
                    >
                      <span className="px-2.5">Save</span>
                    </Button>
                    <Button
                      className="py-2.5 px-5 rounded-4 transition text-sm font-normal bg-gray-100 hover:bg-gray-300 text-gray-800 max-sm:w-full max-xl:py-1.5"
                      onClick={handleClosePopup}
                    >
                      <span className="px-2.5">Cancel</span>
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </PopupMenu>
      )}
    </>
  );
};

export default DashBoard;
