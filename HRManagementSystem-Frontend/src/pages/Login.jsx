import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios directly
import bgImage from '../assets/Image/LoginBgImg.jpg';
import { WorkBridgeLogoIcon, HomeIcon } from '../components/ui/Icons';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);
        try {
            // THE AUTHENTICATE CALL IS THE SAME, BUT THE BACKEND LOGIC IS NOW SMARTER
            const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            
            const { token, role, requiresPasswordChange } = response.data;
            localStorage.setItem('authToken', token);

            if (requiresPasswordChange) {
                navigate('/force-reset-password', { state: { email: email, role: role.toLowerCase() } });
            } else {
                const dashboardPath = `/${role.toLowerCase()}/dashboard`;
                navigate(dashboardPath);
            }
        } catch (err) {
            // The backend now throws a specific error for PENDING users, which will be caught here
            setError(err.response?.data?.message || err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent relative">
      <Link to="/" className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 rounded-full overflow-hidden focus:outline-none transition-transform duration-300 hover:scale-110 active:scale-95 group z-20">
          <span className="absolute inset-[-150%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,#ef4444,#eab308,#22c55e,#06b6d4,#3b82f6,#d946ef,#ef4444)] opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center justify-center w-[calc(100%-4px)] h-[calc(100%-4px)] bg-white dark:bg-gray-900 rounded-full z-10 text-gray-800 dark:text-white">
              <HomeIcon className="h-5 w-5 group-hover:animate-pulse" />
          </span>
      </Link>
      <div className="relative z-10 w-full max-w-md bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-gray-700/30 px-8 py-10">
        <div className="text-center mb-8">
          <Link to="/" className="text-green-700 dark:text-green-500 text-3xl font-extrabold flex items-center justify-center hover:opacity-90 transition-opacity group">
            <span className="text-pink-500 mr-2 group-hover:text-pink-400 transition-colors"><WorkBridgeLogoIcon /></span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 group-hover:from-pink-400 group-hover:to-orange-400 transition-all duration-300">WorkBridge</span>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 tracking-wider">Your Trusted Partner in HR Excellence</p>
        </div>
        {error && <div className="mb-4 p-3 bg-red-500/50 text-white rounded-lg text-center font-semibold">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">E-mail Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow placeholder-gray-500" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow placeholder-gray-500" required />
          </div>
          <button type="submit" disabled={isSubmitting} className="relative inline-flex items-center justify-center w-full p-[2px] rounded-lg overflow-hidden group transition-transform hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-70 mt-4">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,#ef4444,#eab308,#22c55e,#06b6d4,#3b82f6,#d946ef,#ef4444)] opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center w-full py-2 px-4 bg-gray-900 dark:bg-gray-900 rounded-md z-10 text-sm font-bold text-white group-hover:bg-opacity-90 transition-colors">
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
              </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;