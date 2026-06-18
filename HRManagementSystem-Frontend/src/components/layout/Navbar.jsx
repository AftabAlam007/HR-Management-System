import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WorkBridgeLogoIcon } from '../ui/Icons';

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);

    return (
        <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-800 dark:text-gray-100 sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-green-700 dark:text-green-500" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <WorkBridgeLogoIcon />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 group-hover:from-pink-400 group-hover:to-orange-400 transition-all duration-300">WorkBridge</span>                </Link>
                <div className="hidden md:flex items-center gap-2 lg:gap-4">
                    <a href="/#home" className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-white hover:animate-rgb-blink transition-all duration-300">
                        Home
                    </a>
                    <a href="/#solutions" className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-white hover:animate-rgb-blink transition-all duration-300">
                        Solutions
                    </a>
                    <a href="/#resources" className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-white hover:animate-rgb-blink transition-all duration-300">
                        Resources
                    </a>
                    <a href="/#company" className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-white hover:animate-rgb-blink transition-all duration-300">
                        Company
                    </a>
                </div>
                <div className="flex items-center space-x-4">
                    {/* Dark Mode Toggle Button */}
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

                    <Link to="/login" className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-white hover:animate-rgb-blink transition-all duration-300">
                        Login
                    </Link>
                    
                    {/* --- SIMPLIFIED SIGNUP BUTTON --- */}
                    <Link 
                        to="/signup/admin"
                        className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-pink-600 hover:to-orange-600 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                        Signup
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;