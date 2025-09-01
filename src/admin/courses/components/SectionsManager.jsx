import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaFolder, FaList, FaPlay, FaBook, FaEdit, FaTrash, FaEye, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// Import sub-components
import AddSectionForm from './AddSectionForm';
import AddChapterForm from './AddChapterForm';
import AddVideoForm from './AddVideoForm';
import VideoPlayerPopup from '../../components/VideoPlayerPopup';
import { ChaptersRequests, CoursesRequests, CourseVediosRequests, QuizesRequests, SectionsRequests } from '../../../Api/apiRequests';
import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import Loader from '../../../components/Loader';
import UpdateSectionForm from './UpdateSectionForm';
import UpdateVideoForm from './UpdateVideoForm';
import { Link } from 'react-router';

const SectionsManager = ({ courseId, courseMainData, refetch }) => {
    const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
    const [isUpdateSectionOpen, setIsUpdateSectionOpen] = useState(false);
    const [isAddChapterOpen, setIsAddChapterOpen] = useState(false);
    const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
    const [isUpdateVideoOpen, setIsUpdateVideoOpen] = useState(false);
    const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);

    const [selectedVideoData, setSelectedVideoData] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);

    // State for expanded sections and chapters
    const [expandedSections, setExpandedSections] = useState(new Set());
    const [expandedChapters, setExpandedChapters] = useState(new Set());

    const [Token] = useCookies(['Al-Azhar']);

    const getAllSectionsForCourse = async () => {
        const sections = await CoursesRequests.getCourseById(courseId, Token['Al-Azhar']);
        return sections?.data?.course;
    }

    const { data: sectionsData, isLoading, isError, refetch: sectionsRefetch } = useQuery({
        queryKey: ['sections', courseId],
        queryFn: getAllSectionsForCourse,
        enabled: !!courseId
    });

    const sections = sectionsData || [];

    // Toggle section expansion
    const toggleSection = (sectionId) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(sectionId)) {
            newExpanded.delete(sectionId);
        } else {
            newExpanded.add(sectionId);
        }
        setExpandedSections(newExpanded);
    };

    // Toggle chapter expansion
    const toggleChapter = (chapterId) => {
        const newExpanded = new Set(expandedChapters);
        if (newExpanded.has(chapterId)) {
            newExpanded.delete(chapterId);
        } else {
            newExpanded.add(chapterId);
        }
        setExpandedChapters(newExpanded);
    };

    const handleAddSection = async (sectionData) => {
        try {
            const response = await SectionsRequests.addSection(sectionData, Token['Al-Azhar']);
            if (response?.success) {
                setIsAddSectionOpen(false);
                toast.success('Section added successfully');
                sectionsRefetch();
            } else {
                toast.error('Failed to add section');
            }
        } catch (error) {
            console.error('Error adding section:', error);
            toast.error('Failed to add section');
        }
    };

    const handleUpdateSection = async (sectionData) => {
        try {
            const response = await SectionsRequests.updateSection(sectionData, Token['Al-Azhar']);
            if (response?.success) {
                toast.success('Section updated successfully');
                sectionsRefetch();
            } else {
                toast.error('Failed to update section');
            }
        }
        catch (error) {
            console.error('Error updating section:', error);
            toast.error('Failed to update section');
        }
    }

    const handleDeleteSectionRequest = async (sectionId, oldOrder) => {
        const response = await SectionsRequests.deleteSection(courseId, sectionId, Token['Al-Azhar'], oldOrder);
        if (response?.success) {
            toast.success('Section deleted successfully');
            sectionsRefetch();
        } else {
            toast.error('Failed to delete section');
        }
    }

    const handleAddChapter = async (chapterData) => {
        try {
            const neededData = {
                ...chapterData,
                courseId: courseId,
                sectionId: selectedSection?._id,
                order: selectedSection?.chapters?.length + 1
            }

            // API call to create chapter
            const response = await ChaptersRequests.CreateChapter(neededData, Token['Al-Azhar']);
            if (response?.success) {
                setIsAddChapterOpen(false);
                setSelectedSection(null);
                toast.success('Chapter added successfully');
                // Refetch sections data
                sectionsRefetch();
            } else {
                toast.error('Failed to add chapter');
            }

        } catch (error) {
            console.error('Error adding chapter:', error);
            toast.error('Failed to add chapter');
        }
    };

    const [uploadProgress, setUploadProgress] = useState(0);

    const handleAddVideo = async (videoData) => {
        console.log(videoData);

        try {
            // API call to create video
            const response = await CourseVediosRequests.createVedioInsideCourse(videoData, Token['Al-Azhar'], setUploadProgress);
            if (response?.data?.success) {
                setIsAddVideoOpen(false);
                setSelectedChapter(null);
                toast.success('Video added successfully');
                // Refetch sections data
                sectionsRefetch();
            } else {
                toast.error('Failed to add video');
            }
        } catch (error) {
            console.error('Error adding video:', error);
            toast.error('Failed to add video');
        }
    };

    const handleUpdateVideo = async (videoData, chapter) => {
        console.log(videoData);
        setSelectedVideoData(videoData);
        setIsUpdateVideoOpen(true);
        setSelectedChapter(chapter);
    }

    const handleUpdateVideoRequest = async (videoData) => {
        const response = await CourseVediosRequests.updateVedioInsideCourse(videoData, Token['Al-Azhar'], setUploadProgress, selectedChapter._id);

        if (response?.data?.success) {
            toast.success('Video updated successfully');
            setIsUpdateVideoOpen(false);
            setSelectedVideoData(null);
            setUploadProgress(0);
            sectionsRefetch();
        }
        else {
            toast.error('Failed to update video');
        }
    }

    const handlePlayVideo = (video) => {
        setSelectedVideoData(video);
        setIsVideoPlayerOpen(true);
    };

    const handleDeleteChapter = async (sectionId, chapterId) => {
        if (window.confirm('Are you sure you want to delete this chapter? This will also delete all videos and quizzes within it.')) {
            try {
                const response = await SectionsRequests.deleteChapter(chapterId, Token['Al-Azhar']);
                if (response?.success) {
                    toast.success('Chapter deleted successfully');
                    // Refetch sections data
                    sectionsRefetch();
                } else {
                    toast.error('Failed to delete chapter');
                }
            } catch (error) {
                console.error('Error deleting chapter:', error);
                toast.error('Failed to delete chapter');
            }
        }
    };

    const handleDeleteVideo = async (chapterId, videoId) => {
        try {
            const response = await CourseVediosRequests.deleteVedioInsideCourse(videoId, chapterId, Token['Al-Azhar']);
            if (response?.success) {
                toast.success('Video deleted successfully');
                // Refetch sections data
                sectionsRefetch();
            } else {
                toast.error('Failed to delete video');
            }
        } catch (error) {
            console.error('Error deleting video:', error);
            toast.error('Failed to delete video');
        }
    };

    const handleDeleteQuiz = async (sectionId, chapterId, quizId) => {
        if (window.confirm('Are you sure you want to delete this quiz?')) {
            try {
                const response = await QuizesRequests.deleteQuiz(quizId, Token['Al-Azhar']);
                if (response?.success) {
                    toast.success('Quiz deleted successfully');
                    // Refetch sections data
                    sectionsRefetch();
                } else {
                    toast.error('Failed to delete quiz');
                }
            } catch (error) {
                console.error('Error deleting quiz:', error);
                toast.error('Failed to delete quiz');
            }
        }
    };

    // Loading state
    if (isLoading) return <Loader />

    // Error state
    if (isError) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Course Structure</h3>
                    <button
                        onClick={() => setIsAddSectionOpen(true)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                    >
                        <FaPlus className="text-sm" />
                        <span>Add Section</span>
                    </button>
                </div>
                <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-red-500 text-2xl">⚠️</span>
                    </div>
                    <h4 className="text-lg font-semibold text-red-700 mb-2">Error Loading Sections</h4>
                    <p className="text-red-600 mb-4">Failed to load course sections. Please try again.</p>
                    <button
                        onClick={() => refetch()}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                    >
                        <span>Retry</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Add Section Button */}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Course Structure</h3>
                <button
                    onClick={() => setIsAddSectionOpen(true)}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                >
                    <FaPlus className="text-sm" />
                    <span>Add Section</span>
                </button>
            </div>

            {/* Sections List */}
            {sections?.sections?.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaFolder className="text-2xl text-gray-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">No sections yet</h4>
                    <p className="text-gray-500 mb-4">Start by adding your first section to organize your course content</p>
                    <button
                        onClick={() => setIsAddSectionOpen(true)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                    >
                        <FaPlus className="text-sm" />
                        <span>Add First Section</span>
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {sections?.sections?.map((section, sectionIndex) => (
                        <motion.div
                            key={section._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: sectionIndex * 0.1 }}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            {/* Section Header - Clickable to expand */}
                            <div
                                className="p-4 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                                onClick={() => toggleSection(section._id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <motion.div
                                            animate={{ rotate: expandedSections.has(section._id) ? 90 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {expandedSections.has(section._id) ? (
                                                <FaChevronDown className="text-blue-500 text-sm" />
                                            ) : (
                                                <FaChevronRight className="text-blue-500 text-sm" />
                                            )}
                                        </motion.div>
                                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                            <FaFolder className="text-white text-sm" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{section.title}</h4>
                                            <p className="text-sm text-gray-600">{section.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedSection(section);
                                                setIsAddChapterOpen(true);
                                            }}
                                            className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                                            title="Add Chapter"
                                        >
                                            <FaPlus className="text-sm" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedSection(section);
                                                setIsUpdateSectionOpen(true);
                                            }}
                                            className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                                            title="Update Section"
                                        >
                                            <FaEdit className="text-sm" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteSectionRequest(section._id, section.order);
                                            }}
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                                            title="Delete Section"
                                        >
                                            <FaTrash className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Section Content - Animated Expand/Collapse */}
                            <AnimatePresence>
                                {expandedSections.has(section._id) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        {/* Section Videos */}
                                        <div className="p-4 border-b border-gray-200 bg-green-50">
                                            <div className="space-y-3">
                                                {section.videos?.map((video, videoIndex) => (
                                                    <motion.div
                                                        key={video._id}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: videoIndex * 0.05 }}
                                                        className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group"
                                                    >
                                                        {/* Video Header with Thumbnail */}
                                                        <div className="relative h-20 bg-gradient-to-r from-green-50 to-blue-50">
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                                                                    <FaPlay className="text-xs" />
                                                                </div>
                                                            </div>

                                                            {/* Level Badge */}
                                                            {video.level && (
                                                                <div className="absolute top-2 right-2">
                                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${video.level === 'entry' ? 'bg-green-100 text-green-700' :
                                                                        video.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                                            'bg-red-100 text-red-700'
                                                                        }`}>
                                                                        {video.level.charAt(0).toUpperCase() + video.level.slice(1)}
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {/* Duration Badge */}
                                                            {video.duration && (
                                                                <div className="absolute bottom-2 left-2">
                                                                    <span className="px-2 py-1 bg-black bg-opacity-70 text-white text-xs font-medium rounded">
                                                                        {video.duration} min
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Video Content */}
                                                        <div className="p-2">
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div className="flex-1 min-w-0">
                                                                    <h6 className="text-sm font-medium text-gray-800 truncate mb-1 group-hover:text-green-600 transition-colors duration-200">
                                                                        {video.title}
                                                                    </h6>
                                                                    {video.description && (
                                                                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                                                            {video.description}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Video Actions */}
                                                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                                                <div className="flex items-center space-x-1">
                                                                    <button
                                                                        onClick={() => handlePlayVideo(video)}
                                                                        className="p-1 text-gray-400 hover:text-green-500 transition-colors duration-200 rounded hover:bg-green-50"
                                                                        title="Play Video"
                                                                    >
                                                                        <FaPlay className="text-xs" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleUpdateVideo(video, section)}
                                                                        className="p-1 text-gray-400 hover:text-blue-500 transition-colors duration-200 rounded hover:bg-blue-50"
                                                                        title="Edit Video"
                                                                    >
                                                                        <FaEdit className="text-xs" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteVideo(section._id, video._id)}
                                                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded hover:bg-red-50"
                                                                        title="Delete Video"
                                                                    >
                                                                        <FaTrash className="text-xs" />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* Quiz Section */}
                                                            {video.quizId && (
                                                                <div className="mt-2 p-2 bg-purple-50 border border-purple-200 rounded-lg">
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
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Chapters List */}
                                        <div className="p-4">
                                            {section?.chapters?.length === 0 ? (
                                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                        <FaList className="text-xl text-gray-400" />
                                                    </div>
                                                    <h5 className="font-medium text-gray-700 mb-1">No chapters yet</h5>
                                                    <p className="text-sm text-gray-500 mb-3">Add chapters to organize your content</p>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedSection(section);
                                                            setIsAddChapterOpen(true);
                                                        }}
                                                        className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors duration-200"
                                                    >
                                                        <FaPlus className="text-xs" />
                                                        <span>Add Chapter</span>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    {section?.chapters?.map((chapter, chapterIndex) => (
                                                        <motion.div
                                                            key={chapter._id}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: chapterIndex * 0.05 }}
                                                            className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                                                        >
                                                            {/* Chapter Header - Clickable to expand */}
                                                            <div
                                                                className="p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                                                                onClick={() => toggleChapter(chapter._id)}
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center space-x-2">
                                                                        <motion.div
                                                                            animate={{ rotate: expandedChapters.has(chapter._id) ? 90 : 0 }}
                                                                            transition={{ duration: 0.2 }}
                                                                        >
                                                                            {expandedChapters.has(chapter._id) ? (
                                                                                <FaChevronDown className="text-purple-500 text-xs" />
                                                                            ) : (
                                                                                <FaChevronRight className="text-purple-500 text-xs" />
                                                                            )}
                                                                        </motion.div>
                                                                        <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                                                                            <FaList className="text-white text-xs" />
                                                                        </div>
                                                                        <div>
                                                                            <h5 className="font-medium text-gray-800">{chapter.title}</h5>
                                                                            <p className="text-xs text-gray-600">{chapter.description}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center space-x-1">
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setSelectedSection(section);
                                                                                setSelectedChapter(chapter);
                                                                                setIsAddVideoOpen(true);
                                                                            }}
                                                                            className="p-1 text-gray-400 hover:text-green-500 transition-colors duration-200"
                                                                            title="Add Video"
                                                                        >
                                                                            <FaPlay className="text-xs" />
                                                                        </button>
                                                                        <Link
                                                                            to={`/admin/add-quiz/${courseId}`}
                                                                            className="p-1 text-gray-400 hover:text-purple-500 transition-colors duration-200"
                                                                            title="Add Quiz"
                                                                        >
                                                                            <FaBook className="text-xs" />
                                                                        </Link>
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleDeleteChapter(section._id, chapter._id);
                                                                            }}
                                                                            className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                                                                            title="Delete Chapter"
                                                                        >
                                                                            <FaTrash className="text-xs" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Chapter Content - Animated Expand/Collapse */}
                                                            <AnimatePresence>
                                                                {expandedChapters.has(chapter._id) && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: "auto", opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                        className="overflow-hidden border-t border-gray-200"
                                                                    >
                                                                        <div className="p-4 bg-white">
                                                                            {/* Videos */}
                                                                            <div>
                                                                                <h6 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-1">
                                                                                    <FaPlay className="text-xs" />
                                                                                    <span>Videos ({chapter?.videos?.length || 0})</span>
                                                                                </h6>
                                                                                {chapter?.videos?.length === 0 ? (
                                                                                    <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                                                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                                                            <FaPlay className="text-sm text-gray-400" />
                                                                                        </div>
                                                                                        <p className="text-xs text-gray-500 mb-2">No videos yet</p>
                                                                                        <button
                                                                                            onClick={() => {
                                                                                                setSelectedSection(section);
                                                                                                setSelectedChapter(chapter);
                                                                                                setIsAddVideoOpen(true);
                                                                                            }}
                                                                                            className="inline-flex items-center space-x-1 px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors duration-200"
                                                                                        >
                                                                                            <FaPlus className="text-xs" />
                                                                                            <span>Add Video</span>
                                                                                        </button>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                                                        {chapter?.videos?.map((video, videoIndex) => (
                                                                                            <motion.div
                                                                                                key={video._id}
                                                                                                initial={{ opacity: 0, x: -10 }}
                                                                                                animate={{ opacity: 1, x: 0 }}
                                                                                                transition={{ delay: videoIndex * 0.05 }}
                                                                                                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group"
                                                                                            >

                                                                                                <div className="relative h-24 bg-gradient-to-r from-blue-50 to-purple-50">
                                                                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                                                                        <div className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                                                                                                            <FaPlay className="text-sm text-blue-600" />
                                                                                                        </div>
                                                                                                    </div>


                                                                                                    {video.level && (
                                                                                                        <div className="absolute top-2 right-2">
                                                                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${video.level === 'entry' ? 'bg-green-100 text-green-700' :
                                                                                                                video.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                                                                                    'bg-red-100 text-red-700'
                                                                                                                }`}>
                                                                                                                {video.level.charAt(0).toUpperCase() + video.level.slice(1)}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    )}


                                                                                                    {video.duration && (
                                                                                                        <div className="absolute bottom-2 left-2">
                                                                                                            <span className="px-2 py-1 bg-black bg-opacity-70 text-white text-xs font-medium rounded">
                                                                                                                {video.duration} min
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    )}
                                                                                                </div>


                                                                                                <div className="p-3">
                                                                                                    <div className="flex items-start justify-between mb-2">
                                                                                                        <div className="flex-1 min-w-0">
                                                                                                            <h6 className="text-sm font-medium text-gray-800 truncate mb-1 group-hover:text-blue-600 transition-colors duration-200">
                                                                                                                {video.title}
                                                                                                            </h6>
                                                                                                            {video.description && (
                                                                                                                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                                                                                                    {video.description}
                                                                                                                </p>
                                                                                                            )}
                                                                                                        </div>
                                                                                                    </div>


                                                                                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                                                                                        <div className="flex items-center space-x-2">
                                                                                                            <button
                                                                                                                onClick={() => handlePlayVideo(video)}
                                                                                                                className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors duration-200 rounded hover:bg-blue-50"
                                                                                                                title="Play Video"
                                                                                                            >
                                                                                                                <FaPlay className="text-xs" />
                                                                                                            </button>
                                                                                                            <button
                                                                                                                onClick={() => handleUpdateVideo(video, chapter)}
                                                                                                                className="p-1.5 text-gray-400 hover:text-green-500 transition-colors duration-200 rounded hover:bg-green-50"
                                                                                                                title="Edit Video"
                                                                                                            >
                                                                                                                <FaEdit className="text-xs" />
                                                                                                            </button>
                                                                                                        </div>

                                                                                                        <button
                                                                                                            onClick={() => handleDeleteVideo(chapter._id, video._id)}
                                                                                                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded hover:bg-red-50"
                                                                                                            title="Delete Video"
                                                                                                        >
                                                                                                            <FaTrash className="text-xs" />
                                                                                                        </button>
                                                                                                    </div>


                                                                                                    {video.quizId && (
                                                                                                        <div className="mt-2 p-2 bg-purple-50 border border-purple-200 rounded-lg">
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
                                                                                                </div>
                                                                                            </motion.div>
                                                                                        ))}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modals */}
            <AddSectionForm
                isOpen={isAddSectionOpen}
                onClose={() => setIsAddSectionOpen(false)}
                onSubmit={handleAddSection}
                courseId={courseId}
                order={sections?.sections?.length + 1}
            />

            <UpdateSectionForm
                isOpen={isUpdateSectionOpen}
                onClose={() => setIsUpdateSectionOpen(false)}
                onSubmit={handleUpdateSection}
                courseId={courseId}
                sectionData={selectedSection}
            />

            <AddChapterForm
                isOpen={isAddChapterOpen}
                onClose={() => {
                    setIsAddChapterOpen(false);
                    setSelectedSection(null);
                }}
                onSubmit={handleAddChapter}
                section={selectedSection}
                courseId={courseId}
            />

            <AddVideoForm
                isOpen={isAddVideoOpen}
                onClose={() => {
                    setIsAddVideoOpen(false);
                    setSelectedChapter(null);
                }}
                onSubmit={handleAddVideo}
                chapter={selectedChapter}
                courseId={courseId}
                uploadProgress={uploadProgress}
            />

            <UpdateVideoForm
                isOpen={isUpdateVideoOpen}
                onClose={() => setIsUpdateVideoOpen(false)}
                onSubmit={handleUpdateVideoRequest}
                chapter={selectedChapter}
                courseId={courseId}
                uploadProgress={uploadProgress}
                videoData={selectedVideoData}
            />

            <VideoPlayerPopup
                isOpen={isVideoPlayerOpen}
                onClose={() => {
                    setIsVideoPlayerOpen(false);
                    setSelectedVideo(null);
                }}
                video={selectedVideoData}
            />
        </div>
    );
};

export default SectionsManager;
