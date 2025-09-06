import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaPaperPlane, FaUser, FaComment, FaMapMarkerAlt, FaClock, FaHeadset } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { ContactUsRequests } from '../Api/apiRequests';
import { useSelector } from 'react-redux';

const ContactUs = () => {
    const [Token] = useCookies(['Al-Azhar']);
    const user = useSelector((state) => state.auth.user);

    // Validation schema
    const validationSchema = Yup.object({
        subject: Yup.string()
            .min(5, 'Subject must be at least 5 characters')
            .max(100, 'Subject must not exceed 100 characters')
            .required('Subject is required'),
        description: Yup.string()
            .min(20, 'Description must be at least 20 characters')
            .max(1000, 'Description must not exceed 1000 characters')
            .required('Description is required'),
        phoneNumber: Yup.string()
            .matches(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number')
            .min(10, 'Phone number must be at least 10 digits')
            .max(20, 'Phone number must not exceed 20 characters')
            .required('Phone number is required')
    });

    const SendMessage = async (values) => {
        if (!Token['Al-Azhar']) return toast.error('Please Login to send a message');

        if (user?.role !== "intern") return toast.error('You are not authorized to send a message');

        const neededData = {
            subject: values.subject,
            message: values.description,
            phone: values.phoneNumber
        }

        const response = await ContactUsRequests.sendMessage(neededData, Token['Al-Azhar']);

        if (response?.success) {
            toast.success('Message sent successfully and we will reach out to you soon');
            formik.resetForm();
        } else {
            toast.error(response?.message || 'Failed to send message');
        }
    }


    const formik = useFormik({
        initialValues: {
            subject: '',
            description: '',
            phoneNumber: ''
        },
        validationSchema,
        onSubmit: SendMessage
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-12"
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants} className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mb-6">
                            <FaHeadset className="text-white text-2xl" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Contact Us
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            We're here to help! Send us a message and we'll respond as soon as possible.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
                            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <FaMapMarkerAlt className="text-blue-600 text-lg" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                                            <p className="text-gray-600 leading-relaxed">
                                                Al-Azhar University<br />
                                                Faculty of Medicine<br />
                                                Cairo, Egypt
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                            <FaPhone className="text-emerald-600 text-lg" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                                            <p className="text-gray-600">+20 2 2274 1234</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                            <FaEnvelope className="text-purple-600 text-lg" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                                            <p className="text-gray-600">contact@alazhar-med.edu.eg</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                            <FaClock className="text-orange-600 text-lg" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Hours</h4>
                                            <p className="text-gray-600">
                                                Sunday - Thursday<br />
                                                9:00 AM - 5:00 PM
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div variants={itemVariants} className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
                                    <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
                                </div>

                                <form onSubmit={formik.handleSubmit} className="space-y-6">
                                    {/* Subject Field */}
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                            <FaUser className="inline mr-2 text-blue-600" />
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formik.values.subject}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${formik.touched.subject && formik.errors.subject
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            placeholder="What's this about?"
                                        />
                                        {formik.touched.subject && formik.errors.subject && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-2 text-sm text-red-600 flex items-center"
                                            >
                                                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                                {formik.errors.subject}
                                            </motion.p>
                                        )}
                                    </div>

                                    {/* Phone Number Field */}
                                    <div>
                                        <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                                            <FaPhone className="inline mr-2 text-emerald-600" />
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={formik.values.phoneNumber}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-200 ${formik.touched.phoneNumber && formik.errors.phoneNumber
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            placeholder="+20 10 1234 5678"
                                        />
                                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-2 text-sm text-red-600 flex items-center"
                                            >
                                                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                                {formik.errors.phoneNumber}
                                            </motion.p>
                                        )}
                                    </div>

                                    {/* Description Field */}
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                            <FaComment className="inline mr-2 text-purple-600" />
                                            Message
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={6}
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 resize-none ${formik.touched.description && formik.errors.description
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            placeholder="Tell us more about your inquiry..."
                                        />
                                        <div className="flex justify-between items-center mt-2">
                                            {formik.touched.description && formik.errors.description ? (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-sm text-red-600 flex items-center"
                                                >
                                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                                    {formik.errors.description}
                                                </motion.p>
                                            ) : (
                                                <div></div>
                                            )}
                                            <span className="text-xs text-gray-500">
                                                {formik.values.description.length}/1000
                                            </span>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={formik.isSubmitting || !formik.isValid}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${formik.isSubmitting || !formik.isValid
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl'
                                            }`}
                                    >
                                        {formik.isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Sending Message...</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane className="text-lg" />
                                                <span>Send Message</span>
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactUs;
