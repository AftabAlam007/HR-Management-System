import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const LeaveManagementPage = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch all leave requests from the backend API
    const fetchLeaveRequests = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:8080/api/hr/leave-requests', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setLeaveRequests(response.data);
        } catch (err) {
            toast.error(`Failed to load leave requests: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // useEffect hook to call fetchLeaveRequests when the component first loads
    useEffect(() => {
        fetchLeaveRequests();
    }, []);

    // Function to handle approving or denying a request
    const handleLeaveUpdate = (id, newStatus) => {
        // The API call is defined as a promise for use with react-hot-toast
        const promise = axios.put(
            `http://localhost:8080/api/hr/leave-requests/${id}/status`, 
            { status: newStatus }, 
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } }
        );

        // Use toast.promise for automatic loading, success, and error notifications
        toast.promise(promise, {
            loading: `Updating request to ${newStatus}...`,
            success: () => {
                // On success, update the local state to instantly reflect the change in the UI
                setLeaveRequests(prevRequests => 
                    prevRequests.map(req => req.id === id ? { ...req, status: newStatus } : req)
                );
                return `Request has been ${newStatus.toLowerCase()}.`;
            },
            error: (err) => `Error: ${err.response?.data?.message || err.message}`,
        });
    };

    // Helper function to get the correct color for each status badge
    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Denied': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <DashboardLayout
            role="hr"
            title="Leave Management"
            userName="Zakir Hussain"
            userEmail="zakir.h@workbridge.com"
        >
            <div className="p-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">All Leave Requests</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left bg-white">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="p-3 font-semibold text-gray-600 uppercase">Employee</th>
                                    <th className="p-3 font-semibold text-gray-600 uppercase">Leave Type</th>
                                    <th className="p-3 font-semibold text-gray-600 uppercase">Dates</th>
                                    <th className="p-3 font-semibold text-gray-600 uppercase">Days</th>
                                    <th className="p-3 font-semibold text-gray-600 uppercase">Status</th>
                                    <th className="p-3 font-semibold text-gray-600 uppercase text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="6" className="text-center p-6 text-gray-500">Loading leave requests...</td></tr>
                                ) : leaveRequests.length === 0 ? (
                                    <tr><td colSpan="6" className="text-center p-6 text-gray-500">No leave requests found.</td></tr>
                                ) : (
                                    leaveRequests.map(req => (
                                        <tr key={req.id} className="border-b hover:bg-gray-50">
                                            <td className="p-3 font-medium text-gray-800">{req.employeeName}</td>
                                            <td className="p-3 text-gray-700">{req.leaveType}</td>
                                            <td className="p-3 text-gray-700">{req.startDate} to {req.endDate}</td>
                                            <td className="p-3 text-gray-700 text-center">{req.days}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-center">
                                                {/* Only show action buttons if the request is still 'Pending' */}
                                                {req.status === 'Pending' && (
                                                    <div className="flex justify-center space-x-3">
                                                        <button 
                                                            onClick={() => handleLeaveUpdate(req.id, 'Approved')} 
                                                            className="text-green-600 hover:underline text-sm font-semibold"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button 
                                                            onClick={() => handleLeaveUpdate(req.id, 'Denied')} 
                                                            className="text-red-600 hover:underline text-sm font-semibold"
                                                        >
                                                            Deny
                                                        </button>
                                                    </div>
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

export default LeaveManagementPage;