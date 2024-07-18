import React, { useState } from "react";
import axios from "axios";

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Address: "",
    Patients: "",
    Year_of_Experience: "",
    StartTime: "",
    EndTime: "",
    About: "",
    Phone: "",
    email: "",
    Premium: true,
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Create the data object in the format Strapi expects
    const data = {
      Name: formData.Name,
      Address: formData.Address,
      Patients: formData.Patients,
      Year_of_Experience: formData.Year_of_Experience,
      StartTime: formData.StartTime,
      EndTime: formData.EndTime,
      About: formData.About,
      Phone: formData.Phone,
      email: formData.email,
      Premium: formData.Premium,
    };

    formDataToSend.append("data", JSON.stringify(data));

    if (image) {
      formDataToSend.append("files.image", image, image.name);
    }

    try {
      const response = await axios.post(
        "https://doctor-appointment-admin-y94n.onrender.com/api/doctors",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Doctor added successfully:", response.data);
      // Reset form or show success message
    } catch (error) {
      console.error(
        "Error adding doctor:",
        error.response ? error.response.data : error.message
      );
      // Show error message
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add New Doctor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="Name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="Address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="Address"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="Patients"
            className="block text-sm font-medium text-gray-700"
          >
            Patients
          </label>
          <input
            type="text"
            id="Patients"
            name="Patients"
            value={formData.Patients}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="Year_of_Experience"
            className="block text-sm font-medium text-gray-700"
          >
            Years of Experience
          </label>
          <input
            type="text"
            id="Year_of_Experience"
            name="Year_of_Experience"
            value={formData.Year_of_Experience}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="StartTime"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <input
              type="time"
              id="StartTime"
              name="StartTime"
              value={formData.StartTime}
              onChange={handleChange}
              required
              step="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="EndTime"
              className="block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <input
              type="time"
              id="EndTime"
              name="EndTime"
              value={formData.EndTime}
              onChange={handleChange}
              required
              step="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="About"
            className="block text-sm font-medium text-gray-700"
          >
            About
          </label>
          <textarea
            id="About"
            name="About"
            value={formData.About}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="Phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="tel"
            id="Phone"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*,video/*,audio/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="Premium"
            name="Premium"
            checked={formData.Premium}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="Premium" className="ml-2 block text-sm text-gray-900">
            Premium
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorForm;
