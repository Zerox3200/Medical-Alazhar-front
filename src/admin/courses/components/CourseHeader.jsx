import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaEye, FaEdit } from 'react-icons/fa';

const CourseHeader = ({ courseMainData, courseId, variants }) => {
    return (
        <>
            {/* Breadcrumb */}
            <motion.div className="mb-6 sm:mb-8" variants={variants}>
                <div className="w-full p-3">
                    <Link to="/admin/all-courses" className='text-gray-500'>courses / </Link>
                    <span className='text-blue-500 font-bold'>{courseMainData?.title} </span>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Course Content</h1>
                            <p className="text-sm sm:text-base text-gray-600">Organize your course with sections and chapters</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                to="/admin/all-courses"
                                className="inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 text-sm sm:text-base"
                            >
                                <FaEye className="text-sm" />
                                <span>Back to Courses</span>
                            </Link>
                            <Link
                                to={`/admin/update-course/${courseId}`}
                                className="inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm sm:text-base"
                            >
                                <FaEdit className="text-sm" />
                                <span>Edit Course</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Course Banner */}
            <motion.div className="mb-6" variants={variants}>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Course Banner */}
                    <div className="relative h-48 sm:h-64">
                        <img
                            src={courseMainData?.courseBanner || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop'}
                            alt={courseMainData?.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${courseMainData?.published
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {courseMainData?.published ? 'Published' : 'Draft'}
                                </span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                {courseMainData?.title || 'Course Title'}
                            </h2>
                            <p className="text-white/90 text-sm sm:text-base line-clamp-2">
                                {courseMainData?.description || 'Course description will appear here'}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default CourseHeader;
