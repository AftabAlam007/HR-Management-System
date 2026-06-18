import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { CurrencyDollarIcon } from '../../../components/ui/Icons'; // Assuming you have this icon

const Payslips = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [payslips, setPayslips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                setCurrentUser(jwtDecode(token));
            } catch (error) {
                console.error("Invalid Token:", error);
            }
        }
        
        const fetchPayslips = async () => {
            if (!token) return;
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/user/payslips', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setPayslips(response.data);
            } catch (err) {
                toast.error("Could not fetch your payslips.");
            } finally {
                setLoading(false);
            }
        };

        fetchPayslips();
    }, []);

    const handleDownload = (payslip) => {
        // In a real application, this would trigger a download from a secure URL.
        // For this demo, we use a toast to simulate the action.
        toast.success(`Downloading payslip for ${payslip.month}... (Simulated)`);
    };

    const getStatusColor = (status) => {
        return status === "Paid" ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
    };

    return (
        <DashboardLayout
            role="user"
            title="My Payslips"
            userName={currentUser?.fullName || 'Employee'}
            userEmail={currentUser?.sub || ''}
        >
            <div className="p-8">
                <div className="p-8 max-w-4xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-lg">
                    <div className="flex items-center mb-6">
                        <CurrencyDollarIcon className="h-8 w-8 text-emerald-600 mr-3" />
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Your Payslip History</h1>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-50 dark:bg-gray-800/50">
                                <tr className="border-b dark:border-gray-700">
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-sm">Pay Period</th>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-sm">Net Amount</th>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-sm">Status</th>
                                    <th className="text-right px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="4" className="text-center p-6 text-gray-500 dark:text-gray-400">Loading payslips...</td></tr>
                                ) : payslips.length === 0 ? (
                                    <tr><td colSpan="4" className="text-center p-6 text-gray-500 dark:text-gray-400">No payslips found.</td></tr>
                                ) : (
                                    payslips.map((payslip) => (
                                        <tr key={payslip.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 border-b dark:border-gray-700 transition-colors">
                                            <td className="px-4 py-4 font-medium text-gray-800 dark:text-gray-200">{payslip.month}</td>
                                            <td className="px-4 py-4 text-gray-700 dark:text-gray-300 font-mono">${payslip.amount.toLocaleString()}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payslip.status)}`}>
                                                    {payslip.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button 
                                                    onClick={() => handleDownload(payslip)}
                                                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                                                >
                                                    Download
                                                </button>
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

export default Payslips;