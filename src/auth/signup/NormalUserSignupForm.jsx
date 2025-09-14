import React from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { NormalUserRequests } from '../../Api/apiRequests';
import toast from 'react-hot-toast';

const NormalUserSignupForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const navigate = useNavigate();
    // Validation schema
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must be less than 50 characters')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        phone: Yup.string()
            .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number format')
            .min(10, 'Phone number must be at least 10 digits')
            .required('Phone number is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            )
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const CreateAccount = async (values) => {
        console.log(values);

        try {
            const response = await NormalUserRequests.signup(values);

            if (response.success) {
                toast.success("Account created successfully");
                formik.resetForm();
                navigate("/login");
            }
            else {
                toast.error("Failed to create account");
            }
        }
        catch (error) {
            console.error("Error signing up:", error);
            return
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: CreateAccount
    });

    const inputVariants = {
        focus: {
            scale: 1.02,
            transition: { duration: 0.2 }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Create Your Account
                </h3>
                <p className="text-gray-600 text-sm">
                    Join our platform as a regular user
                </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                    className="space-y-2"
                >
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${formik.touched.name && formik.errors.name
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-300 bg-white'
                                }`}
                            placeholder="Enter your full name"
                        />
                    </div>
                    {formik.touched.name && formik.errors.name && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-600 text-sm flex items-center gap-1"
                        >
                            {formik.errors.name}
                        </motion.p>
                    )}
                </motion.div>

                {/* Email Field */}
                <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                    className="space-y-2"
                >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${formik.touched.email && formik.errors.email
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-300 bg-white'
                                }`}
                            placeholder="Enter your email address"
                        />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-600 text-sm flex items-center gap-1"
                        >
                            {formik.errors.email}
                        </motion.p>
                    )}
                </motion.div>

                {/* Phone Field */}
                <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                    className="space-y-2"
                >
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaPhone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${formik.touched.phone && formik.errors.phone
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-300 bg-white'
                                }`}
                            placeholder="Enter your phone number"
                        />
                    </div>
                    {formik.touched.phone && formik.errors.phone && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-600 text-sm flex items-center gap-1"
                        >
                            {formik.errors.phone}
                        </motion.p>
                    )}
                </motion.div>

                {/* Password Field */}
                <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                    className="space-y-2"
                >
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`block w-full pl-10 pr-12 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${formik.touched.password && formik.errors.password
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-300 bg-white'
                                }`}
                            placeholder="Create a strong password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                                <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                        </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-600 text-sm flex items-center gap-1"
                        >
                            {formik.errors.password}
                        </motion.p>
                    )}
                </motion.div>

                {/* Confirm Password Field */}
                <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                    className="space-y-2"
                >
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`block w-full pl-10 pr-12 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${formik.touched.confirmPassword && formik.errors.confirmPassword
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-300 bg-white'
                                }`}
                            placeholder="Confirm your password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                                <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                        </button>
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-600 text-sm flex items-center gap-1"
                        >
                            {formik.errors.confirmPassword}
                        </motion.p>
                    )}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    disabled={formik.isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${formik.isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                        }`}
                >
                    {formik.isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Creating Account...
                        </div>
                    ) : (
                        'Create Account'
                    )}
                </motion.button>
            </form>

            {/* Login Link */}
            <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                        Sign in here
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default NormalUserSignupForm;
