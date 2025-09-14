import React, { useState } from 'react'
import './Users.scss'
import { NormalUserRequests } from '../../Api/apiRequests';
import { useCookies } from 'react-cookie';
import Loader from '../../components/Loader';
import { useQuery } from 'react-query';
import {
    FaSearch,
    FaFilter,
    FaEye,
    FaEyeSlash,
    FaTrash,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCalendarAlt,
    FaSort,
    FaChevronDown
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import FreezeAccountModal from './FreezeAccountModal';

export default function Users() {
    const [Token] = useCookies(['Al-Azhar']);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isFreezeModalOpen, setIsFreezeModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const CallAllUsers = async () => {
        const data = await NormalUserRequests.getAllUsers(Token['Al-Azhar']);
        return data?.users;
    }

    const { data: usersData, isLoading, refetch } = useQuery("get All Users", CallAllUsers, {
        cacheTime: 3000
    });

    // Filter and sort users
    const filteredAndSortedUsers = React.useMemo(() => {
        if (!usersData) return [];

        let filtered = usersData.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone.includes(searchTerm);

            const matchesStatus = filterStatus === 'all' ||
                (filterStatus === 'active' && !user.accountFreezed) ||
                (filterStatus === 'frozen' && user.accountFreezed);

            return matchesSearch && matchesStatus;
        });

        // Sort users
        filtered.sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            if (sortField === 'lastLogin') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return filtered;
    }, [usersData, searchTerm, sortField, sortDirection, filterStatus]);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

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

    const handleDeleteUser = async (userId) => {
        const response = await NormalUserRequests.deleteUser(userId, Token['Al-Azhar']);

        if (response?.success) {
            await refetch();
            toast.success('User deleted successfully');
        } else {
            toast.error('Failed to delete user');
        }
    };

    const handleFreezeAccount = async (reason) => {
        try {
            const response = await NormalUserRequests.freezeAccount(selectedUser._id, reason, Token['Al-Azhar']);
            if (response?.success) {
                await refetch();
                toast.success('Account frozen successfully');
                setIsFreezeModalOpen(false);
                setSelectedUser(null);
            } else {
                toast.error('Failed to freeze account');
            }
        } catch (error) {
            console.error('Error freezing account:', error);
            toast.error('An error occurred while freezing the account');
        }
    };

    const handleUnFreezeAccount = async (userId) => {
        try {
            const response = await NormalUserRequests.freezeAccount(userId, '', Token['Al-Azhar']);
            if (response?.success) {
                await refetch();
                toast.success('Frozen removed successfully');
                setIsFreezeModalOpen(false);
                setSelectedUser(null);
            } else {
                toast.error('Failed to remove frozen');
            }
        } catch (error) {
            console.error('Error removing frozen:', error);
            toast.error('An error occurred while removing frozen');
        }
    };

    const handleOpenFreezeModal = (user) => {
        setSelectedUser(user);
        setIsFreezeModalOpen(true);
    };

    const handleCloseFreezeModal = () => {
        setIsFreezeModalOpen(false);
        setSelectedUser(null);
    };

    if (isLoading) return <Loader />

    return (
        <div className="users-container">
            {/* Header */}
            <div className="users-header">
                <div className="header-content">
                    <h1 className="page-title">Users Management</h1>
                    <p className="page-subtitle">Manage and monitor user accounts</p>
                </div>
                <div className="header-stats">
                    <div className="stat-card">
                        <div className="stat-number">{usersData?.length || 0}</div>
                        <div className="stat-label">Total Users</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">
                            {usersData?.filter(user => !user.accountFreezed).length || 0}
                        </div>
                        <div className="stat-label">Active Users</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">
                            {usersData?.filter(user => user.accountFreezed).length || 0}
                        </div>
                        <div className="stat-label">Frozen Accounts</div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="search-filter-bar">
                <div className="search-section">
                    <div className="search-input-container">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search users by name, email, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                <div className="filter-section">
                    <div className="filter-dropdown">
                        <FaFilter className="filter-icon" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Users</option>
                            <option value="active">Active Only</option>
                            <option value="frozen">Frozen Only</option>
                        </select>
                        <FaChevronDown className="dropdown-icon" />
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="table-container">
                <div className="table-wrapper">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th
                                    className="sortable"
                                    onClick={() => handleSort('name')}
                                >
                                    <div className="th-content">
                                        <span>User</span>
                                        <FaSort className="sort-icon" />
                                    </div>
                                </th>
                                <th
                                    className="sortable"
                                    onClick={() => handleSort('email')}
                                >
                                    <div className="th-content">
                                        <span>Email</span>
                                        <FaSort className="sort-icon" />
                                    </div>
                                </th>
                                <th
                                    className="sortable"
                                    onClick={() => handleSort('phone')}
                                >
                                    <div className="th-content">
                                        <span>Phone</span>
                                        <FaSort className="sort-icon" />
                                    </div>
                                </th>
                                <th
                                    className="sortable"
                                    onClick={() => handleSort('lastLogin')}
                                >
                                    <div className="th-content">
                                        <span>Last Login</span>
                                        <FaSort className="sort-icon" />
                                    </div>
                                </th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedUsers.map((user, index) => (
                                <motion.tr
                                    key={user._id || index}
                                    className="user-row"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <td className="user-info">
                                        <div className="user-avatar">
                                            {user.profileImage ? (
                                                <img
                                                    src={user.profileImage}
                                                    alt={user.name}
                                                    className="avatar-image"
                                                />
                                            ) : (
                                                <div className="avatar-placeholder">
                                                    <FaUser className="avatar-icon" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="user-details">
                                            <div className="user-name">{user.name}</div>
                                            <div className="user-id">ID: {user._id || 'N/A'}</div>
                                        </div>
                                    </td>

                                    <td className="email-cell">
                                        <div className="email-info">
                                            <FaEnvelope className="email-icon" />
                                            <span className="email-text">{user.email}</span>
                                        </div>
                                    </td>

                                    <td className="phone-cell">
                                        <div className="phone-info">
                                            <FaPhone className="phone-icon" />
                                            <span className="phone-text">{user.phone}</span>
                                        </div>
                                    </td>

                                    <td className="last-login">
                                        <div className="login-info">
                                            <FaCalendarAlt className="login-icon" />
                                            <span className="login-text">
                                                {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="status-cell">
                                        <div className={`status-badge ${user.accountFreezed ? 'frozen' : 'active'}`}>
                                            {user.accountFreezed ? (
                                                <>
                                                    <FaEyeSlash className="status-icon" />
                                                    <span>Frozen</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaEye className="status-icon" />
                                                    <span>Active</span>
                                                </>
                                            )}
                                        </div>
                                        {user.accountFreezed && user.accountFreezedReason && (
                                            <div className="freeze-reason">
                                                Reason: {user.accountFreezedReason}
                                            </div>
                                        )}
                                    </td>

                                    <td className="actions-cell">
                                        <div className="action-buttons">
                                            <motion.button
                                                className={`action-btn freeze-btn ${user.accountFreezed ? 'unfreeze' : 'freeze'}`}
                                                onClick={() => user.accountFreezed ? handleUnFreezeAccount(user._id) : handleOpenFreezeModal(user)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {user.accountFreezed ? (
                                                    <>
                                                        <FaEye className="btn-icon" />
                                                        <span>Unfreeze</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaEyeSlash className="btn-icon" />
                                                        <span>Freeze</span>
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredAndSortedUsers.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <FaUser />
                        </div>
                        <h3 className="empty-title">No users found</h3>
                        <p className="empty-description">
                            {searchTerm || filterStatus !== 'all'
                                ? 'Try adjusting your search or filter criteria'
                                : 'No users are currently registered'
                            }
                        </p>
                    </div>
                )}
            </div>

            {/* Freeze Account Modal */}
            <FreezeAccountModal
                isOpen={isFreezeModalOpen}
                onClose={handleCloseFreezeModal}
                onConfirm={handleFreezeAccount}
                userName={selectedUser?.name || ''}
                isLoading={false}
            />
        </div>
    )
}
