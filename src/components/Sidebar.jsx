import { useState } from "react";
import { FaBook, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ hideAdmin = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear authentication tokens (adjust based on your auth implementation)
    localStorage.removeItem("token");
    navigate("/"); // Redirect to login page
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-slate-300 shadow-md flex flex-col p-6 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-0"
      } overflow-hidden`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* University Logo & Info */}
      {isOpen && (
        <div className="mb-6 flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            <IoPersonCircleSharp />
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-4">
          <li className="flex items-center space-x-2 text-blue-700 hover:text-black cursor-pointer">
            <FaBook className="text-lg" />
            {isOpen && <span><Link to='/home'>Dashboard</Link></span>}
          </li>

          <li className="flex items-center space-x-2 text-blue-700 hover:text-black cursor-pointer">
            <FaCalendarAlt className="text-lg" />
            {isOpen && <span><Link to='/timetable'>Timetable</Link></span>}
          </li>

          {/* Conditionally Render Admin Option */}
          {!hideAdmin && (
            <li className="flex items-center space-x-2 text-blue-700 hover:text-black cursor-pointer">
              <FaBook className="text-lg" />
              {isOpen && <span><Link to='/admin'>Admin</Link></span>}
            </li>
          )}
        </ul>
      </nav>

      {/* Logout Button */}
      {isOpen && (
        <button 
          className="mt-6 flex items-center space-x-2 text-red-500 hover:text-red-700 cursor-pointer"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      )}
    </div>
  );
};

export default Sidebar;
