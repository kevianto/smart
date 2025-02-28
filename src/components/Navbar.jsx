import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <Link to="/" className="text-lg font-bold">AI Timetable</Link>
      <div>
        {user ? (
          <>
            <Link to="/venues" className="mr-4">Venues</Link>
            <Link to="/courses" className="mr-4">Courses</Link>
            <Link to="/timetable" className="mr-4">Timetable</Link>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
