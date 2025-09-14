import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCalendarAlt, FaEye } from 'react-icons/fa';
import './SubscribersTable.scss';

const SubscribersTable = ({ subscribers = [] }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!subscribers || subscribers.length === 0) {
        return (
            <div className="subscribers-empty">
                <div className="empty-icon">
                    <FaUser />
                </div>
                <h3 className="empty-title">No Subscribers</h3>
                <p className="empty-description">
                    This course doesn't have any subscribers yet.
                </p>
            </div>
        );
    }

    return (
        <div className="subscribers-container">
            <div className="subscribers-header">
                <h3 className="subscribers-title">Course Subscribers</h3>
                <div className="subscribers-count">
                    {subscribers.length} {subscribers.length === 1 ? 'Subscriber' : 'Subscribers'}
                </div>
            </div>

            <div className="table-container">
                <div className="table-wrapper">
                    <table className="subscribers-table">
                        <thead>
                            <tr>
                                <th>Subscriber</th>
                                <th>Email</th>
                                <th>Subscription Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribers.map((subscription, index) => (
                                <motion.tr
                                    key={subscription._id || index}
                                    className="subscriber-row"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <td className="subscriber-info">
                                        <div className="subscriber-avatar">
                                            {subscription.userId?.profileImage ? (
                                                <img
                                                    src={subscription.userId.profileImage}
                                                    alt={subscription.userId?.name || 'User'}
                                                    className="avatar-image"
                                                />
                                            ) : (
                                                <div className="avatar-placeholder">
                                                    <FaUser className="avatar-icon" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="subscriber-details">
                                            <div className="subscriber-name">
                                                {subscription.userId?.name || 'Unknown User'}
                                            </div>
                                            <div className="subscriber-id">
                                                ID: {subscription.userId?._id || 'N/A'}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="email-cell">
                                        <div className="email-info">
                                            <FaEnvelope className="email-icon" />
                                            <span className="email-text">
                                                {subscription.userId?.email || 'No email'}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="subscription-date">
                                        <div className="date-info">
                                            <FaCalendarAlt className="date-icon" />
                                            <span className="date-text">
                                                {subscription.subscriptionDate ?
                                                    formatDate(subscription.subscriptionDate) :
                                                    'Unknown'
                                                }
                                            </span>
                                        </div>
                                    </td>

                                    <td className="actions-cell">
                                        <div className="action-buttons">
                                            <motion.button
                                                className="action-btn view-btn"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                title="View Profile"
                                            >
                                                <FaEye className="btn-icon" />
                                                <span>View</span>
                                            </motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SubscribersTable;
