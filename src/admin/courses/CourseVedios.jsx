import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import { CoursesRequests, CourseVediosRequests, QuizesRequests } from '../../Api/apiRequests';
import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import Loader from '../../components/Loader';
import VideoUploadForm from '../components/VideoUploadForm';
import VideoUpdateForm from '../components/VideoUpdateForm';
import VideoPlayerPopup from '../components/VideoPlayerPopup';
import {
    FaPlay,
    FaBook,
    FaUser,
    FaTag,
    FaPlus,
    FaEye,
    FaEdit,
    FaTrash,
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { timeFromMinutes } from '../../helpers/timeFromMinutes';
import { FaLongArrowAltRight } from "react-icons/fa";

export default function CourseVedios() {
    const { courseId } = useParams();
    const [Token] = useCookies(['Al-Azhar']);
    const [isVideoUploadOpen, setIsVideoUploadOpen] = useState(false);
    const [isVideoUpdateOpen, setIsVideoUpdateOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoToUpdate, setVideoToUpdate] = useState(null);

    const getCourseMainData = async () => {
        const response = await CoursesRequests.getCourseById(courseId, Token['Al-Azhar']);
        return response?.data?.course;
    };

    const { data: courseMainData, isLoading: courseMainDataLoading, refetch } = useQuery("get course main data", getCourseMainData, {
        enabled: !!courseId && !!Token['Al-Azhar']
    });

    const handleVideoUpload = async (formData, setUploadProgress) => {
        setIsUploading(true);
        try {
            const response = await CourseVediosRequests.createVedioInsideCourse(formData, Token['Al-Azhar'], setUploadProgress);
            return response;
        } catch (error) {
            console.error('Error uploading video:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleVideoUpdate = async (formData, setUploadProgress) => {
        setIsUploading(true);
        try {
            const response = await CourseVediosRequests.updateVedioInsideCourse(formData, Token['Al-Azhar'], setUploadProgress);
            if (response?.data?.success) {
                await refetch();
                toast.success('Video data updated');
            }
            return response;
        } catch (error) {
            console.error('Error updating video:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteVideo = async (videoId) => {
        try {
            const response = await CourseVediosRequests.deleteVedioInsideCourse(videoId, Token['Al-Azhar']);
            console.log(response);
            if (response?.success) {
                await refetch();
                toast.success('Video deleted');
            }
        } catch (error) {
            console.error('Error deleting video:', error);
            toast.error('Failed to delete video');
        }
    }

    const handlePlayVideo = (video) => {
        setSelectedVideo(video);
        setIsVideoPlayerOpen(true);
    };

    const handleCloseVideoPlayer = () => {
        setIsVideoPlayerOpen(false);
        setSelectedVideo(null);
    };

    const handleEditVideo = (video) => {
        setVideoToUpdate(video);
        setIsVideoUpdateOpen(true);
    };

    const handleCloseVideoUpdate = () => {
        setIsVideoUpdateOpen(false);
        setVideoToUpdate(null);
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

    const handleDeleteQuiz = async (quizId, videoId) => {
        const response = await QuizesRequests.deleteQuiz(quizId, Token['Al-Azhar'], videoId);
        if (response?.success) {
            await refetch();
            toast.success('Quiz deleted');
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (courseMainDataLoading) return <Loader />;

    return <>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
            <motion.div
                className="max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div className="mb-6 sm:mb-8" variants={itemVariants}>
                    <div className="w-full p-3">
                        <Link to="/admin/all-courses" className='text-gray-500'>courses / </Link>
                        <span className='text-blue-500 font-bold'>{courseMainData?.title} </span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-100">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Course Content</h1>
                                <p className="text-sm sm:text-base text-gray-600">Manage videos and quizzes for this course</p>
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

                {/* Course Main Data */}
                <motion.div className="mb-6" variants={itemVariants}>
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

                {/* Course Videos Section */}
                <motion.div className="mb-6" variants={itemVariants}>
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-4 sm:p-6 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <FaPlay className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-800">Course Videos</h3>
                                        <p className="text-sm text-gray-600">Manage video content for this course</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsVideoUploadOpen(true)}
                                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-3 sm:py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 text-sm"
                                >
                                    <FaPlus className="text-sm" />
                                    <span>Add Video</span>
                                </button>
                            </div>
                        </div>

                        <div className="p-4 sm:p-6">
                            {courseMainData?.videos && courseMainData.videos.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {courseMainData.videos.map((video, index) => (
                                        <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200">
                                            <div
                                                className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-all duration-200 relative group"
                                                onClick={() => handlePlayVideo(video)}
                                            >
                                                <FaPlay className="text-gray-400 text-2xl group-hover:text-blue-500 transition-all duration-200" />
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-lg flex items-center justify-center">
                                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <FaPlay className="text-white text-lg ml-1" />
                                                    </div>
                                                </div>
                                            </div>
                                            <h4 className="font-semibold text-gray-800 mb-2">{video.title}</h4>
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video?.description}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">Duration: {timeFromMinutes(video.duration)}</span>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEditVideo(video)}
                                                        className="p-1 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                                                    >
                                                        <FaEdit className="text-sm" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteVideo(video._id)}
                                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                                                    >
                                                        <FaTrash className="text-sm" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaPlay className="text-2xl text-gray-400" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-700 mb-2">No videos yet</h4>
                                    <p className="text-gray-500 mb-4">Start by adding your first video to this course</p>
                                    <button
                                        onClick={() => setIsVideoUploadOpen(true)}
                                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-3 sm:py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                                    >
                                        <FaPlus className="text-sm" />
                                        <span>Add First Video</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Course Quizzes Section */}
                <motion.div className="mb-6" variants={itemVariants}>
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-4 sm:p-6 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                                        <FaBook className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-800">Course Quizzes</h3>
                                        <p className="text-sm text-gray-600">Manage quiz content for this course</p>
                                    </div>
                                </div>
                                <Link to={`/admin/add-quiz/${courseId}`} className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-3 sm:py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors duration-200 text-sm">
                                    <FaPlus className="text-sm" />
                                    <span>Add Quiz</span>
                                </Link>
                            </div>
                        </div>

                        <div className="p-4 sm:p-6">
                            {courseMainData?.quizzes && courseMainData.quizzes.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {courseMainData.quizzes.map((quiz, index) => (
                                        <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                            <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                                                <FaBook className="text-gray-400 text-2xl" />
                                            </div>
                                            <h4 className="font-semibold text-gray-800 mb-2">Quiz {index + 1}</h4>
                                            <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">Video <FaLongArrowAltRight /> <span>{quiz?.videoId?.title}</span>
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">Questions: {quiz?.questions?.length || 0}</span>
                                                <div className="flex space-x-2">
                                                    <Link to={`/admin/update-quiz/${courseId}/${quiz._id}`} className="p-1 text-gray-400 hover:text-blue-500">
                                                        <FaEdit className="text-sm" />
                                                    </Link>
                                                    <button onClick={() => handleDeleteQuiz(quiz._id, quiz.videoId?._id)}
                                                        className="p-1 text-gray-400 hover:text-red-500">
                                                        <FaTrash className="text-sm" />
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaBook className="text-2xl text-gray-400" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-700 mb-2">No quizzes yet</h4>
                                    <p className="text-gray-500 mb-4">Start by adding your first quiz to this course</p>
                                    <Link to={`/admin/add-quiz/${courseId}`} className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-3 sm:py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors duration-200">
                                        <FaPlus className="text-sm" />
                                        <span>Add First Quiz</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Video Upload Form Modal */}
            <VideoUploadForm
                isOpen={isVideoUploadOpen}
                onClose={() => {
                    if (isUploading) return;
                    setIsVideoUploadOpen(false)
                }}
                onSubmit={handleVideoUpload}
                isLoading={isUploading}
                refetch={refetch}
            />

            {/* Video Update Form Modal */}
            <VideoUpdateForm
                isOpen={isVideoUpdateOpen}
                onClose={() => {
                    if (isUploading) return;
                    handleCloseVideoUpdate();
                }}
                onSubmit={handleVideoUpdate}
                isLoading={isUploading}
                refetch={refetch}
                videoData={videoToUpdate}
            />

            {/* Video Player Popup */}
            <VideoPlayerPopup
                isOpen={isVideoPlayerOpen}
                onClose={handleCloseVideoPlayer}
                video={selectedVideo}
            />
        </div>
    </>
}
