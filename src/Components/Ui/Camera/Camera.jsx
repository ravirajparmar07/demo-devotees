import React, { useState } from "react";
import PopupMenu from "@/Components/Common/Popup/Popup";
import Button from "@/Components/Common/Button/Button";
import Plus from "@/assets/svg/Plus";
import ReusableTable from "@/Components/Common/ReusableTable/ReusableTable";
import { ErrorMessage, Form, Formik } from "formik";
import { validationSchema } from "@/Components/Ui/Camera/index";
import InputField from "@/Components/Common/InputField/InputField";
import EditPencil from "@/assets/svg/EditPencil";
import Trash from "@/assets/svg/Trash";
import Filter from "@/assets/svg/Filter";
import Pagination from "@/Components/Common/Pagination/Pagination";

const Camera = ({
  handleSubmitForm,
  handleAddCamera,
  handleClosePopup,
  handleViewClick,
  handleEditClick,
  handleDeleteClick,
  columns,
  initialValues,
  isPopupOpen,
  isOpenView,
  popupData,
  isEditing,
  isDelete,
  data,
  token,
  handleDeleteData,
  handleUpdate,
  filteredData,
  isLoading,
  dropdownData,
  totalData,
  itemsPerPage,
  currentData,
  handlePageChange,
  currentPage,
}) => {
  return (
    <>
      <p className="text-lg">Camera and AI Hardware</p>

      <div className="bg-white p-5 flex max-sm:flex-col max-sm:gap-2.5 max-lg:flex-row justify-between items-center mt-3 rounded mb-6">
        <div className="flex max-sm:w-full items-center gap-3 max-lg:w-fit">
          <input
            type="text"
            placeholder="Search gate and camera"
            className="w-full md:w-[350px] xl:w-[387px] py-2.5 pl-3 border border-gray-200 rounded"
          />
          <Button
            className="bg-option py-2.5 px-4 rounded hover:bg-option w-fit max-sm:w-fit max-sm:hidden"
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

        <div className="flex max-sm:w-full gap-4">
          <Button
            className="bg-option py-2.5 px-4 rounded hover:bg-option w-fit  sm:hidden max-sm:w-full"
            onClick={handleAddCamera}
          >
            <div className="flex gap-2 items-center justify-center">
              <span>
                <Filter />
              </span>
              <span className="text-white">Filter</span>
            </div>
          </Button>
          <Button
            className="bg-option py-2.5 px-4 rounded hover:bg-option w-full sm:w-auto max-sm:w-full"
            onClick={handleAddCamera}
          >
            <div className="flex gap-2 items-center justify-center">
              <span>
                <Plus />
              </span>
              <span className="text-white">Add Camera</span>
            </div>
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <ReusableTable
          columns={columns}
          rows={currentData}
          onViewClick={handleViewClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          buttonConfig={{ view: true, edit: true, delete: true }}
          isLoading={isLoading}
        />
      </div>

      {isPopupOpen && (
        <PopupMenu
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          title={isEditing ? "Edit Camera" : "Add New Camera"}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={isEditing ? handleUpdate : handleSubmitForm}
            enableReinitialize
          >
            {({ values, handleChange, handleBlur }) => (
              <Form className="space-y-4">
                <div className="flex flex-col gap-1">
                  <div className="grow">
                    <InputField
                      label="IP address"
                      type="text"
                      name="ip_address"
                      placeholder="Enter IP address"
                      value={values.ip_address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="grow">
                    <InputField
                      label="Camera ID"
                      type="text"
                      name="camera_id"
                      placeholder="Enter Camera Id"
                      value={values.camera_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="grow">
                    <InputField
                      label="Gate Number/Name"
                      name="gate"
                      type="tel"
                      placeholder="Enter Gate Number"
                      value={values.gate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="temple"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Temple Name
                    </label>
                    <select
                      id="temple"
                      name="temple"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                      value={values.temple}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="" label="Select a temple" />

                      {dropdownData.map((item, index) => (
                        <option
                          key={index}
                          value={item.id}
                          className="hover:bg-button"
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      name="temple"
                      component="p"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
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
      {isOpenView && (
        <PopupMenu title="CAMERA DETAILS">
          <div className="flex flex-col gap-2.5">
            <div className="flex gap-2.5 border-b border-borderGray py-3 items-center">
              <p className="w-167 text-sm font-medium">IP address</p>
              <span>:</span>
              <p className="text-sm font-normal">{popupData?.ip}</p>
            </div>
            <div className="flex gap-2.5 border-b border-borderGray py-3 items-center">
              <p className="w-167 text-sm font-medium">Camera ID</p>
              <span>:</span>
              <p className="text-sm font-normal">{popupData?.cid}</p>
            </div>
            <div className="flex gap-2.5 border-b border-borderGray py-3 items-center">
              <p className="w-167 text-sm font-medium">Gate Number/Name</p>
              <span>:</span>
              <p className="text-sm font-normal">{popupData?.gate}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-5">
            <div
              className="flex gap-1.5 items-center py-3 cursor-pointer"
              onClick={() => handleEditClick(popupData)}
            >
              <span>
                <EditPencil />
              </span>
              <span className="text-link text-sm">Edit Camera</span>
            </div>
            <div className="flex gap-2.5 justify-end max-sm:flex-col">
              <Button
                type="submit"
                className="w-fit text-sm py-2.5 px-5 rounded-4 transition bg-button hover:bg-red-700 text-white max-sm:w-full max-xl:py-1.5"
                onClick={() => handleDeleteClick(popupData)}
              >
                <span className="px-2.5">Delete</span>
              </Button>
              <Button
                className="py-2.5 px-5 rounded-4 transition text-sm font-normal bg-gray-100 hover:bg-gray-300 text-gray-800 max-sm:w-full max-xl:py-1.5"
                onClick={handleClosePopup}
              >
                <span className="px-2.5">Cancel</span>
              </Button>
            </div>
          </div>
        </PopupMenu>
      )}
      {isDelete && (
        <PopupMenu>
          <div className="py-2.5">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="p-4 border border-option w-fit rounded bg-count">
                <Trash />
              </div>
              <p className="font-medium text-24">Delete Camera</p>
            </div>
            <div className="border border-gray-200 mt-4"></div>
            <div className="mt-5">
              <p className="text-base font-light text-gray-500 text-center">
                Are you sure you want to delete this Camera?
              </p>
              <div className="flex gap-2.5 mt-10 justify-center max-sm:flex-col">
                <Button
                  type="submit"
                  className="w-fit text-sm py-2.5 px-5 rounded-4 transition bg-button hover:bg-red-700 text-white max-sm:w-full max-xl:py-1.5"
                  onClick={handleDeleteData}
                >
                  <span className="px-2.5">Delete</span>
                </Button>
                <Button
                  className="py-2.5 px-5 rounded-4 transition text-sm font-normal bg-gray-100 hover:bg-gray-300 text-gray-800 max-sm:w-full max-xl:py-1.5"
                  onClick={handleClosePopup}
                >
                  <span className="px-2.5">Cancel</span>
                </Button>
              </div>
            </div>
          </div>
        </PopupMenu>
      )}
      <Pagination
        totalData={totalData}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Camera;
