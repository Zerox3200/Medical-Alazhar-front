import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaTimes, FaFolder, FaSave } from 'react-icons/fa';

const UpdateSectionForm = ({ isOpen, onClose, onSubmit, courseId, sectionData }) => {


    const formik = useFormik({
        initialValues: {
            title: sectionData?.title,
            description: sectionData?.description,
            courseId: courseId
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Title is required')
                .min(3, 'Title must be at least 3 characters')
                .max(100, 'Title must be less than 100 characters'),
            description: Yup.string()
                .required('Description is required')
                .min(10, 'Description must be at least 10 characters')
                .max(500, 'Description must be less than 500 characters')
        }),
        onSubmit: (values) => {
            const neededData = {
                ...values,
                courseId,
                sectionId: sectionData?._id
            }
            onSubmit(neededData);
            onClose();
        },
        enableReinitialize: true
    });

    const handleClose = () => {
        formik.resetForm();
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
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FaFolder className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Update Section</h3>
                                        <p className="text-sm text-gray-600">Update the section</p>
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
                                        Section Title *
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.title}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${formik.touched.title && formik.errors.title
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        placeholder="Enter section title"
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none ${formik.touched.description && formik.errors.description
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        placeholder="Describe what this section covers..."
                                    />
                                    {formik.touched.description && formik.errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
                                    )}
                                </div>


                                {/* Submit Button */}
                                <div className="pt-4 border-t border-gray-200">
                                    <button
                                        type="submit"
                                        disabled={formik.isSubmitting || !formik.isValid}
                                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                    >
                                        <FaSave className="text-sm" />
                                        <span>{formik.isSubmitting ? 'Updating Section...' : 'Update Section'}</span>
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

export default UpdateSectionForm;
