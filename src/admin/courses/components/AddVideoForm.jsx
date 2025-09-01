import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaTimes, FaPlay, FaSave, FaUpload } from 'react-icons/fa';

const AddVideoForm = ({ isOpen, onClose, onSubmit, chapter, courseId, uploadProgress }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [VideoUploadProgress, setVideoUploadProgress] = useState(0);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            duration: 0,
            level: '',
            chapterId: chapter?._id || '',
            courseId: courseId,
            videoFile: null
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Title is required')
                .min(3, 'Title must be at least 3 characters')
                .max(100, 'Title must be less than 100 characters'),
            description: Yup.string()
                .required('Description is required')
                .min(10, 'Description must be at least 10 characters')
                .max(500, 'Description must be less than 500 characters'),
            duration: Yup.number()
                .required('Duration is required')
                .min(1, 'Duration must be at least 1 minute')
                .max(480, 'Duration cannot exceed 8 hours'),
            level: Yup.string()
                .required('Level is required'),
            videoFile: Yup.mixed()
                .required('Video file is required')
        }),
        onSubmit: async (values) => {

            const needeData = {
                ...values,
                courseId: courseId,
                chapterId: chapter?._id
            }

            await onSubmit(needeData);
            formik.resetForm();
            setSelectedFile(null);
            setVideoUploadProgress(0);
        }
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            formik.setFieldValue('videoFile', file);

            // Simulate upload progress
            setVideoUploadProgress(0);
            const interval = setInterval(() => {
                setVideoUploadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);
        }
    };

    const handleClose = () => {
        formik.resetForm();
        setSelectedFile(null);
        setVideoUploadProgress(0);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bottom-[-25px] bg-[#00000063] z-40"
                    />

                    {/* Side Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <FaPlay className="text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Add Video</h3>
                                        <p className="text-sm text-gray-600">
                                            {chapter ? `Add to: ${chapter.title}` : 'Select a chapter first'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    <FaTimes className="text-lg" />
                                </button>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="p-6 space-y-6">
                            <form onSubmit={formik.handleSubmit} className="space-y-6">
                                {/* Title */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                        Video Title *
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.title}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 ${formik.touched.title && formik.errors.title
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        placeholder="Enter video title"
                                    />
                                    {formik.touched.title && formik.errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.description}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 resize-none ${formik.touched.description && formik.errors.description
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        placeholder="Describe what this video covers..."
                                    />
                                    {formik.touched.description && formik.errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
                                    )}
                                </div>

                                {/* Duration */}
                                <div>
                                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                                        Duration (minutes) *
                                    </label>
                                    <input
                                        id="duration"
                                        name="duration"
                                        type="number"
                                        min="1"
                                        max="480"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.duration}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 ${formik.touched.duration && formik.errors.duration
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        placeholder="Enter duration in minutes"
                                    />
                                    {formik.touched.duration && formik.errors.duration && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.duration}</p>
                                    )}
                                </div>

                                {/* Level */}
                                <div>
                                    <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                                        Level *
                                    </label>
                                    <select
                                        id="level"
                                        name="level"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.level}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 ${formik.touched.level && formik.errors.level
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        <option value="">Select a level</option>
                                        <option value="entry">Entry</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                    {formik.touched.level && formik.errors.level && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.level}</p>
                                    )}
                                </div>

                                {/* File Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Video File *
                                    </label>
                                    <div className="space-y-3">
                                        {/* File Input */}
                                        <div className="relative">
                                            <input
                                                id="videoFile"
                                                name="videoFile"
                                                type="file"
                                                accept="video/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="videoFile"
                                                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors duration-200"
                                            >
                                                <div className="text-center">
                                                    <FaUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-medium text-green-600 hover:text-green-500">
                                                            Click to upload
                                                        </span>{' '}
                                                        or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        MP4, WebM, or MOV (max 500MB)
                                                    </p>
                                                </div>
                                            </label>
                                        </div>

                                        {/* Selected File Display */}
                                        {selectedFile && (
                                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <FaPlay className="text-green-600" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-green-800 truncate">
                                                                {selectedFile.name}
                                                            </p>
                                                            <p className="text-xs text-green-600">
                                                                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedFile(null);
                                                            formik.setFieldValue('videoFile', null);
                                                            setVideoUploadProgress(0);
                                                        }}
                                                        className="p-1 text-red-400 hover:text-red-600 transition-colors duration-200"
                                                        title="Remove file"
                                                    >
                                                        <FaTimes className="text-sm" />
                                                    </button>
                                                </div>

                                                {/* Upload Progress */}
                                                {VideoUploadProgress > 0 && VideoUploadProgress < 100 && (
                                                    <div className="mt-3">
                                                        <div className="flex justify-between text-xs text-green-600 mb-1">
                                                            <span>Uploading...</span>
                                                            <span>{VideoUploadProgress}%</span>
                                                        </div>
                                                        <div className="w-full bg-green-200 rounded-full h-2">
                                                            <div
                                                                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                                                style={{ width: `${VideoUploadProgress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {VideoUploadProgress === 100 && (
                                                    <div className="mt-2 text-xs text-green-600 flex items-center space-x-1">
                                                        <span>✓  Ready for Upload</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {formik.touched.videoFile && formik.errors.videoFile && (
                                            <p className="text-sm text-red-600">{formik.errors.videoFile}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4 border-t border-gray-200">
                                    <button
                                        type="submit"
                                        disabled={formik.isSubmitting || !formik.isValid || VideoUploadProgress !== 100}
                                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 relative overflow-hidden"
                                    >
                                        {/* Upload Progress Background */}
                                        {formik.isSubmitting && (
                                            <div
                                                className="absolute inset-0 bg-green-600 transition-all duration-300 ease-out"
                                                style={{ width: `${uploadProgress || 0}%` }}
                                            />
                                        )}

                                        {/* Button Content */}
                                        <div className="relative z-10 flex items-center justify-center space-x-2">
                                            {formik.isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    <span>
                                                        {uploadProgress ? `Uploading... ${uploadProgress}%` : 'Adding Video...'}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaSave className="text-sm" />
                                                    <span>Add Video</span>
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};



export default AddVideoForm;
