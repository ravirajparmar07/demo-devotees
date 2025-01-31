import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  useProfileDataQuery,
  useUpdateProfilePictureMutation,
} from "@/Services/myprofile";
import useAuthToken from "../CustomHooks/useAuthToken";

const Profile = () => {
  const token = useAuthToken();

  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);
  const [updateProfilePicture, { isLoading, isSuccess, isError }] =
    useUpdateProfilePictureMutation(token);
  const { data } = useProfileDataQuery(token);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

      const formData = new FormData();
      formData.append("profile_picture", file);

      try {
        const response = await updateProfilePicture({
          token,
          profileData: formData,
        });
      } catch (error) {
        console.error("Error while updating profile picture:", error);
      }
    }
  };

  const placeholderLetter = (data?.first_name?.charAt(0) || "").toUpperCase();

  return (
    <div className="max-2xl:flex max-2xl:justify-center">
      <div className="w-fit px-93 pt-38 text-center max-sm:w-full max-2xl:px-0">
        <div className="px-3.5">
          {previewImage || data?.profile_picture_url ? (
            <Image
              src={previewImage || data?.profile_picture_url}
              alt="Profile"
              className="h-133 w-133 object-cover block m-auto rounded-full cursor-pointer"
              onClick={handleImageClick}
              height={133}
              width={133}
            />
          ) : (
            <div
              onClick={handleImageClick}
              className="h-133 w-133 bg-gray-300 text-white flex items-center justify-center rounded-full cursor-pointer text-4xl font-bold"
            >
              {placeholderLetter || "?"}
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="mt-3">
          <p className="font-semibold text-22 max-xl:text-xl">
            <span>{data?.first_name}</span>
            <span> {data?.last_name}</span>
          </p>
          <p className="text-gray-400 mt-2.5 max-xl:text-sm max-xl:mt-1.5">
            Administrator
          </p>
        </div>
        {isLoading && <p>Updating profile picture...</p>}
        {isSuccess && (
          <p className="text-green-500">
            Profile picture updated successfully!
          </p>
        )}
        {isError && (
          <p className="text-red-500">Failed to update profile picture.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
