import React, { useState, useEffect } from "react";
import { Bars3Icon as MenuIcon } from "@heroicons/react/24/outline";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "./Sidebar";
import DoctorList from "./DoctorList";
import AddDoctorForm from "./AddDoctorForm";
import axios from "axios";

const Dashboard = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [dashboardData, setDashboardData] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    doctorSpecialties: [],
    recentDoctors: [],
    averageExperience: 0,
    experienceData: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        "https://doctor-appointment-admin-y94n.onrender.com/api/doctors"
      );
      const doctors = response.data.data;

      const totalDoctors = doctors.length;

      // Infer specialties from the "About" field
      const specialtiesCount = doctors.reduce((acc, doctor) => {
        let specialty = "General";
        if (doctor.attributes.About.toLowerCase().includes("neurologist")) {
          specialty = "Neurologist";
        } else if (
          doctor.attributes.About.toLowerCase().includes("cardiologist")
        ) {
          specialty = "Cardiologist";
        } else if (
          doctor.attributes.About.toLowerCase().includes("psychiatrist")
        ) {
          specialty = "Psychiatrist";
        } else if (
          doctor.attributes.About.toLowerCase().includes("dermatologist")
        ) {
          specialty = "Dermatologist";
        }
        acc[specialty] = (acc[specialty] || 0) + 1;
        return acc;
      }, {});

      const doctorSpecialties = Object.entries(specialtiesCount).map(
        ([name, value]) => ({ name, value })
      );

      // Calculate average years of experience
      const totalExperience = doctors.reduce(
        (sum, doctor) => sum + parseInt(doctor.attributes.Year_of_Experience),
        0
      );
      const averageExperience = totalExperience / totalDoctors;

      // Prepare experience data for bar chart
      const experienceData = doctors.map((doctor) => ({
        name: doctor.attributes.Name,
        years: parseInt(doctor.attributes.Year_of_Experience),
      }));

      setDashboardData({
        totalDoctors,
        totalPatients: 0, // You'll need to fetch this from your backend
        totalAppointments: 0, // You'll need to fetch this from your backend
        doctorSpecialties,
        recentDoctors: doctors,
        averageExperience,
        experienceData,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

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
                <h2 className="text-2xl font-semibold mb-6">
                  Dashboard Overview
                </h2>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Total Doctors
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {dashboardData.totalDoctors}
                    </p>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Average Experience
                    </h3>
                    <p className="text-3xl font-bold text-green-600">
                      {dashboardData.averageExperience.toFixed(1)} years
                    </p>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Premium Doctors
                    </h3>
                    <p className="text-3xl font-bold text-purple-600">
                      {dashboardData.totalDoctors}
                    </p>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Total Appointments
                    </h3>
                    <p className="text-3xl font-bold text-orange-600">
                      {dashboardData.totalAppointments}
                    </p>
                  </div>
                </div>

                {/* Doctor Specialties Pie Chart */}
                <div className="bg-white shadow rounded-lg p-4 mb-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Doctor Specialties
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dashboardData.doctorSpecialties}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dashboardData.doctorSpecialties.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Experience Bar Chart */}
                <div className="bg-white shadow rounded-lg p-4 mb-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Years of Experience
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dashboardData.experienceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="years" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Doctor List */}
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Doctor List</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Address
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Experience
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Working Hours
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dashboardData.recentDoctors.map((doctor, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {doctor.attributes.Name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {doctor.attributes.Address}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {doctor.attributes.Year_of_Experience} years
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {doctor.attributes.StartTime} -{" "}
                              {doctor.attributes.EndTime}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {doctor.attributes.Phone}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
