import React, { useEffect, useState } from 'react'
import './CourseDetails.scss'
import { useQuery } from 'react-query';
import { CoursesRequests } from '../../../Api/apiRequests';
import Loader from '../../../components/Loader';
import { useParams, useNavigate, Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaPlay,
    FaClock,
    FaBook,
    FaUser,
    FaChevronRight,
    FaUnlock,
    FaVideo,
    FaCrown,
    FaGift,
    FaDownload,
    FaArrowLeft,
    FaChevronRight as FaChevronRightIcon
} from 'react-icons/fa';

export default function CourseDetails() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [expandedSections, setExpandedSections] = useState(new Set());
    const [expandedChapters, setExpandedChapters] = useState(new Set());

    const { data: course, isLoading, isError, refetch } = useQuery({
        queryKey: ['course', courseId],
        queryFn: async () => {
            const response = await CoursesRequests.getCourseByIdForUser(courseId);
            return response?.course;
        },
    });

    useEffect(() => {
        if (courseId) {
            refetch();
        }
    }, [courseId]);

    // Helper functions
    const toggleSection = (sectionId) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionId)) {
                newSet.delete(sectionId);
            } else {
                newSet.add(sectionId);
            }
            return newSet;
        });
    };

    const toggleChapter = (chapterId) => {
        setExpandedChapters(prev => {
            const newSet = new Set(prev);
            if (newSet.has(chapterId)) {
                newSet.delete(chapterId);
            } else {
                newSet.add(chapterId);
            }
            return newSet;
        });
    };

    const formatDuration = (minutes) => {
        if (!minutes) return '0 min';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    // Calculate course statistics
    const getCourseStats = () => {
        if (!course) return { totalVideos: 0, totalDuration: 0, totalSections: 0, totalChapters: 0 };

        const totalVideos = course.sections?.reduce((acc, section) =>
            acc + section.chapters?.reduce((chapterAcc, chapter) =>
                chapterAcc + (chapter.videos?.length || 0), 0), 0) || 0;

        const totalDuration = course.sections?.reduce((acc, section) =>
            acc + section.chapters?.reduce((chapterAcc, chapter) =>
                chapterAcc + (chapter.videos?.reduce((videoAcc, video) =>
                    videoAcc + parseInt(video.duration || 0), 0) || 0), 0), 0) || 0;

        const totalSections = course.sections?.length || 0;
        const totalChapters = course.sections?.reduce((acc, section) =>
            acc + (section.chapters?.length || 0), 0) || 0;

        return { totalVideos, totalDuration, totalSections, totalChapters };
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) return <Loader />

    const stats = getCourseStats();

    return (
        <motion.div className="course-details-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="course-container">
                {/* Breadcrumb Navigation */}
                <div className="breadcrumb-nav">
                    <button
                        className="back-button"
                        onClick={() => navigate('/courses')}
                    >
                        <FaArrowLeft />
                        Back to Courses
                    </button>
                    <div className="breadcrumb-path">
                        <span
                            className="breadcrumb-link"
                            onClick={() => navigate('/courses')}
                        >
                            Courses
                        </span>
                        <FaChevronRightIcon className="breadcrumb-separator" />
                        <span className="breadcrumb-current">
                            {course?.title || 'Course Details'}
                        </span>
                    </div>
                </div>
                {/* Course Header */}
                <div className="course-header">
                    <div className="course-banner">
                        <img src={course?.courseBanner} alt={course?.title} />
                    </div>

                    <div className="course-info">
                        <div className="course-badge">
                            {course?.paid ? (
                                <span className="badge premium">
                                    <FaCrown />
                                    Premium
                                </span>
                            ) : (
                                <span className="badge free">
                                    <FaGift />
                                    Free
                                </span>
                            )}
                        </div>

                        <h1 className="course-title">{course?.title}</h1>
                        <p className="course-description">{course?.description}</p>

                        <div className="course-meta">
                            <div className="instructor">
                                <FaUser />
                                <span>{course?.mentor}</span>
                            </div>

                            <div className="course-stats">
                                <span><FaVideo /> {stats.totalVideos} videos</span>
                                <span><FaClock /> {formatDuration(stats.totalDuration)}</span>
                                <span><FaBook /> {stats.totalSections} sections</span>
                            </div>
                        </div>

                        <div className="course-tags">
                            {course?.tags?.map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="course-content">
                    <div className="main-content">
                        {/* Creative Course Curriculum */}
                        <div className="curriculum-section">
                            <div className="curriculum-header">
                                <h2>Course Journey</h2>
                                <div className="journey-stats">
                                    <div className="stat-item">
                                        <span className="stat-number">{stats.totalSections}</span>
                                        <span className="stat-label">Modules</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">{stats.totalChapters}</span>
                                        <span className="stat-label">Lessons</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">{stats.totalVideos}</span>
                                        <span className="stat-label">Videos</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">{formatDuration(stats.totalDuration)}</span>
                                        <span className="stat-label">Duration</span>
                                    </div>
                                </div>
                            </div>

                            <div className="learning-path">
                                {course?.sections?.map((section, sectionIndex) => (
                                    <motion.div
                                        key={section._id}
                                        className="learning-module"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: sectionIndex * 0.1 }}
                                    >
                                        <div className="module-header">
                                            <div className="module-number">
                                                <span>{sectionIndex + 1}</span>
                                            </div>
                                            <div className="module-info">
                                                <h3>{section.title}</h3>
                                                <p>{section.description}</p>
                                                <div className="module-meta">
                                                    <span className="lesson-count">
                                                        <FaBook />
                                                        {section.chapters?.length || 0} lessons
                                                    </span>
                                                    <span className="module-duration">
                                                        <FaClock />
                                                        {formatDuration(section.chapters?.reduce((acc, chapter) =>
                                                            acc + (chapter.videos?.reduce((videoAcc, video) =>
                                                                videoAcc + parseInt(video.duration || 0), 0) || 0), 0))}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                className="module-toggle"
                                                onClick={() => toggleSection(section._id)}
                                            >
                                                <FaChevronRight className={`chevron ${expandedSections.has(section._id) ? 'expanded' : ''}`} />
                                            </button>
                                        </div>

                                        <AnimatePresence>
                                            {expandedSections.has(section._id) && (
                                                <motion.div
                                                    className="lessons-container"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {section.chapters?.map((chapter, chapterIndex) => (
                                                        <div key={chapter._id} className="lesson-group">
                                                            <div
                                                                className="lesson-header"
                                                                onClick={() => toggleChapter(chapter._id)}
                                                            >
                                                                <div className="lesson-indicator">
                                                                    <div className="lesson-dot"></div>
                                                                    <div className="lesson-line"></div>
                                                                </div>
                                                                <div className="lesson-content">
                                                                    <h4>{chapter.title}</h4>
                                                                    <p>{chapter.description}</p>
                                                                    <div className="lesson-meta">
                                                                        <span className="video-count">
                                                                            <FaVideo />
                                                                            {chapter.videos?.length || 0} videos
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <button className="lesson-toggle">
                                                                    <FaChevronRight className={`chevron ${expandedChapters.has(chapter._id) ? 'expanded' : ''}`} />
                                                                </button>
                                                            </div>

                                                            <AnimatePresence>
                                                                {expandedChapters.has(chapter._id) && (
                                                                    <motion.div
                                                                        className="videos-list"
                                                                        initial={{ opacity: 0, height: 0 }}
                                                                        animate={{ opacity: 1, height: "auto" }}
                                                                        exit={{ opacity: 0, height: 0 }}
                                                                        transition={{ duration: 0.3 }}
                                                                    >
                                                                        {chapter.videos?.map((video, videoIndex) => (
                                                                            <div key={video._id} className="video-lesson">
                                                                                <div className="video-indicator">
                                                                                    <div className="video-dot"></div>
                                                                                    {videoIndex < chapter.videos.length - 1 && <div className="video-line"></div>}
                                                                                </div>
                                                                                <div className="video-content">
                                                                                    <div className="video-thumbnail">
                                                                                        <FaPlay className="play-icon" />
                                                                                    </div>
                                                                                    <div className="video-details">
                                                                                        <h5>{video.title}</h5>
                                                                                        <p>{video.description}</p>
                                                                                        <div className="video-meta">
                                                                                            <span className="video-duration">
                                                                                                <FaClock />
                                                                                                {formatDuration(parseInt(video.duration))}
                                                                                            </span>
                                                                                            {video.level && (
                                                                                                <span className="video-level">{video.level}</span>
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="video-actions">
                                                                                        <Link to={`/courses/${courseId}/video/${video._id}`} className="watch-btn">
                                                                                            <FaPlay />
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="sidebar">
                        <div className="enrollment-card">
                            <div className="price">
                                {course?.paid ? (
                                    <span className="price-amount">${course.price}</span>
                                ) : (
                                    <span className="price-free">Free</span>
                                )}
                            </div>

                            <button className="enroll-button">
                                {course?.paid ? (
                                    <>
                                        <FaCrown />
                                        Enroll Now
                                    </>
                                ) : (
                                    <>
                                        <FaUnlock />
                                        Start Learning
                                    </>
                                )}
                            </button>

                            <div className="course-includes">
                                <h4>This course includes:</h4>
                                <ul>
                                    <li><FaVideo /> {stats.totalVideos} video lectures</li>
                                    <li><FaClock /> {formatDuration(stats.totalDuration)} of content</li>
                                    <li><FaDownload /> Downloadable resources</li>
                                    <li><FaUnlock /> Lifetime access</li>
                                </ul>
                            </div>
                        </div>

                        <div className="course-details-card">
                            <h4>Course Details</h4>
                            <div className="detail-item">
                                <span>Instructor</span>
                                <span>{course?.mentor}</span>
                            </div>
                            <div className="detail-item">
                                <span>Level</span>
                                <span>Intermediate</span>
                            </div>
                            <div className="detail-item">
                                <span>Language</span>
                                <span>English</span>
                            </div>
                            <div className="detail-item">
                                <span>Updated</span>
                                <span>Recently</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
