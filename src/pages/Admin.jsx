import { useNavigate } from "react-router-dom";

import backgroundImage from "@/assets/class.jpg";
import Sidebar from "../components/Sidebar";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Admin Content */}
      <div
        className="flex-1 flex flex-col items-center justify-center bg-cover bg-center p-6"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Header */}
        <header className="absolute top-0 left-64 w-[calc(100%-16rem)] bg-gray-900 text-white py-4 text-center text-3xl font-bold">
          Smartdaro Admin Panel
        </header>

        {/* Page Content */}
        <h2 className="text-4xl font-bold text-black bg-white bg-opacity-50 px-6 py-2 rounded-lg mt-16">
          Manage Timetable Resources
        </h2>
        <p className="text-lg text-gray-900 bg-white bg-opacity-50 px-4 py-2 mt-4 rounded-lg">
          Add and manage venues and courses required for the timetable generation.
        </p>

        {/* Buttons in a row */}
        <div className="mt-6 flex space-x-6">
          <button
            onClick={() => navigate("/venues")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg"
          >
            Add Venues
          </button>

          <button
            onClick={() => navigate("/courses")}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg"
          >
            Add Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
