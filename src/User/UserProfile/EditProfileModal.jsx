import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    FaTimes,
    FaCamera,
    FaUpload,
    FaUser,
    FaPhone,
    FaSave,
    FaSpinner,
    FaTrash
} from 'react-icons/fa';
import './EditProfileModal.scss';

const EditProfileModal = ({ isOpen, onClose, userData, onSave }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation schema
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must be less than 50 characters')
            .required('Name is required'),
        phone: Yup.string()
            .matches(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number')
            .min(10, 'Phone number must be at least 10 digits')
            .required('Phone number is required'),
        profileImage: Yup.mixed()
            .test('fileSize', 'File size must be less than 5MB', (value) => {
                if (!value) return true; // Not required
                return value.size <= 5 * 1024 * 1024;
            })
            .test('fileType', 'Only image files are allowed', (value) => {
                if (!value) return true; // Not required
                return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(value.type);
            })
            .nullable()
    });

    // Handle image selection
    const handleImageChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setFieldValue('profileImage', file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle clearing the image
    const handleClearImage = (setFieldValue) => {
        setSelectedImage(null);
        setImagePreview(null);
        setFieldValue('profileImage', null);

        // Clear the file input
        const fileInput = document.getElementById('profileImage');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        setIsSubmitting(true);
        try {
            await onSave(values);
            onClose();
            // Reset image states
            setSelectedImage(null);
            setImagePreview(null);
        } catch (error) {
            console.error('Error updating profile:', error);
            setFieldError('general', 'Failed to update profile. Please try again.');
        } finally {
            setIsSubmitting(false);
            setSubmitting(false);
        }
    };

    // Initial values
    const initialValues = {
        name: userData?.name || '',
        phone: userData?.phone || '',
        profileImage: null
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="edit-profile-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="edit-profile-modal"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h2 className="modal-title">Edit Profile</h2>
                            <button
                                className="close-btn"
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="modal-content">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ values, errors, touched, setFieldValue }) => (
                                    <Form className="edit-profile-form">
                                        {/* Profile Image Section */}
                                        <div className="form-section">
                                            <label className="section-label">Profile Picture</label>
                                            <div className="image-upload-section">
                                                <div className="current-image">
                                                    {imagePreview ? (
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="preview-image"
                                                        />
                                                    ) : userData?.profileImage ? (
                                                        <img
                                                            src={userData.profileImage}
                                                            alt="Current"
                                                            className="current-image-preview"
                                                        />
                                                    ) : (
                                                        <div className="image-placeholder">
                                                            <FaUser className="placeholder-icon" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="image-upload-controls">
                                                    <input
                                                        type="file"
                                                        id="profileImage"
                                                        name="profileImage"
                                                        accept="image/*"
                                                        onChange={(e) => handleImageChange(e, setFieldValue)}
                                                        className="file-input"
                                                        disabled={isSubmitting}
                                                    />
                                                    <div className="upload-buttons">
                                                        <label htmlFor="profileImage" className="upload-btn">
                                                            <FaCamera className="upload-icon" />
                                                            <span>Choose Image</span>
                                                        </label>
                                                        {(selectedImage || imagePreview) && (
                                                            <button
                                                                type="button"
                                                                className="clear-btn"
                                                                onClick={() => handleClearImage(setFieldValue)}
                                                                disabled={isSubmitting}
                                                            >
                                                                <FaTrash className="clear-icon" />
                                                                <span>Clear</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                    <p className="upload-hint">
                                                        JPG, PNG or GIF. Max size 5MB
                                                    </p>
                                                </div>
                                            </div>
                                            {errors.profileImage && touched.profileImage && (
                                                <div className="error-message">
                                                    {errors.profileImage}
                                                </div>
                                            )}
                                        </div>

                                        {/* Name Field */}
                                        <div className="form-section">
                                            <label htmlFor="name" className="field-label">
                                                <FaUser className="label-icon" />
                                                Full Name
                                            </label>
                                            <Field
                                                type="text"
                                                id="name"
                                                name="name"
                                                className={`form-input ${errors.name && touched.name ? 'error' : ''}`}
                                                placeholder="Enter your full name"
                                                disabled={isSubmitting}
                                            />
                                            {errors.name && touched.name && (
                                                <div className="error-message">
                                                    {errors.name}
                                                </div>
                                            )}
                                        </div>

                                        {/* Phone Field */}
                                        <div className="form-section">
                                            <label htmlFor="phone" className="field-label">
                                                <FaPhone className="label-icon" />
                                                Phone Number
                                            </label>
                                            <Field
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className={`form-input ${errors.phone && touched.phone ? 'error' : ''}`}
                                                placeholder="Enter your phone number"
                                                disabled={isSubmitting}
                                            />
                                            {errors.phone && touched.phone && (
                                                <div className="error-message">
                                                    {errors.phone}
                                                </div>
                                            )}
                                        </div>

                                        {/* General Error */}
                                        {errors.general && (
                                            <div className="general-error">
                                                {errors.general}
                                            </div>
                                        )}

                                        {/* Form Actions */}
                                        <div className="form-actions">
                                            <button
                                                type="button"
                                                className="cancel-btn"
                                                onClick={onClose}
                                                disabled={isSubmitting}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="save-btn"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <FaSpinner className="spinner" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaSave className="save-icon" />
                                                        Save Changes
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EditProfileModal;
