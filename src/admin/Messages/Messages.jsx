import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaEnvelopeOpen, FaPhone, FaUser, FaSearch, FaFilter, FaEye, FaReply, FaTrash, FaClock, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { ContactUsRequests } from '../../Api/apiRequests';
import Loader from '../../components/Loader';
import MessageDetails from './MessageDetails';

const Messages = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, read, unread
    const [sortOrder, setSortOrder] = useState('newest'); // newest, oldest
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const [Token] = useCookies(['Al-Azhar']);

    // Fetch messages data using React Query
    const getAllMessages = async () => {
        const response = await ContactUsRequests.getAllMessages(Token['Al-Azhar']);
        return response?.data;
    };

    const { data: messagesData, isLoading, isError, refetch } = useQuery({
        queryKey: ['messages'],
        queryFn: getAllMessages,
        enabled: !!Token['Al-Azhar'],
        refetchInterval: 30000, // Refetch every 30 seconds
        retry: 3,
        retryDelay: 1000
    });

    const messages = messagesData?.messages || [];

    // Filter and search messages
    const filteredMessages = messages
        .filter(message => {
            const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                message.message.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterStatus === 'all' ||
                (filterStatus === 'read' && message.isRead) ||
                (filterStatus === 'unread' && !message.isRead);
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            if (sortOrder === 'newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
        });

    const unreadCount = messages.filter(msg => !msg.isRead).length;

    const handleViewMessage = (message) => {
        setSelectedMessageId(message._id);
        setIsDetailOpen(true);
    };

    const handleMarkAsRead = async (messageId) => {
        try {
            const response = await ContactUsRequests.markMessageAsRead(messageId, Token['Al-Azhar']);
            if (response?.data?.success) {
                toast.success('Message marked as read');
                refetch(); // Refresh the messages list
            } else {
                toast.error('Failed to mark message as read');
            }
        } catch (error) {
            console.error('Error marking message as read:', error);
            toast.error('Failed to mark message as read');
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            const response = await ContactUsRequests.deleteMessage(messageId, Token['Al-Azhar']);
            if (response?.data?.success) {
                toast.success('Message deleted successfully');
                refetch(); // Refresh the messages list
            } else {
                toast.error('Failed to delete message');
            }
        } catch (error) {
            console.error('Error deleting message:', error);
            toast.error('Failed to delete message');
        }
    };

    const handleCloseDetails = () => {
        setIsDetailOpen(false);
        setSelectedMessageId(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    const formatPhoneNumber = (phone) => {
        const phoneStr = phone.toString();
        return `+20 ${phoneStr.slice(0, 2)} ${phoneStr.slice(2, 5)} ${phoneStr.slice(5)}`;
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

    // Loading state
    if (isLoading) {
        return <Loader />;
    }

    // Error state
    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-red-500 text-2xl">⚠️</span>
                        </div>
                        <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Messages</h3>
                        <p className="text-red-600 mb-4">Failed to load messages. Please try again.</p>
                        <button
                            onClick={() => refetch()}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
                        >
                            <span>Retry</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
                                <p className="text-gray-600">
                                    {unreadCount > 0 ? (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                            {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
                                        </span>
                                    ) : (
                                        'All messages have been read'
                                    )}
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    <FaEnvelope className="text-blue-500" />
                                    <span className="text-sm text-gray-600">Total: {messages.length}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaEnvelopeOpen className="text-green-500" />
                                    <span className="text-sm text-gray-600">Read: {messages.filter(m => m.isRead).length}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Search and Filter Bar */}
                    <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                                />
                            </div>

                            {/* Filter */}
                            <div className="flex items-center space-x-2">
                                <FaFilter className="text-gray-400" />
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                                >
                                    <option value="all">All Messages</option>
                                    <option value="unread">Unread</option>
                                    <option value="read">Read</option>
                                </select>
                            </div>

                            {/* Sort */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                                    className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
                                >
                                    {sortOrder === 'newest' ? (
                                        <FaSortAmountDown className="text-gray-400" />
                                    ) : (
                                        <FaSortAmountUp className="text-gray-400" />
                                    )}
                                    <span className="text-sm text-gray-600">
                                        {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Messages List */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <AnimatePresence>
                            {filteredMessages.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100"
                                >
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaEnvelope className="text-2xl text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No messages found</h3>
                                    <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                                </motion.div>
                            ) : (
                                filteredMessages.map((message, index) => (
                                    <motion.div
                                        key={message._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`bg-white rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl cursor-pointer ${message.isRead
                                            ? 'border-gray-100'
                                            : 'border-blue-200 bg-blue-50'
                                            }`}
                                        onClick={() => handleViewMessage(message)}
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <div className={`w-3 h-3 rounded-full ${message.isRead ? 'bg-gray-300' : 'bg-blue-500'
                                                            }`}></div>
                                                        <h3 className={`text-lg font-semibold truncate ${message.isRead ? 'text-gray-700' : 'text-gray-900'
                                                            }`}>
                                                            {message.subject}
                                                        </h3>
                                                        {!message.isRead && (
                                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className={`text-sm mb-3 line-clamp-2 ${message.isRead ? 'text-gray-600' : 'text-gray-700'
                                                        }`}>
                                                        {message.message}
                                                    </p>

                                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                        <div className="flex items-center space-x-1">
                                                            <FaPhone className="text-emerald-500" />
                                                            <span>{formatPhoneNumber(message.phone)}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <FaClock className="text-gray-400" />
                                                            <span>{formatDate(message.createdAt)}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2 ml-4">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleViewMessage(message);
                                                        }}
                                                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 rounded-lg hover:bg-blue-50"
                                                        title="View Message"
                                                    >
                                                        <FaEye className="text-sm" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleMarkAsRead(message._id);
                                                        }}
                                                        className="p-2 text-gray-400 hover:text-green-500 transition-colors duration-200 rounded-lg hover:bg-green-50"
                                                        title="Mark as Read"
                                                    >
                                                        <FaEnvelopeOpen className="text-sm" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteMessage(message._id);
                                                        }}
                                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-lg hover:bg-red-50"
                                                        title="Delete Message"
                                                    >
                                                        <FaTrash className="text-sm" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>

            {/* Message Details Popup */}
            <MessageDetails
                isOpen={isDetailOpen}
                onClose={handleCloseDetails}
                messageId={selectedMessageId}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDeleteMessage}
            />
        </div>
    );
};

export default Messages;
