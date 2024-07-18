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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Doctors List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white shadow rounded-lg p-4">
            <h3 className="text-xl font-semibold">{doctor.attributes.Name}</h3>
            <p className="text-gray-600">{doctor.attributes.Address}</p>
            <p className="text-gray-600">{doctor.attributes.email}</p>
            <div className="mt-4">
              <button
                onClick={() => handleEdit(doctor)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(doctor.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingDoctor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Edit Doctor
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="Name"
                value={editingDoctor.Name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                name="Address"
                value={editingDoctor.Address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                name="Year_of_Experience"
                value={editingDoctor.Year_of_Experience}
                onChange={handleChange}
                placeholder="Years of Experience"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="time"
                name="StartTime"
                value={editingDoctor.StartTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="time"
                name="EndTime"
                value={editingDoctor.EndTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              <textarea
                name="About"
                value={editingDoctor.About}
                onChange={handleChange}
                placeholder="About"
                className="w-full px-3 py-2 border rounded-md"
              ></textarea>
              <input
                type="tel"
                name="Phone"
                value={editingDoctor.Phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="email"
                name="email"
                value={editingDoctor.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-3 py-2 border rounded-md"
              />
              <div>
                <input
                  type="checkbox"
                  name="Premium"
                  checked={editingDoctor.Premium}
                  onChange={handleChange}
                />
                <label className="ml-2">Premium</label>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingDoctor(null)}
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
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
