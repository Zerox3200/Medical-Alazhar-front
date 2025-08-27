import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    FaTimes,
    FaUpload,
    FaPlay,
    FaClock,
    FaUserGraduate,
    FaFileAlt,
    FaCheckCircle,
    FaExclamationTriangle
} from 'react-icons/fa';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';


const validationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must not exceed 100 characters'),
    duration: Yup.number()
        .required('Duration is required')
        .positive('Duration must be positive')
        .integer('Duration must be a whole number')
        .max(999, 'Duration must not exceed 999 minutes'),
    level: Yup.string()
        .required('Level is required')
        .oneOf(['entry', 'intermediate', 'advanced'], 'Please select a valid level'),
    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must not exceed 500 characters'),
    videoFile: Yup.mixed()
        .required('Video file is required')
        .test('fileSize', 'File size must be less than 400MB', (value) => {
            if (!value) return true;
            return value.size <= 400 * 1024 * 1024; // 400MB
        })
        .test('fileType', 'Only video files are allowed', (value) => {
            if (!value) return true;
            return ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv'].includes(value.type);
        })
});


const VideoUploadForm = ({ isOpen, onClose, onSubmit, isLoading = false, refetch }) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const { courseId } = useParams();


    const HandleSubmit = async (values) => {
        try {
            setIsUploading(true);


            const videoData = {
                ...values,
                courseId
            };
            const response = await onSubmit(videoData, setUploadProgress);

            if (response?.data?.success) {
                formik.resetForm();
                setSelectedFile(null);
                setFilePreview(null);
                setUploadProgress(0);
                await refetch();
                toast.success('Video uploaded successfully');
                onClose();
            }

        } catch (error) {
            console.error('Error uploading video:', error);
        } finally {
            setIsUploading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            duration: '',
            level: '',
            description: '',
            videoFile: null
        },
        validationSchema,
        onSubmit: HandleSubmit
    });


    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            handleFileSelect(file);
        }
    };

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        formik.setFieldValue('videoFile', file);

        // Create preview for video
        if (file.type.startsWith('video/')) {
            const url = URL.createObjectURL(file);
            setFilePreview(url);
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setFilePreview(null);
        formik.setFieldValue('videoFile', null);
        if (filePreview) {
            URL.revokeObjectURL(filePreview);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const levelOptions = [
        { value: 'entry', label: 'Entry Level', description: 'Beginner friendly content' },
        { value: 'intermediate', label: 'Intermediate', description: 'Some prior knowledge required' },
        { value: 'advanced', label: 'Advanced', description: 'Expert level content' }
    ];

    const modalVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const contentVariants = {
        hidden: { opacity: 0, x: 400 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <FaPlay className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">Upload Video</h2>
                                    <p className="text-sm text-gray-600">Add a new video</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-sm"
                            >
                                <FaTimes className="text-gray-600" />
                            </button>
                        </div>

                        {/* Form Content */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
                            <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-6">
                                {/* Video Upload Section */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Video File
                                    </label>
                                    <div
                                        className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-all duration-200 ${dragActive
                                            ? 'border-blue-500 bg-blue-50'
                                            : formik.errors.videoFile && formik.touched.videoFile
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        {selectedFile ? (
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-center space-x-3">
                                                    <FaCheckCircle className="text-green-500 text-xl" />
                                                    <div className="text-left">
                                                        <p className="font-semibold text-gray-800">{selectedFile.name}</p>
                                                        <p className="text-sm text-gray-600">{formatFileSize(selectedFile.size)}</p>
                                                    </div>
                                                </div>
                                                {filePreview && (
                                                    <video
                                                        src={filePreview}
                                                        className="w-full max-w-xs mx-auto rounded-lg"
                                                        controls
                                                        preload="metadata"
                                                    />
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={removeFile}
                                                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                                                >
                                                    Remove File
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                                    <FaUpload className="text-gray-400 text-2xl" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-semibold text-gray-700 mb-2">
                                                        Drop your video here
                                                    </p>
                                                    <p className="text-sm text-gray-600 mb-4">
                                                        or click to browse files
                                                    </p>
                                                    <input
                                                        type="file"
                                                        accept="video/*"
                                                        onChange={handleFileInput}
                                                        className="hidden"
                                                        id="video-upload"
                                                    />
                                                    <label
                                                        htmlFor="video-upload"
                                                        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                                                    >
                                                        <FaUpload className="text-sm" />
                                                        <span>Choose Video</span>
                                                    </label>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    <p>Supported formats: MP4, AVI, MOV, WMV, FLV</p>
                                                    <p>Maximum file size: 400MB</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {formik.errors.videoFile && formik.touched.videoFile && (
                                        <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                                            <FaExclamationTriangle />
                                            <span>{formik.errors.videoFile}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Title */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Video Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${formik.errors.title && formik.touched.title
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-300'
                                            }`}
                                        placeholder="Enter video title..."
                                    />
                                    {formik.errors.title && formik.touched.title && (
                                        <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                                            <FaExclamationTriangle />
                                            <span>{formik.errors.title}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Duration and Level Row */}
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Duration (minutes)
                                        </label>
                                        <div className="relative">
                                            <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="number"
                                                id="duration"
                                                name="duration"
                                                value={formik.values.duration}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${formik.errors.duration && formik.touched.duration
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-300'
                                                    }`}
                                                placeholder="35"
                                                min="1"
                                                max="999"
                                            />
                                        </div>
                                        {formik.errors.duration && formik.touched.duration && (
                                            <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                                                <FaExclamationTriangle />
                                                <span>{formik.errors.duration}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="level" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Difficulty Level
                                        </label>
                                        <div className="relative">
                                            <FaUserGraduate className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <select
                                                id="level"
                                                name="level"
                                                value={formik.values.level}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none ${formik.errors.level && formik.touched.level
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-300'
                                                    }`}
                                            >
                                                <option value="">Select level</option>
                                                {levelOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                        {formik.errors.level && formik.touched.level && (
                                            <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                                                <FaExclamationTriangle />
                                                <span>{formik.errors.level}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <div className="relative">
                                        <FaFileAlt className="absolute left-3 top-3 text-gray-400" />
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            rows="4"
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${formik.errors.description && formik.touched.description
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-gray-300'
                                                }`}
                                            placeholder="Enter video description..."
                                        />
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        {formik.errors.description && formik.touched.description && (
                                            <div className="flex items-center space-x-2 text-red-600 text-sm">
                                                <FaExclamationTriangle />
                                                <span>{formik.errors.description}</span>
                                            </div>
                                        )}
                                        <div className="text-xs text-gray-500 ml-auto">
                                            {formik.values.description.length}/500
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                            {/* Upload Progress */}
                            {isUploading && (
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Uploading video...</span>
                                        <span className="text-blue-600 font-medium">{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <motion.div
                                            className="bg-blue-500 h-2 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${uploadProgress}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={formik.handleSubmit}
                                disabled={isLoading || isUploading || !formik.isValid}
                                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                {isLoading || isUploading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>{isUploading ? `Uploading... ${uploadProgress}%` : 'Uploading...'}</span>
                                    </>
                                ) : (
                                    <>
                                        <FaUpload className="text-sm" />
                                        <span>Upload Video</span>
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isUploading}
                                className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VideoUploadForm;
