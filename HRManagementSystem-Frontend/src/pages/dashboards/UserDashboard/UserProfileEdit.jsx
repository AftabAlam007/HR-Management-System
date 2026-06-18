import React from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";

const UserProfileEdit = () => {
  return (
    <DashboardLayout
      role="user"
      title="Edit Personal Details"
      userName="Aftab Alam"
      userEmail="user@workbridge.com"
    >
      <div className="p-6 bg-transparent min-h-screen">
        <div className="max-w-3xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Edit Personal Details</h2>
          {/* Form fields for editing personal details */}
          <form className="space-y-5 max-w-xl">
            <div>
              <label className="block font-semibold text-sm mb-1 text-gray-800 dark:text-gray-200">Employee Name</label>
              <input
                type="text"
                defaultValue="Aftab Alam"
                className="w-full p-2.5 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
              />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-1 text-gray-800 dark:text-gray-200">Department</label>
              <input
                type="text"
                defaultValue="Computer Science"
                className="w-full p-2.5 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
              />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-1 text-gray-800 dark:text-gray-200">Job Title</label>
              <input
                type="text"
                defaultValue="Java Fullstack Developer"
                className="w-full p-2.5 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
              />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-1 text-gray-800 dark:text-gray-200">Job Category</label>
              <input
                type="text"
                defaultValue="Full time"
                className="w-full p-2.5 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
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

export default UserProfileEdit;