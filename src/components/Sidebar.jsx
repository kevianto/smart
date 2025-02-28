import { FaBook, FaChalkboardTeacher,FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-slate-300 shadow-md flex flex-col p-6">
      {/* University Logo & Info */}
      <div className="mb-6">
        <div className="mt-2 flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          <IoPersonCircleSharp />
          </div>
         
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-4">
          <li className="flex items-center space-x-2 text-blue-700 hover:text-black cursor-pointer">
            <FaBook className="text-lg" />
            <span>Dashboard</span>
          </li>
         
          <li className="flex items-center space-x-2 text-blue-700 hover:text-black cursor-pointer">
            <FaCalendarAlt className="text-lg" />
            <span>Timetable</span>
          </li>
          <li className="flex items-center space-x-2 text-blue-700 hover:text-black cursor-pointer">
            <FaBook className="text-lg" />
            <span>Admin</span>
          </li>
        </ul>
      </nav>

      {/* Career Goals Section
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Career Goals</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="hover:text-black cursor-pointer">✅ Succeeded</li>
          <li className="hover:text-black cursor-pointer">🔄 Working on</li>
          <li className="hover:text-black cursor-pointer">📌 Destination list</li>
        </ul>
      </div> */}

      {/* Logout Button */}
      <button className="mt-6 flex items-center space-x-2 text-red-500 hover:text-red-700 cursor-pointer">
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
