// src/pages/dashboards/HrDashboard/HrSettingsPage.js
import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const HrSettingsPage = () => {
  // State to manage the HR user's personal settings
  const [personalSettings, setPersonalSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    language: 'en-US',
  });

  // Handler to update state when a form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPersonalSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleToggle = (settingName) => {
    setPersonalSettings(prev => ({
      ...prev,
      [settingName]: !prev[settingName]
    }));
  };

  // Handler to simulate saving the settings
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving HR Settings:", personalSettings);
    alert("Your settings have been saved successfully! (Simulated)");
    // In a real application, you would send this data to an API endpoint.
  };

  return (
    <DashboardLayout
      role="hr"
      title="Account Settings"
      userName="Zakir Hussain"
      userEmail="zakir.h@workbridge.com"
    >
      <div className="p-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Personal Account Settings</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* --- Notification Settings Section --- */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">Notifications</h3>
              <div className="flex items-center justify-between">
                <div>
                  <label className="block font-medium text-gray-800 dark:text-gray-300">Email Notifications</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive alerts for new applicants and leave requests in your inbox.</p>
                </div>
                <button
                    type="button"
                    onClick={() => handleToggle('emailNotifications')}
                    className={`${personalSettings.emailNotifications ? 'bg-green-600' : 'bg-gray-300'} relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                >
                    <span className={`${personalSettings.emailNotifications ? 'translate-x-8' : 'translate-x-1'} inline-block h-5 w-5 transform rounded-full bg-white transition-transform`} />
                </button>
              </div>
            </div>

            {/* --- Theme/Display Settings Section --- */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">Display Preferences</h3>
              <div className="flex items-center justify-between">
                <div>
                  <label className="block font-medium text-gray-800 dark:text-gray-300">Enable Dark Mode</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Switch the dashboard to a darker, eye-friendly theme.</p>
                </div>
                <button
                    type="button"
                    onClick={() => handleToggle('darkMode')}
                    className={`${personalSettings.darkMode ? 'bg-green-600' : 'bg-gray-300'} relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                >
                    <span className={`${personalSettings.darkMode ? 'translate-x-8' : 'translate-x-1'} inline-block h-5 w-5 transform rounded-full bg-white transition-transform`} />
                </button>
              </div>
            </div>

            {/* --- Action Buttons --- */}
            <div className="pt-2 text-right">
              <button
                type="submit"
                className="px-6 py-2 rounded-md font-semibold text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Save Changes
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HrSettingsPage;