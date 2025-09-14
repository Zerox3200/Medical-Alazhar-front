import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaEyeSlash, FaExclamationTriangle } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './FreezeAccountModal.scss';

const FreezeAccountModal = ({ isOpen, onClose, onConfirm, userName, isLoading }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validationSchema = Yup.object({
        reason: Yup.string()
            .required('Freeze reason is required')
            .min(10, 'Reason must be at least 10 characters')
            .max(500, 'Reason must not exceed 500 characters')
    });

    const formik = useFormik({
        initialValues: {
            reason: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                await onConfirm(values.reason);
                formik.resetForm();
                onClose();
            } catch (error) {
                console.error('Error freezing account:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    const handleClose = () => {
        if (!isSubmitting) {
            formik.resetForm();
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="freeze-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                >
                    <motion.div
                        className="freeze-modal-container"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="modal-header">
                            <div className="header-content">
                                <div className="header-icon">
                                    <FaEyeSlash />
                                </div>
                                <div className="header-text">
                                    <h3 className="modal-title">Freeze Account</h3>
                                    <p className="modal-subtitle">
                                        Are you sure you want to freeze <strong>{userName}</strong>'s account?
                                    </p>
                                </div>
                            </div>
                            <button
                                className="close-btn"
                                onClick={handleClose}
                                disabled={isSubmitting}
                            >
                                <FaTimes />
                            </button>
                        </div>


                        {/* Form */}
                        <form onSubmit={formik.handleSubmit} className="freeze-form">
                            <div className="form-group">
                                <label htmlFor="reason" className="form-label">
                                    Freeze Reason <span className="required">*</span>
                                </label>
                                <textarea
                                    id="reason"
                                    name="reason"
                                    value={formik.values.reason}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Please provide a detailed reason for freezing this account..."
                                    className={`form-textarea ${formik.touched.reason && formik.errors.reason ? 'error' : ''}`}
                                    rows={4}
                                    disabled={isSubmitting}
                                />
                                {formik.touched.reason && formik.errors.reason && (
                                    <div className="error-message">
                                        {formik.errors.reason}
                                    </div>
                                )}
                                <div className="character-count">
                                    {formik.values.reason.length}/500 characters
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="modal-actions">
                                <motion.button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={handleClose}
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Cancel
                                </motion.button>

                                <motion.button
                                    type="submit"
                                    className="freeze-btn"
                                    disabled={isSubmitting || !formik.isValid}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isSubmitting ? (
                                        <div className="loading-spinner">
                                            <div className="spinner"></div>
                                            <span>Freezing...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <FaEyeSlash className="btn-icon" />
                                            <span>Freeze Account</span>
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FreezeAccountModal;
