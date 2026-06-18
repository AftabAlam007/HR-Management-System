import React, { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { PencilIcon } from "../../../components/ui/Icons";
import profileImg from "../../../assets/Image/profileimg.png";

const menuItems = [
  "Personal Details",
  "Contact Details",
  "Education Qualifications",
];

const UserProfile = () => {
  const [activeMenu, setActiveMenu] = useState("Personal Details");

  const renderContent = () => {
    switch (activeMenu) {
      case "Personal Details":
        return (
          <div className="p-6 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Details</h2>
<button
  className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
  onClick={() => window.location.href = "/user/profile/edit"}
>
  <PencilIcon className="h-5 w-5" />
  <span>Edit</span>
</button>
            </div>
            <div className="flex flex-col items-center space-y-6">
              <div className="bg-yellow-400 rounded-full p-6">
                <img
                  src={profileImg}
                  alt="Profile Avatar"
                  className="h-40 w-40 rounded-full"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-xl text-gray-900 dark:text-white">Aftab Alam</p>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Employee Name</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">Computer Science</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
              </div>
              <div className="flex justify-between w-full max-w-md mt-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700/50">
                <div>
                  <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                    Java Fullstack Developer
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Job Title</p>
                </div>
                <div>
                  <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">Full time</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Job Category</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "Contact Details":
        return (
          <div className="p-6 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Details</h2>
            </div>
            <div className="grid grid-cols-2 gap-6 max-w-4xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number 1
                </label>
                <input
                  type="text"
                  defaultValue="Phone Number 1"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number 2
                </label>
                <input
                  type="text"
                  defaultValue="Phone Number 2"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  E-mail Address
                </label>
                <input
                  type="email"
                  defaultValue="johndoe@gmail.com"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  State of residence
                </label>
                <input
                  type="text"
                  defaultValue="Phone Number 1"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  defaultValue="Phone Number 2"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Residential Address
                </label>
                <textarea
                  defaultValue="18 Junction site Lekki"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
                  rows={3}
                />
              </div>
              <div className="col-span-2">
                <button className="bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
                  Update
                </button>
              </div>
            </div>
          </div>
        );
      case "Education Qualifications":
        return (
          <div className="p-6 w-full max-w-6xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Academic Records / Academic Details
            </h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Name of Institution
                </label>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white p-3 rounded-lg">
                  Babcock University
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Department
                </label>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white p-3 rounded-lg">Computer Dept</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Course
                </label>
                <select className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                  <option>Software Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white p-3 rounded-lg">
                  Ogun state, Nigeria
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none style-color-scheme-dark"
                  defaultValue="1998-01-01"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none style-color-scheme-dark"
                  defaultValue="2019-01-01"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                  rows={6}
                  defaultValue={
                    "• Gathering and evaluating product requirements, in collaboration with product managers and the developers\n" +
                    "• Illustrating design ideas using storyboards, process flows, and sitemaps.\n" +
                    "• Designing graphic user interface pages and elements, like menus, tabs, and widgets\n" +
                    "• Design wireframes, mockups, storyboards, and fully interactive prototype design"
                  }
                />
              </div>
              <div className="col-span-2">
                <button className="bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
                  Update
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="text-gray-500 dark:text-gray-400">Select a menu item to view details.</div>;
    }
  };

  return (
    <DashboardLayout
      role="user"
      title="My Profile"
      userName="Aftab Alam"
      userEmail="user@workbridge.com"
    >
      <div className="p-6 bg-transparent min-h-screen">
        <div className="max-w-6xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-lg flex overflow-hidden">
          {/* Left menu */}
          <div className="w-1/4 bg-gray-50/50 dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700 p-6 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveMenu(item)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeMenu === item
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-md"
                    : "text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right content */}
          <div className="w-3/4 p-6">{renderContent()}</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;