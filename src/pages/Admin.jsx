import { useState } from "react";
import axios from "axios";

const Admin = () => {
  // State to store form inputs
  const [unitName, setUnitName] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [venue, setVenue] = useState("");
  const [capacity, setCapacity] = useState("");

  

  // Function to send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const timetableData = {
      unitName,
      lecturer,
      venue,
      capacity: parseInt(capacity), // Convert to number
    };

    try {
      const response = await axios.post( `${REACT_APP_API_URL}/api/venues`, timetableData);
      alert("Timetable details saved successfully!");
      console.log(response.data);

      // Clear form fields after submission
      setUnitName("");
      setLecturer("");
      setVenue("");
      setCapacity("");
    } catch (error) {
      console.error("Error saving timetable:", error);
      alert("Failed to save timetable. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Unit Name */}
          <div>
            <label className="block text-gray-700 font-medium">Unit Name</label>
            <input
              type="text"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              placeholder="Enter unit name"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Lecturer */}
          <div>
            <label className="block text-gray-700 font-medium">Lecturer</label>
            <input
              type="text"
              value={lecturer}
              onChange={(e) => setLecturer(e.target.value)}
              placeholder="Enter lecturer name"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Venue */}
          <div>
            <label className="block text-gray-700 font-medium">Venue</label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="Enter venue"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-gray-700 font-medium">Capacity</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Enter venue capacity"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-blue-600"
          >
            Save Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
