import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode'; // <-- (1) IMPORT jwt-decode
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { UsersIcon, BriefcaseIcon, CurrencyDollarIcon, CalendarDaysIcon } from '../../../components/ui/Icons';
import { employees, leaveRequests as initialLeaveRequests, jobApplicants, jobPostings } from '../../../components/data/mockHrData';
import UserActionModal from '../../../components/modals/UserActionModel';
import PostJobModal from '../../../components/modals/PostJobModal';

// StatCard component remains the same
const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 p-6 rounded-lg shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
        <div className={`text-3xl ${color} mb-2`}>{icon}</div>
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
    </div>
);

const HrDashboard = () => {
    // --- (2) ADD STATE TO HOLD THE LOGGED-IN USER'S INFO ---
    const [currentUser, setCurrentUser] = useState(null);

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
    const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
    const navigate = useNavigate();

    // --- (3) ADD useEffect TO DECODE THE TOKEN ON PAGE LOAD ---
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                // Decode the token and set the user state
                const decodedUser = jwtDecode(token);
                setCurrentUser(decodedUser);
            } catch (error) {
                console.error("Invalid or expired token:", error);
                // Optional: handle bad token, e.g., navigate to login
                // navigate('/login');
            }
        }
    }, []); // Empty array means this runs only once when the component mounts

    const pendingLeaveRequests = leaveRequests.filter(req => req.status === 'Pending');

    const handleLeaveUpdate = (id, newStatus) => {
        setLeaveRequests(prev => 
            prev.map(req => req.id === id ? { ...req, status: newStatus } : req)
        );
        toast.success(`Leave request has been ${newStatus.toLowerCase()}.`);
    };
    
    const handleOnboardComplete = (newEmployeeData) => {
        toast.success(`Successfully onboarded ${newEmployeeData.fullName}!`);
    };

    return (
        <DashboardLayout
            role="hr"
            title="HR Dashboard"
            // --- (4) USE THE DYNAMIC DATA FROM STATE ---
            // Provide sensible fallbacks while the user data is being loaded
            userName={currentUser?.fullName || 'HR Manager'} 
            userEmail={currentUser?.sub || ''} // 'sub' is the standard JWT claim for the user's email
        >
            <UserActionModal 
                isOpen={isUserModalOpen} 
                onClose={() => setIsUserModalOpen(false)} 
                onComplete={handleOnboardComplete} 
            />
            <PostJobModal 
                isOpen={isPostJobModalOpen} 
                onClose={() => setIsPostJobModalOpen(false)} 
            />

            <div className="p-8">
                {/* Top Statistics Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Employees" value={employees.length} icon={<UsersIcon className="h-8 w-8" />} color="text-blue-500" />
                    <StatCard title="New Applicants" value={jobApplicants.length} icon={<BriefcaseIcon className="h-8 w-8" />} color="text-green-500" />
                    <StatCard title="Leave Requests" value={pendingLeaveRequests.length} icon={<CalendarDaysIcon className="h-8 w-8" />} color="text-yellow-500" />
                    <StatCard title="Payroll Pending" value={'$310k'} icon={<CurrencyDollarIcon className="h-8 w-8" />} color="text-red-500" />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Pending Leave Requests */}
                    <div className="lg:col-span-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Pending Leave Requests</h3>
                            <Link to="/hr/leave" className="text-sm font-semibold text-green-600 hover:underline">View All</Link>
                        </div>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {pendingLeaveRequests.length > 0 ? (
                                pendingLeaveRequests.map(req => (
                                    <div key={req.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow transition-all border border-gray-100 dark:border-gray-700">
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">{req.employeeName} <span className="text-sm text-gray-500 ml-2">({req.leaveType}: {req.days} days)</span></p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Dates: {req.startDate} to {req.endDate}</p>
                                        </div>
                                        <div className="space-x-2 flex-shrink-0">
                                            <button onClick={() => handleLeaveUpdate(req.id, 'Approved')} className="text-sm bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-md hover:bg-green-200">Approve</button>
                                            <button onClick={() => handleLeaveUpdate(req.id, 'Denied')} className="text-sm bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-md hover:bg-red-200">Deny</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No pending leave requests.</p>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Quick Actions & Recruitment */}
                    <div className="space-y-8">
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
                            <ul className="space-y-3">
                                <li><button onClick={() => setIsUserModalOpen(true)} className="block w-full text-left bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 p-3 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 font-semibold transition-colors">+ Onboard New Employee</button></li>
                                <li><button onClick={() => setIsPostJobModalOpen(true)} className="block w-full text-left bg-green-100/80 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-3 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 font-semibold transition-colors">Post a New Job</button></li>
                                <li><button onClick={() => navigate('/hr/payroll')} className="block w-full text-left bg-yellow-100/80 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 p-3 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 font-semibold transition-colors">Run Payroll</button></li>
                            </ul>
                        </div>
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 p-6 rounded-lg shadow-lg">
                             <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recruitment Pipeline</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{jobPostings[0].title}</p>
                              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                <p className="flex justify-between"><span>Applied:</span> <span className="font-bold">{jobApplicants.filter(a => a.jobPostingId === jobPostings[0].id).length}</span></p>
                                <p className="flex justify-between"><span>Screening:</span> <span className="font-bold">4</span></p>
                                <p className="flex justify-between"><span>Interview:</span> <span className="font-bold">2</span></p>
                                <p className="flex justify-between"><span>Offer:</span> <span className="font-bold">1</span></p>
                              </div>
                              <Link to="/hr/recruitment" className="text-sm font-semibold text-green-600 hover:underline mt-4 block text-right">View Details</Link>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default HrDashboard;