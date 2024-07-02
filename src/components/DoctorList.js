import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/doctors");
        setDoctors(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching doctors");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Doctors List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white shadow rounded-lg p-4">
            <h3 className="text-xl font-semibold">{doctor.attributes.name}</h3>
            <p className="text-gray-600">{doctor.attributes.specialization}</p>
            <p className="text-gray-600">{doctor.attributes.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
