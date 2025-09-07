import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FaDollarSign, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const CoursePricingForm = ({ isPaidCourse, onSave, onCancel, price }) => {

    const pricingValidationSchema = Yup.object({
        price: Yup.number()
            .min(0, 'Price must be at least $0')
            .max(9999.99, 'Price cannot exceed $9,999.99')
            .required('Price is required for paid courses')
    });

    const handleSavePricing = async (values) => {
        await onSave(values);
    }


    const formik = useFormik({
        initialValues: {
            price: price || ''
        },
        validationSchema: pricingValidationSchema,
        onSubmit: handleSavePricing
    });

    return (
        <motion.div
            initial={false}
            animate={{
                height: isPaidCourse ? 'auto' : 0,
                opacity: isPaidCourse ? 1 : 0,
                marginTop: isPaidCourse ? 16 : 0,
                paddingTop: isPaidCourse ? 16 : 0,
                paddingBottom: isPaidCourse ? 16 : 0,
            }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut',
                height: { duration: 0.3, ease: 'easeInOut' },
                opacity: { duration: 0.2, ease: 'easeInOut' }
            }}
            className="overflow-hidden bg-blue-50 border border-blue-200 rounded-xl"
        >
            <div className="px-4">
                <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaDollarSign className="text-blue-600 text-sm" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-semibold text-blue-800 mb-1">Paid Course Settings</h4>
                        <p className="text-sm text-blue-700 mb-4">
                            This course will require payment before students can access the content.
                        </p>

                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div className="max-w-xs">
                                <label className="block text-xs font-medium text-blue-700 mb-1">
                                    Course Price (USD) *
                                </label>
                                <div className="relative">
                                    <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 text-sm" />
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="9999.99"
                                        placeholder="0.00"
                                        {...formik.getFieldProps('price')}
                                        className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors duration-200 ${formik.touched.price && formik.errors.price
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-blue-200'
                                            }`}
                                    />
                                </div>
                                {formik.touched.price && formik.errors.price && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xs text-red-600 mt-1"
                                    >
                                        {formik.errors.price}
                                    </motion.p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={formik.isSubmitting || !formik.isValid}
                                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    <FaSave className="text-xs" />
                                    <span>{formik.isSubmitting ? 'Saving...' : 'Save Price'}</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="inline-flex items-center space-x-2 px-4 py-2 text-gray-600 text-sm font-medium rounded-lg hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                                >
                                    <FaTimes className="text-xs" />
                                    <span>Cancel</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CoursePricingForm;
