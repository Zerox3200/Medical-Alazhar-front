import React from "react";
import { Input, Modal } from "@mui/material";
import { FaCamera } from "react-icons/fa";

const ImageUploader = ({
  openImageUploaderModal,
  setOpenImageUploaderModal,
}) => {
  const handleImageUploaderModalClose = () => {
    setOpenImageUploaderModal(false);
  };
  return (
    <Modal
      className="flex justify-center items-center"
      open={openImageUploaderModal}
      onClose={handleImageUploaderModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="bg-white rounded-md p-6 flex flex-col justify-between gap-6 items-center w-2/3 h-2/3">
        {/* Profile Image */}
        <div className="border-2 border-dashed border-mistyMorning p-4 rounded-lg flex flex-col items-center justify-center w-2/3 h-2/3">
          <input
            type="file"
            accept="image/*"
            id="profile-image"
            onChange={() => {}}
            className="hidden"
          />
          <label
            htmlFor="profile-image"
            className={`flex items-center  text-3xl cursor-pointer transition-all duration-300 ${"opacity-50 cursor-not-allowed"}`}
          >
            <span>
              <FaCamera className="text-gray-700" />
            </span>
            <span className="inline-block ml-2"> Profile Image </span>
          </label>
          <button
            type="submit"
            className="bg-coral rounded-xs text-lg text-white py-1 px-3 cursor-pointer mt-4"
            onClick={() => {}}
          >
            Upload
          </button>
        </div>
        {/* ID Image */}
        <div className="border-2 border-dashed border-mistyMorning p-4 rounded-lg flex flex-col items-center justify-center w-2/3 h-2/3">
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
        </div>
      </div>
    </Modal>
  );
};

export default ImageUploader;
