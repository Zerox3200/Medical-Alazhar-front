import React, { useEffect, useState } from "react";
import { FaCamera, FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import { useUploadInternProfileImageMutation } from "../../services/common/uploadApiSlice";
import { useSelector } from "react-redux";
import Button from "../../components/Button";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const { id, role } = useSelector((state) => state.auth.user);

  const [uploadInternProfileImage, { isSuccess, isLoading }] =
    useUploadInternProfileImageMutation();

  const handleUploadProfileImage = async () => {
    if (!image) {
      return toast.error("Please select an image");
    }
    const formData = new FormData();

    formData.append("profile-image", image);

    try {
      const response = await uploadInternProfileImage({
        role,
        userId: id,
        imageFile: formData,
      });
      if (response?.error) toast.error(response?.error?.data?.message);
      if (response?.data?.code === 200) toast.success(response?.data?.message);
    } catch (error) {
      console.log("error", error);
      toast.error(error?.message);
    }
  };

  return (
    <div className="bg-flashWhite rounded-md flex flex-col justify-center gap-6 items-center w-full">
      <div className="border-2 border-dashed border-mistyMorning overflow-hidden rounded-sm flex flex-col items-center justify-center w-full">
        <input
          type="file"
          accept="image/*"
          id="profile-image"
          onChange={(e) => setImage(e.target.files[0])}
          className="hidden w-full h-full"
        />
        <label
          htmlFor="profile-image"
          className={`flex items-center justify-center text-xl cursor-pointer transition-all duration-300 w-full h-full py-12`}
        >
          <span>
            {isLoading ? (
              "Uploading..."
            ) : (
              <div className="w-full flex flex-col items-center gap-2 text-mistyMorning/60">
                <FaCamera className="text-5xl" />
              </div>
            )}
          </span>
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
