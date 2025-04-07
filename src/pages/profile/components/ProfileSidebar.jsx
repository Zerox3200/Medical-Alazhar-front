import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { useUploadProfileImageMutation } from "../../../services/api/apiSlice";
import { toast, ToastContainer } from "react-toastify";
import ImageUpload from "./ImageUpload";

const ProfileSidebar = ({ data: { user } }) => {
  const [file, setFile] = useState(null);
  const [uploadProfileImage, { isLoading }] = useUploadProfileImageMutation();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const uploadFile = async () => {
    if (!file || !user._id) {
      toast.error("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("profile-image", file);

    try {
      const response = await uploadProfileImage({
        role: ["supervisor", "coordinator", "admin"].includes(user.role)
          ? "supervisor"
          : user.role,
        internId: user._id,
        imageFile: formData,
      }).unwrap();
      toast.success(response.message);
      setFile(null);
    } catch (err) {
      toast.error(err.data?.message);
    }
  };

  const date = new Date(user?.lastLogin);
  const lastLoginDate = date.toLocaleString();

  return (
    <div className="p-8 shadow-md border-r-1 border-mediumGray/20 h-full">
      <ToastContainer position="top-center" />
      {/* Profile Image */}
      <div className="mb-10">
        <ImageUpload
          inputId="profile-file"
          labelName="profile-file"
          file={file}
          handleFileChange={handleFileChange}
          imageType={user?.profileImage}
          isLoading={isLoading}
          uploadFile={uploadFile}
          imagePlaceholder={
            <FaRegCircleUser className=" text-6xl block m-auto text-mediumGray" />
          }
        />
        <div className="text-md text-darkGray text-center">
          <h3 className="text-xl flex justify-center items-center gap-1">
            <span>{user?.role}</span>
            <span>
              {user?.approved ? (
                <FaCheckCircle className="text-emeraldGreen" title="approved" />
              ) : (
                <IoCloseCircle className="text-darkGray" title="not approved" />
              )}
            </span>
          </h3>
          <p className="text-mediumGray">
            Last login in <strong>{lastLoginDate}</strong>
          </p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-mediumGray/40"></div>
      <ul className="py-10">
        <li className="text-lg px-4 py-2 cursor-pointer duration-150 transition-colors hover:bg-softGray">
          General Information
        </li>
        <li className="text-lg px-4 py-2 cursor-pointer duration-150 transition-colors hover:bg-softGray">
          Cases
        </li>
        <li className="text-lg px-4 py-2 cursor-pointer duration-150 transition-colors hover:bg-softGray">
          Courses
        </li>
        <li className="text-lg px-4 py-2 cursor-pointer duration-150 transition-colors hover:bg-softGray">
          Change Password
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
