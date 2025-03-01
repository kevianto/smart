import { useState } from "react";
import axios from "axios";

const Venues = () => {
  const [venueName, setVenueName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = "https://smartdaro.up.railway.app/api/venues"; // Adjust according to your backend

  const handleAddVenue = async (e) => {
    e.preventDefault();
    setMessage("");
  
    if (!venueName || !capacity) {
      setMessage("⚠️ Please enter both venue name and capacity.");
      return;
    }
  
    const adminToken = localStorage.getItem("token"); // Ensure admin is authenticated
    const newVenue = { 
      name: venueName, 
      capacity: Number(capacity), 
      isAvailable: true 
    };
  
    try {
      setLoading(true);
      const response = await axios.post(API_URL, newVenue, {
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });
  
      console.log(response.data); // Debugging: Check response
      setVenueName("");
      setCapacity("");
      setMessage("✅ Venue added successfully!");
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setMessage(`❌ Failed: ${error.response?.data?.message || "Server error"}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Add a Venue</h1>

      {/* Success/Error Message */}
      {message && (
        <p className={`mb-4 ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      {/* Venue Form */}
      <form 
        onSubmit={handleAddVenue} 
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Enter Venue Details</h2>

        <input 
          type="text" 
          placeholder="Venue Name"
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-3"
          required
        />

        <input 
          type="number" 
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-3"
          required
        />

        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Venue"}
        </button>
      </form>
    </div>
  );
};

export default Venues;
