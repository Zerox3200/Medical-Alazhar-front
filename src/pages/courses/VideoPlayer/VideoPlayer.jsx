import React, { useState, useEffect, useRef } from 'react'
import './VideoPlayer.scss'
import { useParams, useNavigate } from 'react-router'
import { useQuery } from 'react-query'
import { CoursesRequests } from '../../../Api/apiRequests'
import Loader from '../../../components/Loader'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FaPlay,
    FaPause,
    FaVolumeUp,
    FaVolumeMute,
    FaExpand,
    FaCompress,
    FaChevronLeft,
    FaChevronRight,
    FaClock,
    FaBook,
    FaVideo,
    FaCheckCircle,
    FaLock,
    FaArrowLeft,
    FaChevronDown,
    FaChevronUp
} from 'react-icons/fa'

export default function VideoPlayer() {
    const { courseId, videoId } = useParams()
    const navigate = useNavigate()
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [showControls, setShowControls] = useState(true)
    const [expandedSections, setExpandedSections] = useState(new Set())
    const [currentVideo, setCurrentVideo] = useState(null)
    const [allVideos, setAllVideos] = useState([])

    // Fetch course data
    const { data: course, isLoading } = useQuery({
        queryKey: ['course', courseId],
        queryFn: async () => {
            const response = await CoursesRequests.getCourseByIdForUser(courseId)
            return response?.course
        },
    })

    // Extract all videos and find current video
    useEffect(() => {
        if (course) {
            const videos = []
            course.sections?.forEach(section => {
                section.chapters?.forEach(chapter => {
                    chapter.videos?.forEach(video => {
                        videos.push({
                            ...video,
                            sectionTitle: section.title,
                            chapterTitle: chapter.title,
                            sectionId: section._id,
                            chapterId: chapter._id
                        })
                    })
                })
            })
            setAllVideos(videos)

            const video = videos.find(v => v._id === videoId)
            setCurrentVideo(video)
        }
    }, [course, videoId])

    // Video player controls
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime)
        }
    }

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration)
        }
    }

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const newTime = (clickX / rect.width) * duration
        if (videoRef.current) {
            videoRef.current.currentTime = newTime
            setCurrentTime(newTime)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume)
        if (videoRef.current) {
            videoRef.current.volume = newVolume
        }
    }

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen()
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        }
        setIsFullscreen(!isFullscreen)
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const navigateToVideo = (newVideoId) => {
        navigate(`/courses/${courseId}/video/${newVideoId}`)
    }

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev)
            if (newSet.has(sectionId)) {
                newSet.delete(sectionId)
            } else {
                newSet.add(sectionId)
            }
            return newSet
        })
    }

    // Auto-hide controls
    useEffect(() => {
        let timeout
        const resetTimeout = () => {
            clearTimeout(timeout)
            setShowControls(true)
            timeout = setTimeout(() => setShowControls(false), 3000)
        }

        if (isPlaying) {
            resetTimeout()
        }

        return () => clearTimeout(timeout)
    }, [isPlaying, currentTime])

    if (isLoading) return <Loader />

    if (!currentVideo) {
        return (
            <div className="video-player-error">
                <h2>Video not found</h2>
                <button onClick={() => navigate(`/courses/${courseId}`)}>
                    Back to Course
                </button>
            </div>
        )
    }

    return (
        <div className="video-player-page">
            <div className="video-player-container">
                {/* Header */}
                <div className="video-header">
                    <button
                        className="back-button"
                        onClick={() => navigate(`/courses/${courseId}`)}
                    >
                        <FaArrowLeft />
                        Back to Course
                    </button>
                    <div className="video-info">
                        <h1>{currentVideo.title}</h1>
                        <p>{currentVideo.sectionTitle} • {currentVideo.chapterTitle}</p>
                    </div>
                </div>

                <div className="video-content">
                    {/* Main Video Player */}
                    <div className="main-video">
                        <div className="video-wrapper">
                            <video
                                ref={videoRef}
                                src={currentVideo.url}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onMouseMove={() => setShowControls(true)}
                                onMouseLeave={() => {
                                    if (isPlaying) {
                                        setTimeout(() => setShowControls(false), 3000)
                                    }
                                }}
                                className="video-element"
                            />

                            {/* Video Controls Overlay */}
                            <AnimatePresence>
                                {showControls && (
                                    <motion.div
                                        className="video-controls"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Progress Bar */}
                                        <div className="progress-container" onClick={handleSeek}>
                                            <div
                                                className="progress-bar"
                                                style={{ width: `${(currentTime / duration) * 100}%` }}
                                            />
                                        </div>

                                        {/* Control Buttons */}
                                        <div className="controls-row">
                                            <div className="left-controls">
                                                <button className="control-btn" onClick={togglePlay}>
                                                    {isPlaying ? <FaPause /> : <FaPlay />}
                                                </button>

                                                <div className="time-display">
                                                    {formatTime(currentTime)} / {formatTime(duration)}
                                                </div>
                                            </div>

                                            <div className="right-controls">
                                                <div className="volume-control">
                                                    <button className="control-btn" onClick={toggleMute}>
                                                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                                                    </button>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="1"
                                                        step="0.1"
                                                        value={isMuted ? 0 : volume}
                                                        onChange={handleVolumeChange}
                                                        className="volume-slider"
                                                    />
                                                </div>

                                                <button className="control-btn" onClick={toggleFullscreen}>
                                                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Video Description */}
                        <div className="video-description">
                            <h3>About this video</h3>
                            <p>{currentVideo.description}</p>
                            <div className="video-meta">
                                <span className="video-level">{currentVideo.level}</span>
                                <span className="video-duration">
                                    <FaClock />
                                    {Math.floor(currentVideo.duration / 60)}m {currentVideo.duration % 60}s
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Video Sidebar */}
                    <div className="video-sidebar">
                        <div className="sidebar-header">
                            <h3>Course Content</h3>
                            <span className="video-count">{allVideos.length} videos</span>
                        </div>

                        <div className="video-list">
                            {course?.sections?.map((section, sectionIndex) => (
                                <div key={section._id} className="section-group">
                                    <div
                                        className="section-header"
                                        onClick={() => toggleSection(section._id)}
                                    >
                                        <div className="section-info">
                                            <span className="section-number">{sectionIndex + 1}</span>
                                            <div>
                                                <h4>{section.title}</h4>
                                                <span className="section-video-count">
                                                    {section.chapters?.reduce((acc, chapter) =>
                                                        acc + (chapter.videos?.length || 0), 0)} videos
                                                </span>
                                            </div>
                                        </div>
                                        {expandedSections.has(section._id) ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>

                                    <AnimatePresence>
                                        {expandedSections.has(section._id) && (
                                            <motion.div
                                                className="section-content"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {section.chapters?.map((chapter, chapterIndex) => (
                                                    <div key={chapter._id} className="chapter-group">
                                                        <div className="chapter-header">
                                                            <h5>{chapter.title}</h5>
                                                        </div>
                                                        <div className="chapter-videos">
                                                            {chapter.videos?.map((video, videoIndex) => (
                                                                <div
                                                                    key={video._id}
                                                                    className={`video-item ${video._id === videoId ? 'active' : ''}`}
                                                                    onClick={() => navigateToVideo(video._id)}
                                                                >
                                                                    <div className="video-thumbnail">
                                                                        <FaPlay className="play-icon" />
                                                                    </div>
                                                                    <div className="video-info">
                                                                        <h6>{video.title}</h6>
                                                                        <div className="video-meta">
                                                                            <span className="duration">
                                                                                <FaClock />
                                                                                {Math.floor(video.duration / 60)}m {video.duration % 60}s
                                                                            </span>
                                                                            {video.level && (
                                                                                <span className="level">{video.level}</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    {video._id === videoId && (
                                                                        <FaCheckCircle className="current-indicator" />
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
