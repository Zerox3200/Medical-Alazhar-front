import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaUser, FaClock, FaTimes, FaEnvelopeOpen, FaTrash, FaReply } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { ContactUsRequests } from '../../Api/apiRequests';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader';
import { CiUnread } from "react-icons/ci";

const MessageDetails = ({ isOpen, onClose, messageId, onMarkAsRead, onDelete }) => {
    const [Token] = useCookies(['Al-Azhar']);

    // Fetch message details using React Query
    const { data: messageData, isLoading, isError, refetch } = useQuery({
        queryKey: ['messageDetails', messageId],
        queryFn: async () => {
            const response = await ContactUsRequests.getOneMessage(messageId, Token['Al-Azhar']);
            return response?.data;
        },
        enabled: !!messageId && !!Token['Al-Azhar'] && isOpen,
        retry: 2,
        retryDelay: 1000
    });

    const messageDetails = messageData?.messageDetails;
    const neededUser = messageData?.NeededUser;

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPhoneNumber = (phone) => {
        if (!phone) return 'No phone number';
        const phoneStr = phone.toString();
        return `+20 ${phoneStr.slice(0, 2)} ${phoneStr.slice(2, 5)} ${phoneStr.slice(5)}`;
    };

    const handleMarkAsRead = async () => {
        if (onMarkAsRead) {
            await onMarkAsRead(messageId);
            refetch();
            onClose();
        }
    };

    const handleDelete = async () => {
        if (onDelete) {
            await onDelete(messageId);
            refetch();
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-emerald-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <FaEnvelope className="text-white text-sm sm:text-lg" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Message Details</h2>
                                    <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">View complete message information</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                                {messageDetails && !messageDetails.isRead ? (
                                    <button
                                        onClick={handleMarkAsRead}
                                        className="p-2 text-gray-400 hover:text-green-500 transition-colors duration-200 rounded-lg hover:bg-green-50"
                                        title="Mark as Read"
                                    >
                                        <FaEnvelopeOpen className="text-sm sm:text-base" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleMarkAsRead}
                                        className="p-2 text-gray-400 hover:text-green-500 transition-colors duration-200 rounded-lg hover:bg-green-50"
                                        title="Mark as unread"
                                    >
                                        <CiUnread className="text-sm sm:text-base" />
                                    </button>
                                )}
                                {messageDetails && (
                                    <button
                                        onClick={handleDelete}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-lg hover:bg-red-50"
                                        title="Delete Message"
                                    >
                                        <FaTrash className="text-sm sm:text-base" />
                                    </button>
                                )}
                                <button
                                    onClick={onClose}
                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-lg hover:bg-white"
                                    title="Close"
                                >
                                    <FaTimes className="text-lg sm:text-xl" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader />
                            </div>
                        ) : isError ? (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-red-500 text-2xl">⚠️</span>
                                </div>
                                <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Message</h3>
                                <p className="text-red-600 mb-4">Failed to load message details. Please try again.</p>
                                <button
                                    onClick={() => refetch()}
                                    className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
                                >
                                    <span>Retry</span>
                                </button>
                            </div>
                        ) : messageDetails && neededUser ? (
                            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                                {/* Sender Information */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 border border-blue-100">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                                        <FaUser className="text-blue-600 text-sm sm:text-base" />
                                        <span>Sender Information</span>
                                    </h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200">
                                                    <FaUser className="text-blue-500" />
                                                    <span className="text-gray-900 font-medium">{neededUser.name}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                                <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200">
                                                    <FaEnvelope className="text-emerald-500" />
                                                    <span className="text-gray-900">{neededUser.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200">
                                                    <FaPhone className="text-purple-500" />
                                                    <span className="text-gray-900">{formatPhoneNumber(messageDetails.phone)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                                        <FaEnvelope className="text-emerald-600 text-sm sm:text-base" />
                                        <span>Message Content</span>
                                    </h3>

                                    <div className="space-y-3 sm:space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                            <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                <h4 className="text-base sm:text-lg font-semibold text-gray-900">{messageDetails.subject}</h4>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                            <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[100px] sm:min-h-[120px]">
                                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">{messageDetails.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Message Status */}
                                <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Message Status</h3>
                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                        <div className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full ${messageDetails.isRead
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            <FaEnvelopeOpen className="text-xs sm:text-sm" />
                                            <span className="text-xs sm:text-sm font-medium">
                                                {messageDetails.isRead ? 'Read' : 'Unread'}
                                            </span>
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-500 break-all">
                                            ID: {messageDetails._id}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaEnvelope className="text-2xl text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Message Found</h3>
                                <p className="text-gray-500">The requested message could not be found.</p>
                            </div>
                        )}
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MessageDetails;
