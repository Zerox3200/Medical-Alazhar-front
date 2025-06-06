import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { FaCamera, FaUpload } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useUploadProfileImageMutation } from "../../../services/common/uploadApiSlice";
import { useSelector } from "react-redux";
import Button from "../../components/Button";

const ImageUploader = ({
  openImageUploaderModal,
  setOpenImageUploaderModal,
}) => {
  const [image, setImage] = useState(null);
  const { id, role } = useSelector((state) => state.auth.user);

  const [uploadProfileImage, { isSuccess, isLoading }] =
    useUploadProfileImageMutation();

  const handleUploadProfileImage = async () => {
    if (!image) {
      return toast.error("Please select an image");
    }
    const formData = new FormData();

    formData.append("profile-image", image);
    console.log("formData", formData);
    try {
      const response = await uploadProfileImage({
        role,
        userId: id,
        imageFile: formData,
      });
      if (response?.data?.code === 200) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleImageUploaderModalClose = () => setOpenImageUploaderModal(false);
  useEffect(() => {
    if (isSuccess) {
      setOpenImageUploaderModal(false);
    }
  }, [isSuccess, setOpenImageUploaderModal]);

  return (
    <Modal
      className="flex justify-center items-center"
      open={openImageUploaderModal}
      onClose={handleImageUploaderModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="bg-white rounded-md p-6 flex flex-col justify-center gap-6 items-center w-2/3 h-2/3">
        {/* Profile Image */}
        <div className="border-2 border-dashed border-mistyMorning p-4 rounded-lg flex flex-col items-center justify-center w-2/3 h-2/3">
          <input
            type="file"
            accept="image/*"
            id="profile-image"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
          <label
            htmlFor="profile-image"
            className={`flex items-center text-3xl cursor-pointer transition-all duration-300 `}
          >
            <span>
              {isLoading ? (
                "Uploading..."
              ) : image ? (
                image.name
              ) : (
                <div className="flex items-center gap-2">
                  <FaCamera className="text-secondary" />
                  <span> Profile Image </span>
                </div>
              )}
            </span>
          </label>
          <div className="mt-8">
            <Button
              type="submit"
              icon={<FaUpload />}
              handleClick={handleUploadProfileImage}
              label="Upload"
            />
          </div>
        </div>
        {/* ID Image */}
        {/* <div className="border-2 border-dashed border-mistyMorning p-4 rounded-lg flex flex-col items-center justify-center w-2/3 h-2/3">
          <input
            type="file"
            accept="image/*"
            id="id-image"
            onChange={() => {}}
            className="hidden"
          />
          <label
            htmlFor="id-image"
            className={`flex items-center  text-3xl cursor-pointer transition-all duration-300 ${"opacity-50 cursor-not-allowed"}`}
          >
            <span>
              <FaCamera className="text-gray-700" />
            </span>
            <span className="inline-block ml-2"> ID Image</span>
          </label>
          <button
            type="submit"
            className="bg-coral rounded-xs text-lg text-white py-1 px-3 cursor-pointer mt-4"
            onClick={() => {}}
          >
            Upload
          </button>
        </div> */}
      </div>
    </Modal>
  );
};

export default ImageUploader;
