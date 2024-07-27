import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarIcon,
  ClockIcon,
  MailIcon,
  UserIcon,
  PencilIcon,
} from "lucide-react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        "https://doctor-appointment-admin-y94n.onrender.com/api/appointments"
      );
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Error fetching Appointment data:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Appointments
        </h1>
        <div className="flex w-full">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
            >
              <div className="p-5 bg-indigo-600">
                <h2 className="text-xl font-semibold flex items-center text-white">
                  <CalendarIcon className="mr-2 h-6 w-6" />
                  {formatDate(appointment.attributes.Date)}
                </h2>
              </div>
              <div className="p-5 space-y-4">
                <p className="flex items-center text-gray-700">
                  <UserIcon className="mr-3 h-5 w-5 text-indigo-500" />
                  <span className="font-medium">
                    {appointment.attributes.UserName}
                  </span>
                </p>
                <p className="flex items-center text-gray-600">
                  <MailIcon className="mr-3 h-5 w-5 text-indigo-500" />
                  <span>{appointment.attributes.Email}</span>
                </p>
                <p className="flex items-center text-gray-600">
                  <ClockIcon className="mr-3 h-5 w-5 text-indigo-500" />
                  <span>{appointment.attributes.Time}</span>
                </p>
                <div className="flex items-start text-gray-600">
                  <PencilIcon className="mr-3 h-5 w-5 text-indigo-500 mt-1" />
                  <span>
                    <strong className="font-medium text-gray-700">Note:</strong>
                    <br />
                    {appointment.attributes.Note}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
