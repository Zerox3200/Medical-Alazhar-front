import React from "react";
import { FaCamera, FaTimes } from "react-icons/fa";

const EvidenceUploader = ({
  register,
  value,
  handleImageChange,
  error,
  isLoading,
}) => {
  const inputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    console.log("file", file);
    if (file) {
      handleImageChange(file);
    }
  };

  const removeFile = () => {
    handleImageChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white border-2 border-dashed border-mistyMorning p-4 rounded-lg flex flex-col items-center justify-center w-full h-full relative">
      <input
        {...register}
        ref={inputRef}
        type="file"
        accept="image/*"
        id="evidence-upload"
        onChange={handleFileChange}
        className="hidden"
        disabled={isLoading}
      />

      <label
        htmlFor="evidence-upload"
        className={`flex flex-col items-center justify-center w-full h-full cursor-pointer ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        {isLoading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-2"></div>
            <span>Uploading...</span>
          </div>
        ) : value ? (
          <>
            <div className="relative w-full h-40 mb-2">
              <img
                src={URL.createObjectURL(value)}
                alt="Preview"
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <FaTimes size={14} />
              </button>
            </div>
            <span className="text-sm text-center">{value.name}</span>
          </>
        ) : (
          <>
            <FaCamera className="text-mistyMorning text-3xl mb-2" />
            <span className="text-mistyMorning">Click to upload evidence</span>
            <span className="text-xs text-gray-400 mt-1">
              Supports JPG, PNG (Max 5MB)
            </span>
          </>
        )}
      </label>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error.message}</p>
      )}
    </div>
  );
};
export default EvidenceUploader;
