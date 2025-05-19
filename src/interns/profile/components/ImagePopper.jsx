import React, { useState } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";

const ImagePopper = ({ src, alt, setOpenImageUploaderModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="group relative rounded-full overflow-hidden w-fit">
        <img
          src={src}
          alt={alt}
          onClick={() => setIsOpen(true)}
          className="rounded-full w-42 h-42 object-cover cursor-pointer border-1 border-silverFrost"
        />
        <div className="w-42 h-1/2 group-hover:-translate-y-0 translation-all duration-200 translate-y-full absolute bottom-0 left-1/2 -translate-x-1/2 bg-primary/20 text-white text-xl flex justify-center items-center cursor-pointer ">
          <FaCamera onClick={() => setOpenImageUploaderModal(true)} />
        </div>
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
    </div>
  );
};
export default ImagePopper;
