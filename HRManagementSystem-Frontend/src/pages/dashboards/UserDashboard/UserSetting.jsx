import React, { useState } from 'react';
// Make sure this path is correct for your project structure
import DashboardLayout from '../../../components/layout/DashboardLayout'; 

const UserSettings = () => {
  // State and handlers for the settings page would go here
  const [personalSettings, setPersonalSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    language: 'en-US',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPersonalSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleToggle = (settingName) => {
    setPersonalSettings(prev => ({
      ...prev,
      [settingName]: !prev[settingName]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved! (Simulated)");
  };

  return (
    // The page now includes its own layout
    <DashboardLayout
      role="user"
      title="Settings"
      userName="Aftab Alam" // This could come from a global state/context later
      userEmail="user@workbridge.com"
    >
      <div className="p-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Account Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Example Setting: Dark Mode */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-6">
              <div>
                <label className="block font-medium text-gray-800 dark:text-gray-300">Enable Dark Mode</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Switch to a darker theme for your dashboard.</p>
              </div>
              <button
                  type="button"
                  onClick={() => handleToggle('darkMode')}
                  className={`${personalSettings.darkMode ? 'bg-green-600' : 'bg-gray-300'} relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
              >
                  <span className={`${personalSettings.darkMode ? 'translate-x-8' : 'translate-x-1'} inline-block h-5 w-5 transform rounded-full bg-white transition-transform`} />
              </button>
            </div>
            {/* Example Setting: Notifications */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-6">
               <div>
                <label className="block font-medium text-gray-800 dark:text-gray-300">Email Notifications</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates and alerts in your inbox.</p>
              </div>
              <button
                  type="button"
                  onClick={() => handleToggle('emailNotifications')}
                  className={`${personalSettings.emailNotifications ? 'bg-green-600' : 'bg-gray-300'} relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
              >
                  <span className={`${personalSettings.emailNotifications ? 'translate-x-8' : 'translate-x-1'} inline-block h-5 w-5 transform rounded-full bg-white transition-transform`} />
              </button>
            </div>
            <div className="pt-2 text-right">
              <button type="submit" className="px-6 py-2 rounded-md font-semibold text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserSettings;