import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import {
    FaSearch,
    FaFilter,
    FaEye,
    FaEdit,
    FaTrash,
    FaPlus,
    FaPlay,
    FaBook,
    FaUser,
    FaTag,
    FaEyeSlash,
    FaCheckCircle
} from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlinePublishedWithChanges } from 'react-icons/md';
import { CoursesRequests } from '../../Api/apiRequests';
import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import Loader from '../../components/Loader';
import { toast } from 'react-hot-toast';


const AllCourses = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('title');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const [Token] = useCookies(['Al-Azhar']);

    const getAllCoursesForAdmin = async () => {
        const { data } = await CoursesRequests.getAllCoursesForAdmin(Token['Al-Azhar']);

        return data
    }

    const { data: coursesData, isLoading, refetch } = useQuery("get All Courses For Admin", getAllCoursesForAdmin, {
        cacheTime: 3000
    });


    // Filter and search courses
    const filteredCourses = useMemo(() => {
        if (!coursesData?.courses) return [];

        return coursesData.courses
            .filter(course => {
                const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    course.mentor.toLowerCase().includes(searchTerm.toLowerCase());

                const matchesStatus = filterStatus === 'all' ||
                    (filterStatus === 'published' && course.published) ||
                    (filterStatus === 'draft' && !course.published);

                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case 'title':
                        return a.title.localeCompare(b.title);
                    case 'mentor':
                        return a.mentor.localeCompare(b.mentor);
                    case 'published':
                        return b.published - a.published;
                    case 'videos':
                        return (b.videos?.length || 0) - (a.videos?.length || 0);
                    default:
                        return 0;
                }
            });
    }, [coursesData?.courses, searchTerm, filterStatus, sortBy]);

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

    const deleteCourse = async (courseId) => {
        const { data } = await CoursesRequests.deleteCourse(courseId, Token['Al-Azhar']);
        if (data.success) {
            await refetch()
            toast.success("Course deleted successfully");
        } else {
            toast.error("Failed to delete course");
        }
    }

    const updateCourseStatus = async (courseId, status) => {
        const response = await CoursesRequests.updateCourseStatus(courseId, status, Token['Al-Azhar']);
        if (response?.success) {
            await refetch()
            toast.success("Course status updated successfully");
        } else {
            toast.error(response?.message || "Failed to update course status");
        }
    }


    if (isLoading) return <Loader />

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
            <motion.div
                className="max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div className="mb-6 sm:mb-8" variants={itemVariants}>
                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-100">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">All Courses</h1>
                                <p className="text-sm sm:text-base text-gray-600">Manage and organize your medical education courses</p>
                            </div>
                            <Link
                                to="/admin/add-course"
                                className="inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                            >
                                <FaPlus className="text-sm" />
                                <span>Add New Course</span>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
                            <div className="bg-blue-50 rounded-xl p-3 sm:p-4">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <FaBook className="text-white text-sm sm:text-base" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-lg sm:text-2xl font-bold text-blue-600">{coursesData?.count}</p>
                                        <p className="text-xs sm:text-sm text-blue-700 truncate">Total Courses</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-green-50 rounded-xl p-3 sm:p-4">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                        <FaCheckCircle className="text-white text-sm sm:text-base" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-lg sm:text-2xl font-bold text-green-600">
                                            {coursesData?.publishedCourses}
                                        </p>
                                        <p className="text-xs sm:text-sm text-green-700 truncate">Published</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-yellow-50 rounded-xl p-3 sm:p-4">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                                        <FaEyeSlash className="text-white text-sm sm:text-base" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-lg sm:text-2xl font-bold text-yellow-600">
                                            {coursesData?.unpublishedCourses}
                                        </p>
                                        <p className="text-xs sm:text-sm text-yellow-700 truncate">Unpublished</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Filters and Search */}
                <motion.div className="mb-6" variants={itemVariants}>
                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
                        <div className="flex flex-col gap-4">
                            {/* Search */}
                            <div className="w-full">
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search courses..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                                >
                                    <option value="all">All Status</option>
                                    <option value="published">Published</option>
                                    <option value="draft">Drafts</option>
                                </select>

                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                                >
                                    <option value="title">Sort by Title</option>
                                    <option value="mentor">Sort by Mentor</option>
                                    <option value="published">Sort by Status</option>
                                    <option value="videos">Sort by Videos</option>
                                </select>

                                <div className="flex border border-gray-300 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`flex-1 px-3 py-3 transition-all duration-200 text-sm ${viewMode === 'grid'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        Grid
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`flex-1 px-3 py-3 transition-all duration-200 text-sm ${viewMode === 'list'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        List
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Courses Grid/List */}
                <motion.div variants={itemVariants}>
                    <AnimatePresence mode="wait">
                        {filteredCourses.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100"
                            >
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FaBook className="text-3xl text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
                                <p className="text-gray-500 mb-6">
                                    {searchTerm || filterStatus !== 'all'
                                        ? 'Try adjusting your search or filters'
                                        : 'Get started by creating your first course'
                                    }
                                </p>
                                {!searchTerm && filterStatus === 'all' && (
                                    <Link
                                        to="/admin/add-course"
                                        className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                                    >
                                        <FaPlus className="text-sm" />
                                        <span>Create First Course</span>
                                    </Link>
                                )}
                            </motion.div>
                        ) : (
                            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6' : 'space-y-4'}>
                                {filteredCourses.map((course, index) => (
                                    <motion.div
                                        key={course._id}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: index * 0.1 }}
                                        className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'flex flex-col lg:flex-row' : ''
                                            }`}
                                    >
                                        {/* Course Image */}
                                        <div className={`relative ${viewMode === 'list' ? 'w-full lg:w-48 flex-shrink-0' : ''}`}>
                                            <img
                                                src={course.courseBanner}
                                                alt={course.title}
                                                className={`w-full object-cover ${viewMode === 'list' ? 'h-32 lg:h-full' : 'h-32 sm:h-48'}`}
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop';
                                                }}
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${course.published
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {course.published ? 'Published' : 'Draft'}
                                                </span>
                                            </div>
                                            <div className="absolute top-3 right-3">
                                                <div className="relative group">
                                                    <button className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200">
                                                        <BsThreeDotsVertical className="text-gray-600" />
                                                    </button>
                                                    <div className="absolute top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 sm:right-0 right-0">
                                                        <div className="py-2">
                                                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                                                <FaEdit className="text-gray-400" />
                                                                <span>Edit Course</span>
                                                            </button>
                                                            <button
                                                                onClick={() => updateCourseStatus(course._id, !course.published)}
                                                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                                            >
                                                                <MdOutlinePublishedWithChanges className="text-gray-400" />
                                                                <span>{course.published ? 'Unpublish' : 'Publish'}</span>
                                                            </button>
                                                            <hr className="my-1" />
                                                            <button
                                                                onClick={() => deleteCourse(course._id)}
                                                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                                                            >
                                                                <FaTrash className="text-red-400" />
                                                                <span>Delete Course</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Course Content */}
                                        <div className={`p-4 sm:p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                                {course.title}
                                            </h3>
                                            <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">
                                                {course.description.length > 50
                                                    ? `${course.description.substring(0, 50)}...`
                                                    : course.description
                                                }
                                            </p>

                                            {/* Course Meta */}
                                            <div className="space-y-2 sm:space-y-3">
                                                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                                                    <FaUser className="text-gray-400" />
                                                    <span className="truncate">{course.mentor}</span>
                                                </div>

                                                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                                                    <FaPlay className="text-gray-400" />
                                                    <span>{course.videos?.length || 0} videos</span>
                                                    <span className="mx-1">•</span>
                                                    <FaBook className="text-gray-400" />
                                                    <span>{course.quizzes?.length || 0} quizzes</span>
                                                </div>

                                                {/* Tags */}
                                                {course.tags && course.tags.length > 0 && (
                                                    <div className="flex items-start space-x-2">
                                                        <FaTag className="text-gray-400 text-xs sm:text-sm mt-0.5 flex-shrink-0" />
                                                        <div className="flex flex-wrap gap-1">
                                                            {course.tags.slice(0, 2).map((tag, tagIndex) => (
                                                                <span
                                                                    key={tagIndex}
                                                                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full whitespace-nowrap"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                            {course.tags.length > 2 && (
                                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                                    +{course.tags.length - 2}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-6">
                                                <Link
                                                    to={`/admin/course-videos/${course._id}`}
                                                    className="flex-1 px-3 sm:px-4 py-2 bg-blue-500 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 text-center"
                                                >
                                                    View Course Details
                                                </Link>
                                                <Link
                                                    to={`/admin/update-course/${course._id}`}
                                                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AllCourses;
