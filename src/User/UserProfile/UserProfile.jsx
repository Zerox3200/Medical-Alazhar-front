import React, { useState, useMemo } from 'react'
import './UserProfile.scss'
import { useCookies } from 'react-cookie';
import { NormalUserRequests } from '../../Api/apiRequests';
import { useQuery } from 'react-query';
import Loader from '../../components/Loader';
import { motion } from 'framer-motion';
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCrown,
    FaBookOpen,
    FaPlay,
    FaClock,
    FaEdit,
    FaSearch
} from 'react-icons/fa';
import EditProfileModal from './EditProfileModal';
import toast from 'react-hot-toast';

export default function UserProfile() {

    const [Token] = useCookies(['Al-Azhar']);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const getUserProfile = async () => {
        const response = await NormalUserRequests.getUserProfile(Token['Al-Azhar']);
        return response?.data;
    }

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['userProfile'],
        queryFn: getUserProfile,
    });

    const handleEditProfile = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    // Handle saving profile changes
    const handleSaveProfile = async (values) => {
        try {

            const response = await NormalUserRequests.updateUserProfile(values, Token['Al-Azhar']);

            if (response?.success) {
                toast.success('Profile updated successfully');
                refetch();
                handleCloseModal();
            } else {
                toast.error('Failed to update profile');
            }

        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    };

    // Get subscribed courses from API data
    const subscribedCourses = useMemo(() => {
        if (!data?.subscriptions) return [];

        return data.subscriptions.map((subscription, index) => ({
            id: subscription._id,
            title: subscription.title,
            instructor: subscription.mentor,
            thumbnail: subscription.courseBanner,
            description: subscription.description,
            progress: Math.floor(Math.random() * 100), // Mock progress for now
            duration: `${Math.floor(Math.random() * 10) + 2} hours`, // Mock duration
            lastWatched: ["2 days ago", "1 week ago", "3 days ago", "Completed"][Math.floor(Math.random() * 4)]
        }));
    }, [data?.subscriptions]);

    // Filter courses based on search term
    const filteredCourses = useMemo(() => {
        if (!searchTerm.trim()) return subscribedCourses;

        return subscribedCourses.filter(course =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [subscribedCourses, searchTerm]);

    if (isLoading) return <Loader />;

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Profile</h2>
                    <p className="text-gray-600">Please try again later</p>
                </div>
            </div>
        );
    }

    return (
        <div className="user-profile-page">
            <div className="container mx-auto px-4 py-8">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="profile-header"
                >
                    <div className="profile-card">
                        <div className="profile-avatar">
                            {data?.profileImage ? (
                                <img
                                    src={data.profileImage}
                                    alt={data.name}
                                    className="avatar-image"
                                />
                            ) : (
                                <div className="avatar-placeholder">
                                    <FaUser className="avatar-icon" />
                                </div>
                            )}
                        </div>

                        <div className="profile-info">
                            <div className="profile-name-section">
                                <h1 className="profile-name">{data?.name || 'User Name'}</h1>
                                <div className="role-badge">
                                    <FaCrown className="role-icon" />
                                    <span>{data?.role || 'user'}</span>
                                </div>
                            </div>

                            <div className="profile-details">
                                <div className="detail-item">
                                    <FaEnvelope className="detail-icon" />
                                    <span className="detail-label">Email:</span>
                                    <span className="detail-value">{data?.email || 'user@example.com'}</span>
                                </div>

                                <div className="detail-item">
                                    <FaPhone className="detail-icon" />
                                    <span className="detail-label">Phone:</span>
                                    <span className="detail-value">{data?.phone || '+1234567890'}</span>
                                </div>
                            </div>

                            <button className="edit-profile-btn" onClick={handleEditProfile}>
                                <FaEdit className="btn-icon" />
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* My Courses Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="courses-section"
                >
                    <div className="section-header">
                        <h2 className="section-title">
                            <FaBookOpen className="title-icon" />
                            My Courses
                        </h2>
                        <p className="section-subtitle">
                            Continue your learning journey
                        </p>
                    </div>

                    {/* Search Bar */}
                    {subscribedCourses.length > 0 && (
                        <div className="search-section">
                            <div className="search-container">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search courses by name or instructor..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="clear-search-btn"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                            {searchTerm && (
                                <p className="search-results">
                                    {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
                                </p>
                            )}
                        </div>
                    )}

                    <div className="courses-list">
                        {filteredCourses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="course-list-item"
                            >
                                <div className="course-thumbnail">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="thumbnail-image"
                                    />
                                    <div className="course-overlay">
                                        <div className="play-button">
                                            <FaPlay className="play-icon" />
                                        </div>
                                    </div>


                                    {/* Progress Bar */}
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>

                                </div>

                                <div className="course-content">
                                    <div className="course-header">
                                        <h3 className="course-title">{course.title}</h3>
                                        <p className="course-instructor">by {course.instructor}</p>
                                    </div>

                                    {/* Course Description */}
                                    <div className="course-description">
                                        <p className="description-text">{course.description}</p>
                                    </div>

                                    {/* Course Meta */}
                                    <div className="course-meta">
                                        <div className="meta-item">
                                            <span className="last-watched">{course.lastWatched}</span>
                                        </div>
                                    </div>

                                    {/* Progress Section */}
                                    <div className="course-progress">
                                        <div className="progress-info">
                                            <span className="progress-text">
                                                Progress: {course.progress}%
                                            </span>
                                            <span className="progress-percentage">
                                                {course.progress}%
                                            </span>
                                        </div>
                                        <div className="progress-bar-inline">
                                            <div
                                                className="progress-fill-inline"
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                        <button className="continue-learning-btn">
                                            {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredCourses.length === 0 && (
                        <div className="empty-state">
                            <FaBookOpen className="empty-icon" />
                            <h3 className="empty-title">No Courses Yet</h3>
                            <p className="empty-description">
                                Start your learning journey by enrolling in courses
                            </p>
                            <button className="browse-courses-btn">
                                Browse Courses
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Edit Profile Modal */}
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
                userData={data}
                onSave={handleSaveProfile}
            />
        </div>
    )
}
