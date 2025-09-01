import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaPlay, FaBook, FaTag } from 'react-icons/fa';

const CourseStats = ({ courseMainData, variants }) => {
    return (
        <motion.div className="mb-6" variants={variants}>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Course Details */}
                <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FaUser className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Mentor</p>
                                <p className="font-semibold text-gray-800">{courseMainData?.mentor || 'Dr. Mentor Name'}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <FaPlay className="text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Videos</p>
                                <p className="font-semibold text-gray-800">{courseMainData?.videos?.length || 0}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <FaBook className="text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Quizzes</p>
                                <p className="font-semibold text-gray-800">{courseMainData?.quizzes?.length || 0}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <FaTag className="text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Tags</p>
                                <p className="font-semibold text-gray-800">{courseMainData?.tags?.length || 0}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    {courseMainData?.tags && courseMainData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {courseMainData.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default CourseStats;
