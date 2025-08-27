import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlay, FaPause, FaExpand, FaCompress } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

const VideoPlayerPopup = ({ isOpen, onClose, video }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setIsPlaying(false);
            setCurrentTime(0);
            setDuration(0);
            console.log('Video data:', video);
            console.log('Video URL:', video?.videoUrl || video?.url);
        }
    }, [isOpen, video]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (!isFullscreen) {
                if (videoRef.current.requestFullscreen) {
                    videoRef.current.requestFullscreen();
                } else if (videoRef.current.webkitRequestFullscreen) {
                    videoRef.current.webkitRequestFullscreen();
                } else if (videoRef.current.msRequestFullscreen) {
                    videoRef.current.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
            setIsFullscreen(!isFullscreen);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (e) => {
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const seekTime = (clickX / width) * duration;
            videoRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const modalVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const contentVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-200"
                        >
                            <FaTimes className="text-white text-lg" />
                        </button>

                        {/* Video Container */}
                        <div className="relative">
                            {video?.videoUrl || video?.url ? (
                                <video
                                    ref={videoRef}
                                    src={video?.videoUrl || video?.url}
                                    className="w-full h-auto max-h-[70vh] object-contain"
                                    onTimeUpdate={handleTimeUpdate}
                                    onLoadedMetadata={handleLoadedMetadata}
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    onEnded={() => setIsPlaying(false)}
                                    onError={(e) => {
                                        console.error('Video error:', e);
                                        console.error('Video URL:', video?.videoUrl || video?.url);
                                    }}
                                    controls
                                    preload="metadata"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                                    <div className="text-center">
                                        <FaPlay className="text-gray-400 text-4xl mx-auto mb-4" />
                                        <p className="text-gray-400">Video URL not available</p>
                                        <p className="text-gray-500 text-sm mt-2">Please check the video source</p>
                                    </div>
                                </div>
                            )}

                            {/* Video Controls Overlay */}
                            {(video?.videoUrl || video?.url) && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                    {/* Progress Bar */}
                                    <div
                                        className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-3"
                                        onClick={handleSeek}
                                    >
                                        <div
                                            className="h-full bg-blue-500 rounded-full transition-all duration-200"
                                            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                                        />
                                    </div>

                                    {/* Controls */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={togglePlay}
                                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
                                            >
                                                {isPlaying ? (
                                                    <FaPause className="text-white" />
                                                ) : (
                                                    <FaPlay className="text-white ml-1" />
                                                )}
                                            </button>
                                            <div className="text-white text-sm">
                                                {formatTime(currentTime)} / {formatTime(duration)}
                                            </div>
                                        </div>

                                        <button
                                            onClick={toggleFullscreen}
                                            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
                                        >
                                            {isFullscreen ? (
                                                <FaCompress className="text-white" />
                                            ) : (
                                                <FaExpand className="text-white" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Video Info */}
                        <div className="p-6 bg-gray-900">
                            <h3 className="text-xl font-bold text-white mb-2">{video?.title}</h3>
                            <p className="text-gray-300 text-sm mb-3">{video?.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span>Duration: {formatTime(duration)}</span>
                                <span>Level: {video?.level}</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VideoPlayerPopup;
