import React, { useState } from "react";
import { Bars3Icon as MenuIcon } from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import DoctorList from "./DoctorList";
import AddDoctorForm from "./AddDoctorForm";

const Dashboard = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onTabClick={handleTabClick}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={onLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {activeTab === "home" && (
              <div className="px-4 py-6 sm:px-0">
                <h2 className="text-2xl font-semibold mb-4">
                  Welcome to your Dashboard
                </h2>
                <p className="mb-4">Here are some quick statistics:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                    <p className="text-3xl font-bold">1,234</p>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Revenue</h3>
                    <p className="text-3xl font-bold">$56,789</p>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Active Projects
                    </h3>
                    <p className="text-3xl font-bold">23</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "users" && <DoctorList />}
            {activeTab === "addDoctor" && <AddDoctorForm />}
            {activeTab === "settings" && (
              <div className="px-4 py-6 sm:px-0">
                <h2 className="text-2xl font-semibold mb-4">Settings</h2>
                <p>Settings content goes here.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
