import React, { useState } from "react";
import Button from "@/Components/Common/Button/Button";
import Arrow from "@/assets/svg/Arrow";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PopupMenu from "@/Components/Common/Popup/Popup";
import InputField from "@/Components/Common/InputField/InputField";
import { useUpdateTempleMutation } from "@/Services/dashboard";
import { useDeleteTempleMutation } from "@/Services/dashboard";
import { showToast } from "../Toaster/Toaster";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Trash from "@/assets/svg/Trash";

const TempleCard = ({
  image,
  name,
  crowdData,
  id,
  loading,
  address,
  refetch,
}) => {
  console.log("address", address);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteTemple] = useDeleteTempleMutation();
  const [selectedFile, setSelectedFile] = useState(null);
  const open = Boolean(anchorEl);

  const [updateTemple, { isLoading, isError, isSuccess }] =
    useUpdateTempleMutation();

  const handleUpdateTemple = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("address", values.address);

      if (values.image) {
        formData.append("image", values.image);
      }

      await updateTemple({ id, updatedData: formData }).unwrap();

      console.log("Temple updated successfully!");
      setIsEditPopupOpen(false);

      showToast("success", "Temple update successfully...");
      if (refetch) refetch();
    } catch (error) {
      console.error("Failed to update temple:", error);
      showToast("error", "Temple not updated");
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteData = async (id) => {
    try {
      await deleteTemple(id).unwrap();
      showToast("success", "Temple deleted successfully.");
      setIsDeletePopupOpen(false);
      if (refetch) refetch();
    } catch (error) {
      showToast("error", "Failed to delete temple.");
    }
  };

  const handleClosePopup = () => {
    setIsDeletePopupOpen(false);
  };
  // const handleOpenEditPopup = () => {
  //   setIsEditPopupOpen(true);
  //   handleCloseMenu();
  // };

  const handleOpenEditPopup = (templeId) => {
    console.log("Temple ID:", templeId);
    setIsEditPopupOpen(true);
    handleCloseMenu();
  };

  const handleOpenDeletePopup = () => {
    setIsDeletePopupOpen(true);
    handleCloseMenu();
  };

  const handleEditClick = (id) => {
    router.push(`/dashboard/${id}`);
  };
  const handleCloseEditPopup = () => setIsEditPopupOpen(false);

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      setFieldValue("image", file);
    }
  };

  const initialValues = {
    name: name || "",
    address: address || "",
    image: null,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Temple Name is required"),
    address: Yup.string().required("Address is required"),
  });

  if (loading) {
    return (
      <div className="relative col-span-6 max-sm:col-span-12 border-0 rounded-4 shadow-bs bg-white p-4">
        <Skeleton variant="rectangular" height={200} className="mb-4" />
        <Skeleton variant="text" width={120} height={60} />
        <div className="grid grid-cols-3 text-center mt-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col">
              <Skeleton variant="text" width="80%" className="mb-2" />
              <Skeleton variant="text" width="50%" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative col-span-6 max-sm:col-span-12 border-0 rounded-4 shadow-bs bg-white">
      <div className="w-full h-[218px] flex items-center justify-center bg-[#bdbdbd] font-semibold text-5xl rounded">
        {image ? (
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`}
            alt={name}
            className="w-full h-[218px] object-cover rounded-r rounded-l"
          />
        ) : (
          <Avatar>{name?.charAt(0).toUpperCase() || "?"}</Avatar>
        )}
      </div>

      <div className="absolute top-3 text-white flex justify-between left-6 right-2 max-lg:left-2 max-lg:right-1 max-sm:left-4 max-xs:left-2">
        <p className="text-21 font-bold max-xl:text-lg max-lg:text-base text-black">
          {name}
        </p>
        <div className="flex items-center gap-1">
          <div
            className="bg-white p-[10px] max-lg:p-[6px] flex gap-[10px] max-lg:gap-[6px] rounded-4 justify-center items-center"
            onClick={() => handleEditClick(id)}
          >
            <Button className="text-option text-sm font-normal max-lg:text-xs max-xs:text-8">
              View more
            </Button>
            <Arrow />{" "}
          </div>

          <MoreVertIcon
            className="w-6 h-6 max-sm:w-5 max-sm:h-5 text-gray-700 cursor-pointer"
            onClick={handleClick}
          />
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            sx={{
              m: "10px",
              left: "-50px",
              "& .MuiPaper-root": { width: "100px" },
            }}
          >
            <MenuItem
              onClick={() => handleOpenEditPopup(id)}
              sx={{ display: "flex", gap: "5px" }}
            >
              <Edit fontSize="small" />
              Edit
            </MenuItem>
            <MenuItem
              onClick={handleOpenDeletePopup}
              sx={{ display: "flex", gap: "5px" }}
            >
              <Delete fontSize="small" />
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>

      <div className="grid grid-cols-3 text-center">
        {[
          { label: "TOTAL CROWD", value: crowdData?.total_crowd || 0 },
          { label: "TOTAL IN", value: crowdData?.total_in_count || 0 },
          { label: "TOTAL OUT", value: crowdData?.total_out_count || 0 },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-5 max-xl:gap-4 max-lg:gap-0 py-9 max-xl:py-7 max-lg:py-5 border-x"
          >
            <p className="text-13 max-xl:text-xs max-lg:text-[10px] text-Dashblack font-normal">
              {item.label}
            </p>
            <span className="text-3xl max-xl:text-26 max-lg:text-22 max-md:text-22 text-Dashblack2 font-semibold max-lg:font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {isEditPopupOpen && (
        <PopupMenu
          isOpen={isEditPopupOpen}
          onClose={handleCloseEditPopup}
          title="Edit Temple"
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleUpdateTemple}
          >
            {({ values, handleChange, handleBlur, setFieldValue }) => (
              <Form className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer w-20 h-20 bg-gray-200 rounded border border-dashed flex items-center justify-center"
                  >
                    <img
                      src={
                        selectedFile ||
                        `${process.env.NEXT_PUBLIC_BASE_URL}${image}`
                      }
                      alt="Selected"
                      width={80}
                      height={80}
                      className="rounded h-[inherit] object-cover"
                    />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                  />
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
                  <div className="flex justify-end gap-2">
                    <Button
                      type="submit"
                      className="w-fit text-sm py-2.5 px-5 rounded-4 transition bg-button hover:bg-red-700 text-white max-sm:w-full max-xl:py-1.5"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={handleCloseEditPopup}
                      className="py-2.5 px-5 rounded-4 transition text-sm font-normal bg-gray-100 hover:bg-gray-300 text-gray-800 max-sm:w-full max-xl:py-1.5"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </PopupMenu>
      )}

      {isDeletePopupOpen && (
        <PopupMenu>
          <div className="py-2.5">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="p-4 border border-option w-fit rounded bg-count">
                <Trash />
              </div>
              <p className="font-medium text-24">Delete Temple</p>
            </div>
            <div className="border border-gray-200 mt-4"></div>
            <div className="mt-5">
              <p className="text-base font-light text-gray-500 text-center">
                Are you sure you want to delete this Temple?
              </p>
              <div className="flex gap-2.5 mt-10 justify-center max-sm:flex-col">
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

export default TempleCard;
