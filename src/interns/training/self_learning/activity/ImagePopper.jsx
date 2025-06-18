import React, { useState } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";

const ImagePopper = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full">
        <img
          src={src}
          alt={alt}
          onClick={() => setIsOpen(true)}
          className="w-full h-32 object-contain cursor-pointer"
        />
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-screen">
            <img
              src={src}
              alt={alt}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition cursor-pointer"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default ImagePopper;
