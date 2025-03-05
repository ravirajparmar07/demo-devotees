import React from "react";
import { Formik, Form } from "formik";
import Button from "@/Components/Common/Button/Button";
import ReusableTable from "@/Components/Common/ReusableTable/ReusableTable";
import PopupMenu from "@/Components/Common/Popup/Popup";
import InputField from "@/Components/Common/InputField/InputField";
import Plus from "@/assets/svg/Plus";
import EditPencil from "@/assets/svg/EditPencil";
import Trash from "@/assets/svg/Trash";
import { Search } from "@mui/icons-material";

const UserAccess = ({
  roles,
  handleUpdate,
  handleDeleteClick,
  handleEditClick,
  handleViewClick,
  handleClosePopup,
  handleSubmitForm,
  handlePermissionChange,
  handleSelectAll,
  initialValues,
  columns,
  handleAddRoleClick,
  validationSchema,
  searchTerm,
  filteredData,
  isPopupOpen,
  isOpenView,
  isDelete,
  popupData,
  isEditing,
  handleDeleteData,
  isLoading,
  data,
  setSearchTerm,
}) => {
  console.log("data = ", data);

  return (
    <div>
      <p className="text-lg font-semibold">User Access & Permissions</p>
      <div className="bg-white p-5 flex max-sm:flex-col max-sm:gap-2.5 max-lg:flex-row justify-between items-center mt-3 rounded mb-6 shadow">
        <div className="relative flex flex-col max-sm:w-full items-center mr-3 max-lg:w-fit">
          <input
            type="text"
            placeholder="Search roles..."
            className="w-full sm:w-[300px] lg:w-[387px] py-2.5 pl-10 pr-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        <Button
          className="bg-option py-2.5 px-4 rounded hover:bg-[#ab2f2e] text-white shadow w-full sm:w-auto"
          onClick={handleAddRoleClick}
        >
          <div className="flex gap-2 items-center justify-center">
            <Plus />
            <span>Create Role</span>
          </div>
        </Button>
      </div>

      <ReusableTable
        columns={columns}
        rows={filteredData}
        onViewClick={handleViewClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        buttonConfig={{ view: true, edit: true, delete: true }}
        isLoading={isLoading}
      />

      {isPopupOpen && (
        <PopupMenu
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          title={isEditing ? "Edit Role" : "Create Role"}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={isEditing ? handleUpdate : handleSubmitForm}
            enableReinitialize
          >
            {({ values, setFieldValue, handleChange, handleBlur }) => (
              <Form className="space-y-4">
                <div className="flex flex-col gap-1">
                  <InputField
                    label="Enter User Role"
                    type="text"
                    name="userRole"
                    placeholder="Enter user role"
                    value={values.userRole}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-normal text-gray-900">
                    Permissions
                  </label>
                  <div className="rounded-4 text-lightgray">
                    <div className="flex items-center bg-customGray p-3">
                      <input
                        type="checkbox"
                        id="selectAll"
                        name="selectAll"
                        checked={values.selectAll}
                        onChange={(e) => handleSelectAll(e, setFieldValue)}
                        className="mr-2"
                      />
                      <label htmlFor="selectAll" className="text-sm">
                        Select all Permissions
                      </label>
                    </div>

                    <div className="p-3 rounded-4 border border-borderGray">
                      {data.map((permission, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={permission.id}
                            name={permission.name}
                            checked={
                              values.permissions[permission.name] || false
                            }
                            onChange={(e) => {
                              console.log("Checked ID:", permission.id);
                              handlePermissionChange(e, values, setFieldValue);
                            }}
                            className="mr-2"
                          />
                          <label htmlFor={permission.id} className="text-sm">
                            {permission.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2.5 justify-end max-sm:flex-col">
                  <Button
                    type="submit"
                    className="w-fit text-sm py-2.5 px-5 rounded bg-button hover:bg-red-700 text-white"
                  >
                    Save
                  </Button>
                  <Button
                    className="py-2.5 px-5 rounded text-sm font-normal bg-gray-100 hover:bg-gray-300 text-gray-800"
                    onClick={handleClosePopup}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </PopupMenu>
      )}
      {isOpenView && (
        <PopupMenu title="Role DETAILS">
          <div className="flex flex-col gap-2.5">
            <div className="flex gap-2.5 border-b border-borderGray py-3 items-center">
              <p className="w-167 text-sm font-medium">Role:</p>
              <span>:</span>
              <p className="text-sm font-normal">{popupData?.rl}</p>
            </div>
            <div className="flex gap-2.5 border-b border-borderGray py-3 items-center">
              <p className="w-167 text-sm font-medium">Permissions</p>
              <span>:</span>
              <p className="text-sm font-normal">{popupData?.pi}</p>
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
                onClick={() => handleDeleteData(id)}
              >
                <span className="px-2.5">Delete</span>
              </Button>
              <Button
                className="py-2.5 px-5 rounded-4 transition text-sm font-normal bg-gray-100 hover:bg-gray-300 text-gray-800 max-sm:w-full max-xl:py-1.5"
                onClick={handleClosePopup}
              >
                <span className="px-2.5 ">Cancel</span>
              </Button>
            </div>
          </div>
        </PopupMenu>
      )}
      {isDelete && (
        <PopupMenu>
          <div className="py-2.5">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="p-4 border border-option w-fit rounded bg-count ">
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
    </div>
  );
};

export default UserAccess;
