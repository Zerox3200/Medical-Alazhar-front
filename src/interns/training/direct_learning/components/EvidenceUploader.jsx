import React from "react";
import { FaCamera } from "react-icons/fa";

const EvidenceUploader = ({ isLoading, field, image, setImage }) => {
  console.log("field", field);
  return (
    <div className="bg-white border-2 border-dashed border-mistyMorning p-4 rounded-lg flex flex-col items-center justify-center w-full h-full">
      <input
        {...field}
        type="file"
        accept="image/*"
        id="profile-image"
        onChange={(e) => {
          setImage(e.target.files[0]);
          field.onChange(image);
        }}
        value={field.value}
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
              <FaCamera className="text-mistyMorning" />
              <span> Evidence </span>
            </div>
          )}
        </span>
      </label>
    </div>
  );
};

export default EvidenceUploader;
