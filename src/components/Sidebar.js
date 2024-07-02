import React from "react";
import {
  HomeIcon,
  UserIcon,
  Cog6ToothIcon as CogIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ isOpen, onClose, onTabClick }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:inset-0`}
    >
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-2xl font-semibold">Admin Dashboard</span>
      </div>
      <nav className="mt-8">
        <a
          className="flex items-center py-3 px-6 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
          onClick={() => onTabClick("home")}
        >
          <HomeIcon className="h-6 w-6 mr-3" />
          Home
        </a>
        <a
          className="flex items-center py-3 px-6 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
          onClick={() => onTabClick("users")}
        >
          <UserIcon className="h-6 w-6 mr-3" />
          Users
        </a>
        <a
          className="flex items-center py-3 px-6 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
          onClick={() => onTabClick("addDoctor")}
        >
          <PlusIcon className="h-6 w-6 mr-3" />
          Add Doctor
        </a>
        <a
          className="flex items-center py-3 px-6 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
          onClick={() => onTabClick("settings")}
        >
          <CogIcon className="h-6 w-6 mr-3" />
          Settings
        </a>
      </nav>
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 text-white"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;
