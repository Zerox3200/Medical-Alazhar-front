import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router';
import { CoursesRequests, QuizesRequests } from '../../Api/apiRequests';
import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import Loader from '../../components/Loader';
import {
    FaPlay,
    FaBook,
    FaFolder,
    FaList,
    FaEdit,
    FaTrash,
    FaDollarSign,
    FaLock,
    FaUnlock,
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// Import new components
import SectionsManager from './components/SectionsManager';
import CourseHeader from './components/CourseHeader';
import CourseStats from './components/CourseStats';
import VideoPlayerPopup from '../components/VideoPlayerPopup';
import CoursePricingForm from './components/CoursePricingForm';

export default function CourseVedios() {
    const { courseId } = useParams();
    const [Token] = useCookies(['Al-Azhar']);
    const [activeTab, setActiveTab] = useState('sections');
    const [isPaidCourse, setIsPaidCourse] = useState(false); // UI state for paid course toggle

    const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const getCourseMainData = async () => {
        const response = await CoursesRequests.getCourseById(courseId, Token['Al-Azhar']);
        return response?.data?.course;
    };

    const { data: courseMainData, isLoading: courseMainDataLoading, refetch } = useQuery("get course main data", getCourseMainData, {
        enabled: !!courseId && !!Token['Al-Azhar']
    });

    // Synchronize isPaidCourse state with actual course data
    useEffect(() => {
        if (courseMainData) {
            setIsPaidCourse(courseMainData.paid || false);
        }
    }, [courseMainData]);

    const handleDeleteQuiz = async (quizId) => {
        try {
            const response = await QuizesRequests.deleteQuiz(quizId, Token['Al-Azhar']);
            if (response?.success) {
                toast.success('Quiz deleted successfully');
                refetch();
            } else {
                toast.error('Failed to delete quiz');
            }
        } catch (error) {
            console.error('Error deleting quiz:', error);
            toast.error('Failed to delete quiz');
        }
    };

    const handleSavePricing = async (pricingData) => {

        console.log('Saving course pricing:', pricingData);

        const neededData = {
            paid: isPaidCourse,
            price: pricingData.price
        }

        const response = await CoursesRequests.updateCoursePaidStatus(courseId, neededData, Token['Al-Azhar']);

        if (response?.success) {
            toast.success('Course pricing updated successfully');
            refetch();
            handleCancelPricing();
        } else {
            toast.error('Failed to update course pricing');
        }
    };

    const handleMakeCourseFree = async () => {
        const response = await CoursesRequests.updateCoursePaidStatus(courseId, { paid: false, price: 0 }, Token['Al-Azhar']);
        if (response?.success) {
            toast.success('Course be free now');
            refetch();
            handleCancelPricing();
        }
        else {
            toast.error('Failed to make course free');
        }
    }

    const handleCancelPricing = () => {
        // Reset to the actual course status from server
        setIsPaidCourse(courseMainData?.paid || false);
    };

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


    if (courseMainDataLoading) return <Loader />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
            <motion.div
                className="max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                <CourseHeader
                    courseMainData={courseMainData}
                    courseId={courseId}
                    variants={itemVariants}
                />


                <CourseStats
                    courseMainData={courseMainData}
                    variants={itemVariants}
                />

                {/* Paid Course Toggle */}
                <motion.div className="mb-6" variants={itemVariants}>
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                    <FaDollarSign className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">Course Pricing</h3>
                                    <p className="text-sm text-gray-600">Set whether this course is free or paid</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <span className={`text-sm font-medium ${isPaidCourse ? 'text-gray-500' : 'text-green-600'}`}>
                                        Free
                                    </span>
                                    <button
                                        onClick={async () => {
                                            if (isPaidCourse) {
                                                // If currently paid, make it free
                                                await handleMakeCourseFree();
                                            } else {
                                                // If currently free, set to paid mode
                                                setIsPaidCourse(true);
                                            }
                                        }}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                                            ${isPaidCourse ? 'bg-blue-600' : 'bg-gray-200'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 
                                                ${isPaidCourse ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                    <span className={`text-sm font-medium ${isPaidCourse ? 'text-blue-600' : 'text-gray-500'}`}>
                                        Paid
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    {isPaidCourse ? (
                                        <>
                                            <FaLock className="text-blue-500" />
                                            <span className="text-sm text-blue-600 font-medium">Premium Course</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaUnlock className="text-green-500" />
                                            <span className="text-sm text-green-600 font-medium">Free Course</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <CoursePricingForm
                            isPaidCourse={isPaidCourse}
                            onSave={handleSavePricing}
                            onCancel={handleCancelPricing}
                            price={courseMainData?.price}
                        />
                    </div>
                </motion.div>

                <motion.div className="mb-6" variants={itemVariants}>
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-4 sm:p-6 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <FaList className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-800">Course Content</h3>
                                        <p className="text-sm text-gray-600">Organize your course with sections and chapters</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="border-b border-gray-200">
                            <nav className="grid lg:grid-cols-3 grid-cols-1 gap-4  px-6">
                                <button
                                    onClick={() => setActiveTab('sections')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'sections'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <FaFolder className="text-sm" />
                                        <span>Sections & Chapters</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setActiveTab('videos')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'videos'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <FaPlay className="text-sm" />
                                        <span>All Videos</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setActiveTab('quizzes')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'quizzes'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <FaBook className="text-sm" />
                                        <span>All Quizzes</span>
                                    </div>
                                </button>
                            </nav>
                        </div>

                        <div className="p-4 sm:p-6">

                            {activeTab === 'sections' && (
                                <SectionsManager
                                    courseId={courseId}
                                    courseMainData={courseMainData}
                                    refetch={refetch}
                                />
                            )}

                            {activeTab === 'videos' && (
                                <div className="space-y-6">

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-1">All Course Videos</h4>
                                            <p className="text-sm text-gray-600">
                                                {courseMainData?.videos?.length || 0} videos available in this course
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-500">
                                                Total Duration: {courseMainData?.videos?.reduce((total, video) => total + (parseInt(video.duration) || 0), 0)} min
                                            </span>
                                        </div>
                                    </div>


                                    {!courseMainData?.videos || courseMainData.videos.length === 0 ? (
                                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <FaPlay className="text-2xl text-gray-400" />
                                            </div>
                                            <h4 className="text-lg font-semibold text-gray-700 mb-2">No videos yet</h4>
                                            <p className="text-gray-500 mb-4">Add videos to chapters to see them here</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {courseMainData.videos.map((video, index) => (
                                                <motion.div
                                                    key={video._id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
                                                >

                                                    <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50">
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
                                                                <FaPlay className="text-2xl text-blue-600" />
                                                            </div>
                                                        </div>

                                                        {video.level && (
                                                            <div className="absolute top-3 right-3">
                                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${video.level === 'entry' ? 'bg-green-100 text-green-700' :
                                                                    video.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                                        'bg-red-100 text-red-700'
                                                                    }`}>
                                                                    {video.level.charAt(0).toUpperCase() + video.level.slice(1)}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>


                                                    <div className="p-4">
                                                        <h5 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                                                            {video.title}
                                                        </h5>
                                                        {video.description && (
                                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                                {video.description}
                                                            </p>
                                                        )}


                                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                                            <span className="flex items-center space-x-1">
                                                                <FaPlay className="text-xs" />
                                                                <span>{video.duration} min</span>
                                                            </span>
                                                        </div>


                                                        {video.quizId && (
                                                            <div className="mb-3 p-2 bg-purple-50 border border-purple-200 rounded-lg">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center space-x-2">
                                                                        <FaBook className="text-xs text-purple-600" />
                                                                        <span className="text-xs text-purple-700 font-medium">
                                                                            Quiz: {video.quizId.questions?.length || 0} questions
                                                                        </span>
                                                                    </div>
                                                                    <Link
                                                                        to={`/admin/update-quiz/${courseId}/${video.quizId._id}`}
                                                                        className="text-xs text-purple-600 hover:text-purple-800 font-medium underline"
                                                                    >
                                                                        Update Quiz
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        )}


                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedVideo(video);
                                                                    setIsVideoPlayerOpen(true);
                                                                }}
                                                                className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                                                            >
                                                                <FaPlay className="text-xs" />
                                                                <span>Play</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'quizzes' && (
                                <div className="space-y-6">
                                    {/* Quizzes Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-1">All Course Quizzes</h4>
                                            <p className="text-sm text-gray-600">
                                                {courseMainData?.quizzes?.length || 0} quizzes available in this course
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-500">
                                                Total Questions: {courseMainData?.quizzes?.reduce((total, quiz) => total + (quiz.questions?.length || 0), 0)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Quizzes Grid */}
                                    {!courseMainData?.quizzes || courseMainData.quizzes.length === 0 ? (
                                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <FaBook className="text-2xl text-gray-400" />
                                            </div>
                                            <h4 className="text-lg font-semibold text-gray-700 mb-2">No quizzes yet</h4>
                                            <p className="text-gray-500 mb-4">Add quizzes to videos to see them here</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {courseMainData.quizzes.map((quiz, index) => (
                                                <motion.div
                                                    key={quiz._id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
                                                >
                                                    {/* Quiz Header */}
                                                    <div className="relative h-32 bg-gradient-to-br from-purple-50 to-pink-50">
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
                                                                <FaBook className="text-2xl text-purple-600" />
                                                            </div>
                                                        </div>
                                                        {/* Questions Count Badge */}
                                                        <div className="absolute top-3 right-3">
                                                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                                                {quiz.questions?.length || 0} Q
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Quiz Content */}
                                                    <div className="p-4">
                                                        <h5 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                                                            Quiz for: {quiz.videoId?.title || 'Unknown Video'}
                                                        </h5>

                                                        {/* Quiz Details */}
                                                        <div className="space-y-2 mb-3">
                                                            <div className="text-sm text-gray-600">
                                                                <span className="font-medium">Questions:</span> {quiz.questions?.length || 0}
                                                            </div>
                                                            {quiz.questions && quiz.questions.length > 0 && (
                                                                <div className="text-xs text-gray-500">
                                                                    Sample: {quiz.questions[0]?.questionText?.slice(0, 50)}...
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div className="flex items-center space-x-2">
                                                            <Link
                                                                to={`/admin/update-quiz/${courseId}/${quiz._id}`}
                                                                className="flex-1 bg-purple-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                                                            >
                                                                <FaBook className="text-xs" />
                                                                <span>Update Quiz</span>
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDeleteQuiz(quiz._id)}
                                                                className="px-3 py-2 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-lg hover:bg-red-50"
                                                                title="Delete Quiz"
                                                            >
                                                                <FaTrash className="text-sm" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Video Player Popup */}
            <VideoPlayerPopup
                isOpen={isVideoPlayerOpen}
                onClose={() => {
                    setIsVideoPlayerOpen(false);
                    setSelectedVideo(null);
                }}
                video={selectedVideo}
            />
        </div>
    );
}
