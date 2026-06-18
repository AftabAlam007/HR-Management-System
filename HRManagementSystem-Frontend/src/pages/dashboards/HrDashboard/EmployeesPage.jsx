import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import axios from 'axios';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import UserActionModal from '../../../components/modals/UserActionModel'; // CORRECTED: UserActionModal, not Model

const EmployeesPage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedUserId, setSelectedUserId] = useState(null);

    // --- DATA FETCHING ---
    // (1) Define fetchEmployees outside of useEffect and wrap with useCallback
    // This prevents it from being recreated on every render and avoids dependency array issues.
    const fetchEmployees = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
            const response = await axios.get(`${API_URL}/api/hr/employees`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setEmployees(response.data);
        } catch (err) {
            toast.error(`Failed to fetch employees: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    }, []); // Empty dependency array means this function is created only once.

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                setCurrentUser(jwtDecode(token));
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
        // (2) Now we can call the stable fetchEmployees function
        fetchEmployees();
    }, [fetchEmployees]); // Add fetchEmployees to the dependency array

    // --- ACTION HANDLERS ---
    const handleOpenCreateModal = () => {
        setModalMode('create');
        setSelectedUserId(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (userId) => {
        setModalMode('edit');
        setSelectedUserId(userId);
        setIsModalOpen(true);
    };
    
    const handleModalComplete = (result) => {
        if (modalMode === 'create') {
            // (3) This call now works correctly because fetchEmployees is in the component's scope
            fetchEmployees();
        } else {
            setEmployees(prev => prev.map(user => user.id === result.id ? result : user));
        }
    };
    
    // (All other handlers: handleResendInvite, handleDelete, etc. are correct and unchanged)
    const handleResendInvite = (email) => { /* ... */ };
    const handleDelete = (userId, userName) => { /* ... */ };
    const performDelete = (userId) => { /* ... */ };
    const getStatusDisplay = (user) => { /* ... */ };
    const getRoleDisplay = (role) => { /* ... */ };

    return (
        <DashboardLayout
            role="hr"
            title="Employee Management"
            userName={currentUser?.fullName || 'HR Manager'}
            userEmail={currentUser?.sub || ''}
        >
            <UserActionModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                mode={modalMode}
                userId={selectedUserId}
                onComplete={handleModalComplete}
            />

            <div className="p-8">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 p-6 rounded-lg shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">All Employees</h2>
                            <p className="text-gray-600 dark:text-gray-400">View, search, and manage all employee records.</p>
                        </div>
                        <button onClick={handleOpenCreateModal} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 hover:shadow-[0_0_15px_rgba(22,163,74,0.5)] transition-all">
                            + Onboard Employee
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left bg-transparent">
                            <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                                <tr>
                                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 uppercase">Name</th>
                                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 uppercase">Job Title</th>
                                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 uppercase">Role</th>
                                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    [...Array(5)].map((_, idx) => (
                                        <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 animate-pulse">
                                            <td className="p-4"><div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div><div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div></td>
                                            <td className="p-4"><div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div></td>
                                            <td className="p-4"><div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div></td>
                                            <td className="p-4"><div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div></td>
                                            <td className="p-4"><div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 ml-auto"></div></td>
                                        </tr>
                                    ))
                                ) : employees.length === 0 ? (
                                    <tr><td colSpan="5" className="text-center p-6 text-gray-500 dark:text-gray-400">No employees found.</td></tr>
                                ) : (
                                    employees.map(user => (
                                        <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="p-3">
                                                <div className="font-medium text-gray-800 dark:text-gray-200">{user.fullName}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </td>
                                            <td className="p-3 text-gray-700 dark:text-gray-300">{user.jobTitle || 'N/A'}</td>
                                            <td className="p-3">{getRoleDisplay(user.role)}</td>
                                            <td className="p-3">{getStatusDisplay(user)}</td>
                                            <td className="p-3 text-right space-x-4">
                                                {user.status === 'PENDING' ? (
                                                    <button onClick={() => handleResendInvite(user.email)} className="text-blue-600 hover:underline text-sm font-semibold">Resend Invite</button>
                                                ) : (
                                                    <>
                                                        <button onClick={() => handleOpenEditModal(user.id)} className="text-blue-600 hover:underline text-sm font-medium">Edit</button>
                                                        <button onClick={() => handleDelete(user.id, user.fullName)} className="text-red-600 hover:underline text-sm font-medium">Delete</button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default EmployeesPage;