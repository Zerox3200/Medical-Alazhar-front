import React from "react";
import { FaCamera } from "react-icons/fa";

const ImageUpload = ({
  imageType,
  handleFileChange,
  isLoading,
  file,
  uploadFile,
  imagePlaceholder,
  inputId,
  labelName,
}) => {
  return (
    <div className="rounded-sm mb-4 relative group bg-softGray min-h-64 flex flex-center justify-center">
      {imageType ? (
        <img
          src={"http://localhost:3000/" + imageType}
          alt="Profile"
          className="w-full border-1 border-mediumGray/10 shadow-sm cursor-pointer rounded-sm p-2 max-h-64 object-contain"
        />
      ) : (
        imagePlaceholder
      )}

      <div className="bg-darkGray/20 absolute w-full h-full inset-0 opacity-0 duration-200 transition-all group-hover:opacity-100 flex flex-col justify-center items-center text-softGray text-xl">
        <input
          type="file"
          accept="image/*"
          id={inputId}
          onChange={handleFileChange}
          disabled={isLoading}
          className="hidden"
        />
        <label
          htmlFor={labelName}
          className={`flex items-center gap-2 p-3 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition-all duration-300 ${
            isLoading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200 hover:border-gray-400"
          }`}
        >
          <FaCamera className="text-xl text-gray-600" />
          <span className="text-gray-700">
            {isLoading
              ? "Uploading..."
              : file
              ? file.name
              : "Upload Profile Image"}
          </span>
        </label>
        <button
          type="submit"
          className="bg-mediumBlue rounded-xs p-1 cursor-pointer mt-4"
          onClick={uploadFile}
        >
          upload
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
