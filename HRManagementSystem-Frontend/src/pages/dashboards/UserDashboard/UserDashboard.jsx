import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from 'jwt-decode';
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  UserCircleIcon,
} from "../../../components/ui/Icons";

const InfoCard = ({ title, children, actionText, onAction }) => {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 p-6 rounded-2xl shadow-lg h-full flex flex-col transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
        {actionText && (
          <button onClick={onAction} className="text-sm font-semibold text-green-600 hover:underline">
            {actionText}
          </button>
        )}
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
};

const UserDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profileData, setProfileData] = useState(null); // To store detailed profile info
  const [leaveBalances, setLeaveBalances] = useState({ paidTimeOff: '...', sickDays: '...' }); // Placeholder state
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
        try {
            // Decode the token to get basic info immediately for the header
            setCurrentUser(jwtDecode(token));
        } catch (error) { 
            console.error("Invalid Token:", error);
            toast.error("Session invalid. Please log in again.");
            navigate('/login');
            return; // Stop execution if token is bad
        }
    } else {
        // If no token, redirect to login
        navigate('/login');
        return;
    }

    const fetchData = async () => {
        try {
            // Use Promise.all to make API calls in parallel for better performance
            const [profileRes /*, leaveBalanceRes */] = await Promise.all([
                axios.get('http://localhost:8080/api/user/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                // In the future, you would add a real API call for leave balances here:
                // axios.get('http://localhost:8080/api/user/leave-balances', { headers: { 'Authorization': `Bearer ${token}` } })
            ]);
            
            setProfileData(profileRes.data);
            // setLeaveBalances(leaveBalanceRes.data); // Uncomment when the API exists

            // For now, we'll keep leave balances as mock data since the API doesn't exist yet
            setLeaveBalances({ paidTimeOff: 12, sickDays: 3 });

        } catch (err) {
            toast.error("Could not load your dashboard data.");
        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, [navigate]);

  const handleRequestLeave = () => navigate("/user/leave-application");
  const handleProfileClick = () => navigate("/user/profile");
  const handleViewPayslips = () => navigate("/user/payslips");

  return (
    <DashboardLayout
      role="user"
      title="My Dashboard"
      userName={currentUser?.fullName || 'Employee'}
      userEmail={currentUser?.sub || ''}
    >
      <div className="p-8">
        <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Welcome back, {currentUser?.fullName || 'Employee'}!
            </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Here’s a summary of your portal and company updates.
          </p>
        </div>
        
        {loading ? (
            <div className="text-center text-gray-500 p-12">Loading your dashboard...</div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: My Profile and Team */}
              <div className="lg:col-span-1 space-y-8">
                <InfoCard title="My Profile" actionText="View Profile" onAction={handleProfileClick}>
                    {profileData ? (
                        <div className="flex items-center space-x-4">
                          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.fullName || 'User')}&background=0d9488&color=fff&rounded=true&bold=true`} alt="Profile" className="h-16 w-16 rounded-full object-cover shadow-sm" />
                          <div>
                            <p className="font-bold text-lg text-gray-900 dark:text-white">{profileData.fullName}</p>
                            <p className="text-gray-600 dark:text-gray-400">{profileData.jobTitle || 'N/A'}</p>
                            <p className="text-sm text-gray-500">{profileData.email}</p>
                          </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">Could not load profile information.</p>
                    )}
                </InfoCard>

                <InfoCard title="My Team">
                  {/* Team data can remain mock as it's often complex directory data */}
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3"><UserCircleIcon className="h-8 w-8 text-gray-400" /><div><p className="font-semibold text-sm text-gray-800 dark:text-white">Zakir Hussain</p><p className="text-xs text-gray-500 dark:text-gray-400">HR Manager</p></div></li>
                    <li className="flex items-center space-x-3"><UserCircleIcon className="h-8 w-8 text-gray-400" /><div><p className="font-semibold text-sm text-gray-800 dark:text-white">Ankul Sharma</p><p className="text-xs text-gray-500 dark:text-gray-400">Senior Engineer</p></div></li>
                  </ul>
                </InfoCard>
              </div>

              {/* Center Column: Leave and Actions */}
              <div className="lg:col-span-1 space-y-8">
                <InfoCard title="Leave Balance" actionText="View History" onAction={handleRequestLeave}>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-green-50 dark:bg-green-500/10 p-4 rounded-xl border border-green-100 dark:border-green-500/20">
                      <p className="text-2xl font-bold text-green-700 dark:text-green-400">{leaveBalances.paidTimeOff}</p>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Paid Time Off</p>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-500/10 p-4 rounded-xl border border-yellow-100 dark:border-yellow-500/20">
                      <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">{leaveBalances.sickDays}</p>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Sick Days</p>
                    </div>
                  </div>
                </InfoCard>
                <InfoCard title="Quick Actions">
                  <div className="space-y-3">
                    <button onClick={handleRequestLeave} className="w-full flex items-center justify-center p-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"><CalendarDaysIcon className="h-5 w-5 mr-2" /> Request Leave</button>
                    <button className="w-full flex items-center justify-center p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"><DocumentTextIcon className="h-5 w-5 mr-2" /> Submit Expense</button>
                  </div>
                </InfoCard>
              </div>

              {/* Right Column: Announcements and Payslips */}
              <div className="lg:col-span-1 space-y-8">
                <InfoCard title="Company Announcements">
                  {/* Announcements are often static or from a different source, so mock is okay here */}
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-lg"><p className="font-semibold text-sm text-blue-800 dark:text-blue-300">Q4 All-Hands Meeting</p><p className="text-xs text-gray-600 dark:text-gray-400">Scheduled for Oct 25. Check calendar for invite.</p></div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 rounded-lg"><p className="font-semibold text-sm text-purple-800 dark:text-purple-300">New Healthcare Portal</p><p className="text-xs text-gray-600 dark:text-gray-400">Please enroll for benefits by end of month.</p></div>
                  </div>
                </InfoCard>
                <InfoCard title="Recent Payslips" actionText="View All" onAction={handleViewPayslips}>
                   {/* Payslip data is sensitive and should come from a dedicated API */}
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors border border-transparent dark:border-gray-700"><div className="flex items-center"><CurrencyDollarIcon className="h-5 w-5 text-emerald-500 mr-2" /><p className="font-semibold text-sm text-gray-800 dark:text-gray-200">Payslip - August 2025</p></div><a href="#" className="text-xs font-semibold text-emerald-600 hover:text-emerald-500">Download</a></li>
                    <li className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors border border-transparent dark:border-gray-700"><div className="flex items-center"><CurrencyDollarIcon className="h-5 w-5 text-emerald-500 mr-2" /><p className="font-semibold text-sm text-gray-800 dark:text-gray-200">Payslip - July 2025</p></div><a href="#" className="text-xs font-semibold text-emerald-600 hover:text-emerald-500">Download</a></li>
                  </ul>
                </InfoCard>
              </div>
            </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;