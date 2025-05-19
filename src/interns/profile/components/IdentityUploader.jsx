import React, { useEffect } from "react";
import { FaCamera, FaUpload } from "react-icons/fa";
import Button from "../../components/Button";
import { Modal } from "@mui/material";

const IdentityUploader = ({
  image,
  setImage,
  imageId,
  imageLabel,
  handleImageUpload,
  isLoading,
  isSuccess,
  openIdentitiyUploaderModal,
  setOpenIdentitiyUploaderModal,
}) => {
  useEffect(() => {
    if (isSuccess) {
      setOpenIdentitiyUploaderModal(false);
    }
  }, [isSuccess, setOpenIdentitiyUploaderModal]);

  return (
    <Modal
      className="flex justify-center items-center"
      open={openIdentitiyUploaderModal}
      onClose={() => setOpenIdentitiyUploaderModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex justify-center items-center bg-white p-12 w-2/3">
        <div className="w-full border-2 border-dashed border-mistyMorning p-4 rounded-lg flex flex-col items-center justify-center">
          <input
            type="file"
            accept="image/*"
            id={imageId}
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
          <label
            htmlFor={imageId}
            className={`flex items-center text-2xl cursor-pointer transition-all duration-300 `}
          >
            <span>
              {isLoading ? (
                "Uploading..."
              ) : image ? (
                image.name
              ) : (
                <div className="flex items-center gap-2">
                  <FaCamera className="text-secondary" />
                  <span className="text-xl"> {imageLabel} </span>
                </div>
              )}
            </span>
          </label>
          <div className="mt-8">
            <Button
              type="submit"
              icon={<FaUpload />}
              handleClick={handleImageUpload}
              label="Upload"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default IdentityUploader;
