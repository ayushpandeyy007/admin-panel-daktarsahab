import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        "https://doctor-appointment-admin-y94n.onrender.com/api/doctors"
      );
      setDoctors(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching doctors");
      setLoading(false);
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor({ ...doctor.attributes, id: doctor.id });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingDoctor((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    const data = {
      Name: editingDoctor.Name,
      Address: editingDoctor.Address,
      Patients: editingDoctor.Patients,
      Year_of_Experience: editingDoctor.Year_of_Experience,
      StartTime: editingDoctor.StartTime,
      EndTime: editingDoctor.EndTime,
      About: editingDoctor.About,
      Phone: editingDoctor.Phone,
      email: editingDoctor.email,
      Premium: editingDoctor.Premium,
    };

    formDataToSend.append("data", JSON.stringify(data));

    if (image) {
      formDataToSend.append("files.image", image, image.name);
    }

    try {
      await axios.put(
        `https://doctor-appointment-admin-y94n.onrender.com/api/doctors/${editingDoctor.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchDoctors();
      setEditingDoctor(null);
      setImage(null);
    } catch (err) {
      console.error("Error updating doctor:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(
          `https://doctor-appointment-admin-y94n.onrender.com/api/doctors/${id}`
        );
        fetchDoctors();
      } catch (err) {
        console.error("Error deleting doctor:", err);
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Doctors List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {doctor.attributes.Name}
              </h3>
              <p className="text-gray-600 mb-1">
                <i className="fas fa-map-marker-alt mr-2"></i>
                {doctor.attributes.Address}
              </p>
              <p className="text-gray-600 mb-4">
                <i className="fas fa-envelope mr-2"></i>
                {doctor.attributes.email}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleEdit(doctor)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doctor.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editingDoctor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-8 border w-full max-w-md shadow-lg rounded-lg bg-white">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Edit Doctor
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="Name"
                value={editingDoctor.Name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="Address"
                value={editingDoctor.Address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="Year_of_Experience"
                value={editingDoctor.Year_of_Experience}
                onChange={handleChange}
                placeholder="Years of Experience"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-4">
                <input
                  type="time"
                  name="StartTime"
                  value={editingDoctor.StartTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="time"
                  name="EndTime"
                  value={editingDoctor.EndTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <textarea
                name="About"
                value={editingDoctor.About}
                onChange={handleChange}
                placeholder="About"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              ></textarea>
              <input
                type="tel"
                name="Phone"
                value={editingDoctor.Phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                value={editingDoctor.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="Premium"
                  checked={editingDoctor.Premium}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-gray-700">Premium</label>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingDoctor(null)}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
