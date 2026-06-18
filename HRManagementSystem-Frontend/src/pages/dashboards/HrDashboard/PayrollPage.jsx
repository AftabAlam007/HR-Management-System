import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { CurrencyDollarIcon, UsersIcon } from '../../../components/ui/Icons';
import PayrollDetailsModal from '../../../components/modals/PayrollDetailsModal';

const PayrollPage = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Current');
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    // Can be made dynamic, e.g., based on the current date
    const currentPayPeriod = "September 2025";
    const nextPayPeriod = "October 2025";

    // --- DATA FETCHING ---
    const fetchPayrollData = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:8080/api/hr/payroll-records', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setRecords(response.data);
        } catch (err) {
            toast.error(`Failed to fetch payroll records: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPayrollData();
    }, [fetchPayrollData]);

    // --- ACTION HANDLERS ---
    const handleGeneratePayroll = () => {
        const promise = axios.post('http://localhost:8080/api/hr/payroll/generate', { payPeriod: nextPayPeriod }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });

        toast.promise(promise, {
            loading: `Generating payroll for ${nextPayPeriod}...`,
            success: () => {
                fetchPayrollData(); // Re-fetch all data to show the newly generated records
                return `Payroll for ${nextPayPeriod} has been generated successfully.`;
            },
            error: (err) => err.response?.data?.message || "Failed to generate payroll."
        });
    };

    const handleRunPayroll = () => {
        const promise = axios.post('http://localhost:8080/api/hr/payroll/run', { payPeriod: currentPayPeriod }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });

        toast.promise(promise, {
            loading: `Processing payroll for ${currentPayPeriod}...`,
            success: (response) => {
                fetchPayrollData(); // Re-fetch to show the updated "Paid" status
                return response.data.message;
            },
            error: (err) => err.response?.data?.message || "Failed to run payroll."
        });
    };

    const handleViewDetails = (record) => {
        // Since the backend calculates the core numbers, we can create mock details for the modal display
        // In a production app, the backend might send this detailed breakdown as well.
        const mockDetails = {
            earnings: [
                { item: 'Gross Pay (Calculated)', amount: record.grossPay }
            ],
            deductions: [
                { item: 'Total Deductions (Calculated)', amount: record.deductions }
            ]
        };
        setSelectedRecord({ ...record, details: mockDetails });
        setIsDetailsModalOpen(true);
    };

    // --- UI HELPER & DATA DERIVATION ---
    const getStatusColor = (status) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Processing': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const currentRecords = records.filter(r => r.payPeriod === currentPayPeriod);
    const pastRecords = records.filter(r => r.payPeriod !== currentPayPeriod);
    const recordsToDisplay = activeTab === 'Current' ? currentRecords : pastRecords;
    const totalPayroll = currentRecords.reduce((sum, record) => sum + record.netPay, 0);
    const employeesToPay = currentRecords.filter(r => r.status === 'Pending').length;

    return (
        <DashboardLayout role="hr" title="Payroll" userName="Zakir Hussain" userEmail="zakir.h@workbridge.com">
            <PayrollDetailsModal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} record={selectedRecord} />
            <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Payroll Management</h2>
                        <p className="text-gray-600 mt-1">Generate, review, and process payments for pay periods.</p>
                    </div>
                    <div className="flex gap-x-4">
                         <button onClick={handleGeneratePayroll} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0">
                            Generate for {nextPayPeriod}
                        </button>
                        <button onClick={handleRunPayroll} disabled={employeesToPay === 0} className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex-shrink-0">
                            Run Payroll ({employeesToPay})
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <CurrencyDollarIcon className="h-8 w-8 text-green-500 mb-2" />
                        <h3 className="text-gray-500 text-sm font-medium uppercase">Total Net Payroll (Current)</h3>
                        <p className="text-3xl font-bold text-gray-800">₹{totalPayroll.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <UsersIcon className="h-8 w-8 text-blue-500 mb-2" />
                        <h3 className="text-gray-500 text-sm font-medium uppercase">Employees in this Run</h3>
                        <p className="text-3xl font-bold text-gray-800">{currentRecords.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <UsersIcon className="h-8 w-8 text-yellow-500 mb-2" />
                        <h3 className="text-gray-500 text-sm font-medium uppercase">Payments Pending</h3>
                        <p className="text-3xl font-bold text-gray-800">{employeesToPay}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="border-b border-gray-200 mb-4">
                        <nav className="-mb-px flex space-x-6">
                            <button onClick={() => setActiveTab('Current')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'Current' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                                Current Period ({currentPayPeriod})
                            </button>
                            <button onClick={() => setActiveTab('Past')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'Past' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                                Past Payrolls
                            </button>
                        </nav>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left bg-white">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="p-3 font-semibold text-gray-600">Employee</th>
                                    <th className="p-3 font-semibold text-gray-600 text-right">Gross Pay</th>
                                    <th className="p-3 font-semibold text-gray-600 text-right">Deductions</th>
                                    <th className="p-3 font-semibold text-gray-600 text-right">Net Pay</th>
                                    <th className="p-3 font-semibold text-gray-600">Status</th>
                                    <th className="p-3 font-semibold text-gray-600">Pay Date</th>
                                    <th className="p-3 font-semibold text-gray-600 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="7" className="text-center p-6 text-gray-500">Loading payroll records...</td></tr>
                                ) : recordsToDisplay.length === 0 ? (
                                    <tr><td colSpan="7" className="text-center p-6 text-gray-500">No payroll records found for this period.</td></tr>
                                ) : (
                                    recordsToDisplay.map(record => (
                                        <tr key={record.id} className="border-b hover:bg-gray-50">
                                            <td className="p-3 font-medium text-gray-800">{record.employeeName}</td>
                                            <td className="p-3 text-gray-700 text-right">₹{record.grossPay.toLocaleString('en-IN')}</td>
                                            <td className="p-3 text-red-600 text-right">(₹{record.deductions.toLocaleString('en-IN')})</td>
                                            <td className="p-3 font-bold text-gray-800 text-right">₹{record.netPay.toLocaleString('en-IN')}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>{record.status}</span>
                                            </td>
                                            <td className="p-3 text-gray-700">{record.payDate || '—'}</td>
                                            <td className="p-3 text-right">
                                                <button onClick={() => handleViewDetails(record)} className="text-blue-600 hover:underline text-sm">View Details</button>
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
export default PayrollPage;