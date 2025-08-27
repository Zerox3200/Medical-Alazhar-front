import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaTimes, FaCheck } from 'react-icons/fa';
import { IoMdImages } from 'react-icons/io';
import { toast } from 'react-hot-toast';

const UpdateCourseImage = ({
    isOpen,
    onClose,
    currentImage,
    onImageChange,
    onImageRemove,
    hasNewImage,
    courseData
}) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                onImageChange({ target: { files: [file] } });
            } else {
                toast.error('Please upload an image file');
            }
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            onImageChange(event);
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-6 text-white flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <IoMdImages className="text-lg sm:text-xl" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold">Course Image Management</h2>
                                <p className="text-blue-100 text-xs sm:text-sm">Update your course banner image</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                        >
                            <FaTimes className="text-sm" />
                        </button>
                    </div>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {/* Current Image Section */}
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Current Image</h3>
                        <div className="relative group">
                            <img
                                src={currentImage || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop'}
                                alt="Current course image"
                                className="w-full h-32 sm:h-48 object-cover rounded-xl border border-gray-200 shadow-lg"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop';
                                }}
                            />
                        </div>
                        {courseData?.courseImage && (
                            <div className="mt-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Image Source:</p>
                                <p className="text-xs text-gray-500 break-all">
                                    {courseData.courseImage}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Upload New Image Section */}
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Upload New Image</h3>

                        <div
                            className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-200 ${dragActive
                                ? 'border-blue-400 bg-blue-50'
                                : 'border-gray-300 hover:border-blue-400'
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                                id="modal-image-upload"
                            />
                            <label htmlFor="modal-image-upload" className="cursor-pointer">
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                        <FaUpload className="text-blue-600 text-lg sm:text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-base sm:text-lg font-medium text-gray-700">
                                            {dragActive ? 'Drop your image here' : 'Click to upload new image'}
                                        </p>
                                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                            PNG, JPG, or WebP up to 2MB
                                        </p>
                                        <p className="text-xs text-gray-400 mt-2">
                                            Or drag and drop your image here
                                        </p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Modal Footer - Fixed at bottom */}
                <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                            {hasNewImage ? "New image ready to upload" : "No changes made"}
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                            <button
                                onClick={onClose}
                                className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 text-sm"
                            >
                                Close
                            </button>
                            {hasNewImage && (
                                <button
                                    onClick={() => {
                                        onClose();
                                        toast.success("Image updated successfully!");
                                    }}
                                    className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm"
                                >
                                    Confirm Update
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default UpdateCourseImage;
