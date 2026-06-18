import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { CalendarDaysIcon } from "../../../components/ui/Icons";

const LeaveApplication = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [leaveHistory, setLeaveHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [formData, setFormData] = useState({
        leaveType: "Vacation",
        startDate: "",
        endDate: "",
        reason: "",
    });
    const formRef = useRef(null);

    // --- DATA FETCHING ---
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                setCurrentUser(jwtDecode(token));
            } catch (error) {
                console.error("Invalid Token:", error);
                toast.error("Session invalid. Please log in again.");
            }
        }
        
        const fetchHistory = async () => {
            if (!token) return;
            try {
                setLoadingHistory(true);
                const response = await axios.get('http://localhost:8080/api/user/leave-history', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setLeaveHistory(response.data);
            } catch (err) {
                toast.error("Could not fetch leave history.");
            } finally {
                setLoadingHistory(false);
            }
        };

        fetchHistory();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFormData({ leaveType: "Vacation", startDate: "", endDate: "", reason: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic date validation
        if (new Date(formData.endDate) < new Date(formData.startDate)) {
            toast.error("End date cannot be before the start date.");
            return;
        }

        const promise = axios.post('http://localhost:8080/api/user/apply-leave', formData, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });

        toast.promise(promise, {
            loading: 'Submitting leave request...',
            success: (response) => {
                // Add the new request to the top of the history list for instant UI update
                setLeaveHistory(prev => [response.data, ...prev]);
                handleReset(); // Clear the form
                return "Leave request submitted successfully!";
            },
            error: (err) => `Failed to submit request: ${err.response?.data?.message || err.message}`,
        });
    };

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Denied': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    // Using mock data for balances as the API doesn't exist yet for this
    const leaveBalances = [
        { name: "Vacation", balance: 12 },
        { name: "Sick Leave", balance: 5 },
        { name: "Personal", balance: 3 },
    ];

    return (
        <DashboardLayout
            role="user"
            title="Leave Application"
            userName={currentUser?.fullName || 'Employee'}
            userEmail={currentUser?.sub || ''}
        >
            <div className="p-6 max-w-6xl mx-auto space-y-8">
                {/* Leave Balances & Application Form Section */}
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 p-6 rounded-2xl shadow-lg">
                    <h1 className="flex items-center text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                        <CalendarDaysIcon className="h-8 w-8 text-emerald-600 mr-2" />
                        Apply for Leave
                    </h1>
                    {/* Balances */}
                    <div className="flex space-x-4 overflow-x-auto pb-4 mb-6 border-b border-gray-200 dark:border-gray-700">
                        {leaveBalances.map((leave) => (
                            <div key={leave.name} className="flex-shrink-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl px-4 py-3 text-center min-w-[120px] shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-3xl font-bold">{leave.balance}</p>
                                <p className="text-sm">{leave.name}</p>
                            </div>
                        ))}
                    </div>
                    {/* Application Form */}
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
                        <div>
                            <label htmlFor="leaveType" className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">Leave Type</label>
                            <select id="leaveType" name="leaveType" value={formData.leaveType} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                                <option>Vacation</option>
                                <option>Sick Leave</option>
                                <option>Personal</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="startDate" className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">Start Date</label>
                                <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none style-color-scheme-dark" />
                            </div>
                            <div>
                                <label htmlFor="endDate" className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">End Date</label>
                                <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none style-color-scheme-dark" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="reason" className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">Reason for leave</label>
                            <textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} rows="4" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none" required />
                        </div>
                        <div className="flex space-x-4">
                            <button type="submit" className="bg-emerald-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-emerald-700 transition-colors">Submit</button>
                            <button type="button" onClick={handleReset} className="border border-red-500 dark:border-red-400 text-red-500 dark:text-red-400 font-bold py-2.5 px-6 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">Reset</button>
                        </div>
                    </form>
                </div>

                {/* Leave History Section */}
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 p-6 rounded-2xl shadow-lg">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Your Leave History</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-50 dark:bg-gray-800/50">
                                <tr>
                                    <th className="text-left px-4 py-3 border-b dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300">Leave Type</th>
                                    <th className="text-left px-4 py-3 border-b dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300">Start Date</th>
                                    <th className="text-left px-4 py-3 border-b dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300">End Date</th>
                                    <th className="text-center px-4 py-3 border-b dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300">Days</th>
                                    <th className="text-left px-4 py-3 border-b dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadingHistory ? (
                                    <tr><td colSpan="5" className="text-center p-6 text-gray-500 dark:text-gray-400">Loading history...</td></tr>
                                ) : leaveHistory.length === 0 ? (
                                    <tr><td colSpan="5" className="text-center p-6 text-gray-500 dark:text-gray-400">You have no leave history.</td></tr>
                                ) : (
                                    leaveHistory.map((leave) => (
                                        <tr key={leave.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                            <td className="px-4 py-3 border-b dark:border-gray-700 text-gray-800 dark:text-gray-200">{leave.leaveType}</td>
                                            <td className="px-4 py-3 border-b dark:border-gray-700 text-gray-800 dark:text-gray-200">{leave.startDate}</td>
                                            <td className="px-4 py-3 border-b dark:border-gray-700 text-gray-800 dark:text-gray-200">{leave.endDate}</td>
                                            <td className="px-4 py-3 border-b dark:border-gray-700 text-center text-gray-800 dark:text-gray-200">{leave.days}</td>
                                            <td className="px-4 py-3 border-b dark:border-gray-700">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>{leave.status}</span>
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

export default LeaveApplication;