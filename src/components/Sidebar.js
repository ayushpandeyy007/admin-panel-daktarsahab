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
          Doctors List
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>
          Appointments
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
