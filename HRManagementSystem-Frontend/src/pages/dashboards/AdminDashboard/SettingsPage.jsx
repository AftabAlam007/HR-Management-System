import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { Breadcrumb } from '../../../components/layout/Breadcrumb';

const SettingsPage = () => {
  const [personalSettings, setPersonalSettings] = useState({
    emailNotifications: true,
    darkMode: localStorage.getItem('darkMode') === 'true',
    language: 'en-US',
    timezone: 'UTC',
  });

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
          try {
              setCurrentUser(jwtDecode(token));
          } catch (error) {
              console.error("Invalid token:", error);
          }
      }
  }, []);

  // Ye effect dark mode ko toggle karega jab bhi state change hogi
  useEffect(() => {
    if (personalSettings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', personalSettings.darkMode);
  }, [personalSettings.darkMode]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Personal Settings:", personalSettings);
    alert("Personal settings saved successfully! (Simulated)");
    // In a real app, send to API
  };

  return (
    <DashboardLayout
        role="admin"
        title="Account Settings"
        userName={currentUser?.fullName || 'System Admin'}
        userEmail={currentUser?.sub || ''}
    >
        <div className="p-8">
            <div className="mb-6">
                <Breadcrumb items={[{ label: 'Admin Dashboard', href: '/admin/dashboard' }, { label: 'Account Settings' }]} />
            </div>

            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Your Account Preferences</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Manage your personal settings, including notifications, display preferences, and regional options.
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">Notifications</h3>
                        <div className="flex items-center justify-between">
                            <div>
                                <label htmlFor="emailNotifications" className="block font-medium text-gray-800 dark:text-gray-300">Email Notifications</label>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Receive alerts for important system updates.</p>
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

                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">Display Preferences</h3>
                        <div className="flex items-center justify-between">
                            <div>
                                <label htmlFor="darkMode" className="block font-medium text-gray-800 dark:text-gray-300">Enable Dark Mode</label>
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

                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">Regional Settings</h3>
                        <div className="mt-2">
                            <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
                            <select
                                name="language"
                                id="language"
                                value={personalSettings.language}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                            >
                                <option value="en-US">English (US)</option>
                                <option value="en-GB">English (UK)</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Timezone</label>
                            <select
                                name="timezone"
                                id="timezone"
                                value={personalSettings.timezone}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                            >
                                <option value="UTC">UTC</option>
                                <option value="America/New_York">America/New_York</option>
                                <option value="Europe/London">Europe/London</option>
                                <option value="Asia/Tokyo">Asia/Tokyo</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-2 text-right">
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-md font-semibold text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                        >
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </DashboardLayout>
  );
};

export default SettingsPage;