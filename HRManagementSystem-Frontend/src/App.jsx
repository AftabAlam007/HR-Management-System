import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// --- Landing and Auth Pages ---
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import AdminSignup from './pages/AdminSignup';
import CareersPage from './pages/CareersPage';

// --- Onboarding Flow Pages ---
import ForceResetPassword from './pages/ForcedResetPassword';
import AcceptInvitePage from './pages/AcceptInvitePage';

// --- Dashboard Home Pages ---
import AdminDashboard from './pages/dashboards/AdminDashboard/AdminDashboard';
import HrDashboard from './pages/dashboards/HrDashboard/HrDashboard';
import UserDashboard from './pages/dashboards/UserDashboard/UserDashboard';

// --- User Dashboard Sub-Pages ---
import UserProfile from './pages/dashboards/UserDashboard/UserProfile';
import LeaveApplication from './pages/dashboards/UserDashboard/LeaveApplication';
import Payslips from './pages/dashboards/UserDashboard/Payslips';
import UserSettings from './pages/dashboards/UserDashboard/UserSetting';
import UserProfileEdit from './pages/dashboards/UserDashboard/UserProfileEdit';

// --- All Admin Section Pages ---
import UserManagementPage from './pages/dashboards/AdminDashboard/UserManagement';
import SystemSettingsPage from './pages/dashboards/AdminDashboard/SystemSettings';
import CompliancePage from './pages/dashboards/AdminDashboard/Compliance';
import ReportsPage from './pages/dashboards/AdminDashboard/ReportsPage';
import ProfilePage from './pages/dashboards/AdminDashboard/ProfilePage';
import SettingsPage from './pages/dashboards/AdminDashboard/SettingsPage';

// --- HR Section Pages ---
import EmployeesPage from './pages/dashboards/HrDashboard/EmployeesPage';
import RecruitmentPage from './pages/dashboards/HrDashboard/RecruitmentPage';
import LeaveManagementPage from './pages/dashboards/HrDashboard/LeaveManagementPage';
import PayrollPage from './pages/dashboards/HrDashboard/PayrollPage';
import HrProfilePage from './pages/dashboards/HrDashboard/HrProfilePage';
import HrSettingsPage from './pages/dashboards/HrDashboard/HrSettingsPage';
import HrProfileEditPage from './pages/dashboards/HrDashboard/HrProfileEditPage';

function App() {
  return (
<>
     <Toaster 
        position="top-right" // You can change the position
        toastOptions={{
          // Define default options
          duration: 5000, // Toasts last for 5 seconds
          style: {
            background: '#363636',
            color: '#fff',
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />




      {/* --- GLOBAL DYNAMIC 3D AURORA BACKGROUND --- */}
      <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden bg-slate-50 dark:bg-[#09090b] transition-colors duration-500">
          {/* Animated Rotating Gradient Orbs */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-cyan-300/50 to-blue-400/50 dark:from-cyan-800/30 dark:to-blue-900/30 blur-[100px] animate-[spin_15s_linear_infinite]"></div>
          <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-pink-300/50 to-rose-400/50 dark:from-pink-800/30 dark:to-rose-900/30 blur-[120px] animate-[spin_20s_linear_infinite_reverse]"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-yellow-200/50 to-emerald-300/50 dark:from-yellow-800/20 dark:to-emerald-900/20 blur-[130px] animate-[spin_25s_linear_infinite]"></div>
          
          {/* Premium Micro-Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_30%,#000_60%,transparent_100%)]"></div>
      </div>

    <Routes>
      {/* --- Landing and Authentication Routes --- */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
       <Route path="/careers" element={<CareersPage />} />
      <Route path="/signup/admin" element={<AdminSignup />} />
      
      {/* --- Onboarding Routes for New Users --- */}
      <Route path="/accept-invite" element={<AcceptInvitePage />} />
      <Route path="/force-reset-password" element={<ForceResetPassword />} />

      {/* --- Admin Routes --- */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/user-management" element={<UserManagementPage />} />
      <Route path="/admin/system-settings" element={<SystemSettingsPage />} />
      <Route path="/admin/compliance" element={<CompliancePage />} />
      <Route path="/admin/reports" element={<ReportsPage />} />
      <Route path="/admin/profile" element={<ProfilePage />} />
      <Route path="/admin/settings" element={<SettingsPage />} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

      {/* --- HR Routes --- */}
      <Route path="/hr/dashboard" element={<HrDashboard />} />
      <Route path="/hr/employees" element={<EmployeesPage />} />
      <Route path="/hr/recruitment" element={<RecruitmentPage />} />
      <Route path="/hr/leave" element={<LeaveManagementPage />} />
      <Route path="/hr/payroll" element={<PayrollPage />} />
      <Route path="/hr/profile" element={<HrProfilePage />} />
      <Route path="/hr/profile/edit" element={<HrProfileEditPage />} />
      <Route path="/hr/settings" element={<HrSettingsPage />} />
      <Route path="/hr" element={<Navigate to="/hr/dashboard" />} />

      {/* --- User Routes --- */}
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/user/profile/edit" element={<UserProfileEdit />} />
      <Route path="/user/leave-application" element={<LeaveApplication />} />
      <Route path="/user/payslips" element={<Payslips />} />
      <Route path="/user/settings" element={<UserSettings />} />
      <Route path="/user" element={<Navigate to="/user/dashboard" />} />

      {/* --- 404 Not Found Page --- */}
      <Route path="*" element={
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: '48px', color: '#333' }}>404 - Page Not Found</h1>
          <p style={{ fontSize: '18px', color: '#666' }}>The page you are looking for does not exist.</p>
          <Link to="/" style={{ color: '#007bff', textDecoration: 'underline', fontSize: '18px', marginTop: '20px', display: 'inline-block' }}>Go to Homepage</Link>
        </div>
      } />
    </Routes>
    </>
  );
}

export default App;