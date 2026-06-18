import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    WorkBridgeLogoIcon,
    ChartBarIcon,
    UsersIcon,
    BriefcaseIcon,
    CurrencyDollarIcon,
    CalendarDaysIcon,
    UserCircleIcon,
    CogIcon,
    ShieldCheckIcon,
    LogoutIcon,
} from '../ui/Icons'; // Ensure path is correct

const SidebarLink = ({ icon, text, to, active }) => (
    <Link
        to={to}
        className={`group flex items-center px-4 py-2.5 rounded-xl transition-all duration-300 ${
            active
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 font-semibold'
                : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-2 hover:shadow-sm'
        }`}
    >
        <div className={`${active ? 'animate-pulse' : 'group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300'}`}>
            {icon}
        </div>
        <span className="ml-3 tracking-wide">{text}</span>
    </Link>
);

const DashboardLayout = ({ children, role, title, userName, userEmail }) => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // Global Dark Mode State
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);

    const roleLinks = {
        admin: {
            mainNav: [
                { icon: <ChartBarIcon className="h-5 w-5" />, text: 'Dashboard', to: '/admin/dashboard' },
                { icon: <UsersIcon className="h-5 w-5" />, text: 'User Management', to: '/admin/user-management' },
                { icon: <CogIcon className="h-5 w-5" />, text: 'System Settings', to: '/admin/system-settings' },
                { icon: <ShieldCheckIcon className="h-5 w-5" />, text: 'Compliance', to: '/admin/compliance' },
                { icon: <ChartBarIcon className="h-5 w-5" />, text: 'Reports', to: '/admin/reports' },
            ],
            footerNav: [
                { icon: <UserCircleIcon className="h-5 w-5" />, text: 'Profile', to: '/admin/profile' },
                { icon: <CogIcon className="h-5 w-5" />, text: 'Settings', to: '/admin/settings' },
            ]
        },
        hr: {
            // --- THIS IS THE CORRECTED SECTION ---

            mainNav: [
                { icon: <ChartBarIcon className="h-5 w-5" />, text: 'Dashboard', to: '/hr/dashboard' },
                { icon: <UsersIcon className="h-5 w-5" />, text: 'Employees', to: '/hr/employees' },
                { icon: <BriefcaseIcon className="h-5 w-5" />, text: 'Recruitment', to: '/hr/recruitment' },
                { icon: <CalendarDaysIcon className="h-5 w-5" />, text: 'Leave', to: '/hr/leave' },
                { icon: <CurrencyDollarIcon className="h-5 w-5" />, text: 'Payroll', to: '/hr/payroll' },
            ],
            footerNav: [
                // Update these with real HR Profile/Settings pages when you create them
                { icon: <UserCircleIcon className="h-5 w-5" />, text: 'Profile', to: '#' },
                { icon: <CogIcon className="h-5 w-5" />, text: 'Settings', to: '#' },

            ]
        },
        user: {
            mainNav: [
                { icon: <ChartBarIcon className="h-5 w-5" />, text: 'My Dashboard', to: '/user/dashboard' },
                { icon: <CalendarDaysIcon className="h-5 w-5" />, text: 'Leave', to: '/user/leave-application' },
                { icon: <CurrencyDollarIcon className="h-5 w-5" />, text: 'Payslips', to: '/user/payslips' },
            ],
            footerNav: [
                { icon: <UserCircleIcon className="h-5 w-5" />, text: 'Profile', to: '/user/profile' },
                { icon: <CogIcon className="h-5 w-5" />, text: 'Settings', to: '/user/settings' },
            ]
        },
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-transparent font-sans">
            <aside className={`flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-20'} bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl border-r border-white/40 dark:border-gray-800/50 flex flex-col transition-all duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)] z-20`}>
                <div className="h-16 flex items-center justify-center border-b border-gray-200/50 dark:border-gray-800/50 flex-shrink-0">
                    <div className="text-emerald-600 dark:text-emerald-400">
                        <WorkBridgeLogoIcon />
                    </div>
                    {isSidebarOpen && <span className="ml-2 text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 tracking-tight">WorkBridge</span>}
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {roleLinks[role].mainNav.map(link => (
                        <SidebarLink key={link.text} {...link} active={window.location.pathname === link.to} />
                    ))}
                </nav>
                <div className="px-4 py-6 border-t border-gray-200/50 dark:border-gray-800/50 space-y-2">
                    {roleLinks[role].footerNav.map(link => (
                        <SidebarLink key={link.text} {...link} active={window.location.pathname === link.to} />
                    ))}
                    <button onClick={handleLogout} className="group flex items-center w-full px-4 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 hover:translate-x-2 hover:shadow-sm transition-all duration-300">
                        <div className="group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                            <LogoutIcon className="h-5 w-5"/>
                        </div>
                        {isSidebarOpen && <span className="ml-3 font-medium tracking-wide">Logout</span>}
                    </button>
                </div>
            </aside>
            <div className="flex-1 flex flex-col overflow-hidden bg-transparent">
                <header className="h-16 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 z-10">
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-500 focus:outline-none lg:hidden">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white ml-4">{title}</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        
                        {/* Dark Mode Toggle Button (Sun/Moon) */}
                        <button onClick={() => setIsDarkMode(!isDarkMode)} className="relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden focus:outline-none transition-transform duration-300 hover:scale-110 active:scale-95 group" aria-label="Toggle Dark Mode">
                            <span className="absolute inset-[-150%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,#ef4444,#eab308,#22c55e,#06b6d4,#3b82f6,#d946ef,#ef4444)] opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="relative flex items-center justify-center w-[calc(100%-4px)] h-[calc(100%-4px)] bg-white dark:bg-gray-900 rounded-full z-10">
                                {isDarkMode ? (
                                    <svg className="w-4 h-4 text-yellow-500 group-hover:rotate-90 transition-transform duration-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                ) : (
                                    <svg className="w-4 h-4 text-indigo-600 group-hover:-rotate-12 transition-transform duration-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                                )}
                            </span>
                        </button>

                        <div className="text-right mr-4">
                            <p className="font-semibold text-gray-800 dark:text-gray-100">{userName}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{userEmail}</p>
                        </div>
                        <div className="relative">
                            <div 
                                className="relative cursor-pointer hover:scale-105 transition-transform duration-300"
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            >
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'User')}&background=0d9488&color=fff&rounded=true&bold=true`} 
                                    alt="User Avatar" 
                                    className="h-10 w-10 rounded-full border-2 border-emerald-500/50 shadow-sm object-cover"
                                />
                                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900"></span>
                            </div>
                            
                            {/* Profile Dropdown Menu */}
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/40 dark:border-gray-700/50 overflow-hidden z-50 transition-all">
                                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                                        <p className="text-sm text-gray-900 dark:text-white font-semibold truncate">{userName}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userEmail}</p>
                                    </div>
                                    <div className="py-1 border-b border-gray-100 dark:border-gray-800">
                                        <Link to={`/${role}/profile`} onClick={() => setIsProfileDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">My Profile</Link>
                                        <Link to={`/${role}/settings`} onClick={() => setIsProfileDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Account Settings</Link>
                                    </div>
                                    <div className="py-1">
                                        <button onClick={() => { setIsProfileDropdownOpen(false); handleLogout(); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">Sign out</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent relative z-0">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;