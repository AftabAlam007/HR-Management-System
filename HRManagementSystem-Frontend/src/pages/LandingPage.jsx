import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ChartBarIcon, UsersIcon, BriefcaseIcon, CalendarDaysIcon } from '../components/ui/Icons';

const LandingPage = () => {
    const headlineWords = [
        { id: 0, word: 'Empower', color: 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600', line: 1, startIdx: 0, length: 7 },
        { id: 1, word: 'Your', color: 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-yellow-400', line: 1, startIdx: 8, length: 4 },
        { id: 2, word: 'Workforce', color: 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500', line: 1, startIdx: 13, length: 9 },
        { id: 3, word: 'with', color: 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400', line: 2, startIdx: 23, length: 4 },
        { id: 4, word: 'WorkBridge', color: 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-pink-500', line: 2, startIdx: 28, length: 10 },
    ];

    // Typing Animation State
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const totalChars = 38; // Total letters + spaces
    const pauseTicks = 30; // How long to wait at the end before restarting
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCharIndex(prev => {
                if (prev < totalChars + pauseTicks) {
                    return prev + 1;
                }
                return 0;
            });
        }, 80); // 80ms per character for realistic typing speed

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-transparent font-sans selection:bg-green-200 relative z-0">

            <Navbar />
            
            <main>
                {/* --- HERO SECTION (Home) --- */}
                <section id="home" className="relative pt-32 pb-16 lg:pt-24 lg:pb-24 overflow-hidden">
                    <div className="container mx-auto px-6 text-center z-10 relative">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-8 leading-tight md:leading-snug [text-wrap:balance] font-poppins">
                            {/* Line 1 */}
                            <span className="block">
                                {headlineWords.filter(w => w.line === 1).map((item) => {
                                    const charsTyped = Math.max(0, Math.min(item.length, currentCharIndex - item.startIdx));
                                    const typedText = item.word.substring(0, charsTyped);
                                    const untypedText = item.word.substring(charsTyped);
                                    
                                    const isTyping = currentCharIndex >= item.startIdx - 1 && currentCharIndex < item.startIdx + item.length;

                                    return (
                                        <span key={item.id} className="inline-block mr-2 sm:mr-3 md:mr-4 relative">
                                            <span className={item.color}>{typedText}</span>
                                            <span className="opacity-0">{untypedText}</span>
                                        </span>
                                    );
                                })}
                            </span>

                            {/* Line 2 */}
                            <span className="block mt-2">
                                {headlineWords.filter(w => w.line === 2).map((item) => {
                                    const charsTyped = Math.max(0, Math.min(item.length, currentCharIndex - item.startIdx));
                                    const typedText = item.word.substring(0, charsTyped);
                                    const untypedText = item.word.substring(charsTyped);
                                    
                                    const isTyping = currentCharIndex >= item.startIdx - 1 && currentCharIndex < item.startIdx + item.length;
                                    const isLastWordPause = item.id === 4 && currentCharIndex >= item.startIdx + item.length;

                                    return (
                                        <span key={item.id} className="inline-block mr-2 sm:mr-3 md:mr-4 relative">
                                            <span className={item.color}>{typedText}</span>
                                            <span className="opacity-0">{untypedText}</span>
                                        </span>
                                    );
                                })}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-6 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Smart, scalable, and secure HR management system designed to streamline your recruitment, payroll, and employee success.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4">
                            <Link to="/signup/admin" className="relative group px-8 py-3.5 text-white font-bold text-lg rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto">
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 group-hover:from-green-400 group-hover:via-emerald-400 group-hover:to-teal-400 transition-colors duration-500"></span>
                                <span className="relative flex items-center justify-center gap-2">
                                Get Started
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                                </span>
                            </Link>
                            <a href="#solutions" className="px-8 py-3.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-full font-bold text-lg hover:border-transparent hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                                Explore Solutions
                            </a>
                        </div>

                        {/* --- DASHBOARD PREVIEW IMAGE --- */}
                        <div className="mt-16 max-w-5xl mx-auto transform hover:scale-[1.02] transition-transform duration-500">
                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Dashboard Interface Preview" className="rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 mx-auto w-full object-cover max-h-[600px] object-top" />
                        </div>
                    </div>
                </section>

                {/* --- COMPANY SECTION (Trust Badges) --- */}
                <section id="company" className="pt-20 pb-12 bg-white dark:bg-gray-800 border-y border-gray-100 dark:border-gray-800">
                    <div className="container mx-auto px-6 text-center">
                        <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-10">Trusted by 500+ Innovative Companies</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                            {/* Stylish Company Logos using Tailwind Gradients and Shapes */}
                            <div className="flex items-center gap-3 hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg text-xl">A</div>
                                <h2 className="text-2xl font-black tracking-tight text-gray-800 dark:text-gray-100">Acme Corp</h2>
                            </div>
                            
                            <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-sm">
                                <svg className="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">TechFlow</h2>
                            </div>
                            
                            <div className="flex items-center gap-3 hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-sm">
                                <div className="w-8 h-8 bg-emerald-500 rotate-45 rounded border-2 border-emerald-200 flex items-center justify-center shadow-md">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                                <h2 className="text-2xl font-bold font-mono text-emerald-700 tracking-tighter">GLOBALNET</h2>
                            </div>
                            
                            <div className="flex items-center hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-sm">
                                <h2 className="text-3xl font-black text-rose-500 tracking-tighter">Innovate<span className="text-gray-800 dark:text-gray-100">.io</span></h2>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SOLUTIONS SECTION (Bento Grid) --- */}
                <section id="solutions" className="pt-12 pb-24 bg-slate-50 dark:bg-gray-900 scroll-mt-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Everything you need to manage your team</h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Say goodbye to scattered spreadsheets. WorkBridge brings all your HR operations into one unified, beautiful dashboard.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                    <BriefcaseIcon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Recruitment (ATS)</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Automate job postings, track applicants, and schedule interviews seamlessly.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                                    <UsersIcon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Employee Records</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Centralized database for personal details, documents, and professional history.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                                    <CalendarDaysIcon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Leave Management</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">One-click leave applications, manager approvals, and balance tracking.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                                    <ChartBarIcon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Payroll & Performance</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Automated salary calculations, dynamic payslips, and 360° performance reviews.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- RESOURCES SECTION --- */}
                <section id="resources" className="py-24 scroll-mt-20 relative z-10">
                    <div className="container mx-auto px-6">
                        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-3xl p-12 shadow-2xl text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">Resources & Results that speak for themselves</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
                                <div className="py-4 md:py-0 hover:scale-105 transition-transform duration-300">
                                    <h4 className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">98%</h4>
                                    <p className="text-gray-600 dark:text-gray-400 font-medium tracking-wide">Customer Satisfaction</p>
                                </div>
                                <div className="py-4 md:py-0 hover:scale-105 transition-transform duration-300">
                                    <h4 className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">3x</h4>
                                    <p className="text-gray-600 dark:text-gray-400 font-medium tracking-wide">Faster Recruitment</p>
                                </div>
                                <div className="py-4 md:py-0 hover:scale-105 transition-transform duration-300">
                                    <h4 className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Zero</h4>
                                    <p className="text-gray-600 dark:text-gray-400 font-medium tracking-wide">Payroll Errors</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {showScrollTop && (
                <button onClick={scrollToTop} className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 z-50 animate-bounce">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                </button>
            )}
        </div>
    );
};

export default LandingPage;