import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheckIcon, HomeIcon, WorkBridgeLogoIcon } from '../components/ui/Icons';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '', // Matched to the backend model
    organizationName: '',
    // adminKey is now removed
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match.");
    if (formData.password.length < 8) return setError("Password must be at least 8 characters long.");
    if (!formData.agreeTerms) return setError("You must agree to the Administrator Agreement.");
    
    setIsSubmitting(true);
    try {
        const { confirmPassword, agreeTerms, ...apiData } = formData;
        
        const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
        const response = await axios.post(`${API_URL}/auth/register/admin`, apiData);

        localStorage.setItem('authToken', response.data.token);
        alert("Admin account created successfully! You are now being logged in.");
        navigate('/admin/dashboard');

    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
        } else {
            setError(err.message || 'Registration failed. Please try again.');
        }
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto lg:grid lg:grid-cols-2 rounded-xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl">
        <Link 
            to="/" 
            className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full overflow-hidden focus:outline-none transition-transform duration-300 hover:scale-110 active:scale-95 group z-20"
            aria-label="Back to Home"
        >
            <span className="absolute inset-[-150%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,#ef4444,#eab308,#22c55e,#06b6d4,#3b82f6,#d946ef,#ef4444)] opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center justify-center w-[calc(100%-4px)] h-[calc(100%-4px)] bg-white dark:bg-gray-900 rounded-full z-10 text-gray-800 dark:text-white">
                <HomeIcon className="h-5 w-5 group-hover:animate-pulse" />
            </span>
        </Link>
        <div 
          className="hidden lg:flex flex-col items-center justify-center p-12 bg-cover bg-center text-white relative overflow-hidden"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070')" }}
        >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute -bottom-32 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-pink-500"></div>
            <h1 className="relative text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-orange-400 to-pink-400 animate-gradient">Administrator Control</h1>
            <p className="relative text-center max-w-sm text-gray-200 bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                Register as the first administrator for your organization.
            </p>
        </div>
        <div className="p-8 md:p-10">
            <div className="text-center mb-8">
                <Link to="/" className="flex items-center justify-center transition-colors mb-4 group">
                    <span className="text-pink-500 mr-2 group-hover:text-pink-400 transition-colors"><WorkBridgeLogoIcon /></span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 group-hover:from-pink-400 group-hover:to-orange-400 transition-all duration-300">WorkBridge</span>
                </Link>
                <div className="flex justify-center mb-2"><ShieldCheckIcon /></div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Create Admin Account</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow" required />
                <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow" required />
                <input type="text" name="organizationName" placeholder="Organization Name" value={formData.organizationName} onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow" required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow" required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow" required />
                <div className="flex items-start"><div className="flex items-center h-5"><input id="agreeTerms" name="agreeTerms" type="checkbox" checked={formData.agreeTerms} onChange={handleChange} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" /></div><div className="ml-3 text-sm"><label htmlFor="agreeTerms" className="font-medium text-gray-800 dark:text-gray-200">I agree to the <a href="#" className="text-green-600 dark:text-green-400 hover:underline">Terms & Conditions</a></label></div></div>
                <button type="submit" disabled={isSubmitting} className="relative inline-flex items-center justify-center w-full p-[2px] rounded-lg overflow-hidden group transition-transform hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-70 mt-4">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,#ef4444,#eab308,#22c55e,#06b6d4,#3b82f6,#d946ef,#ef4444)] opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center justify-center w-full py-3 px-4 bg-gray-900 dark:bg-gray-900 rounded-md z-10 text-sm font-bold text-white group-hover:bg-opacity-90 transition-colors">
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </span>
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};
export default AdminSignup;