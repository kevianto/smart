import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Timetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/timetable/day/${selectedDay}`);
        setTimetables(response.data.timetables);
        setLoading(false);
      } catch (err) {
        setError("Failed to load timetables");
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [selectedDay]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const deleteTimetable = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/timetable/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTimetables(timetables.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to delete timetable");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Timetable</h1>

      <label className="block mt-2">Select Day:</label>
      <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}
        className="p-2 border rounded">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>

      {loading ? <p>Loading...</p> : (
        <ul className="mt-4">
          {timetables.map((timetable) => (
            <li key={timetable.id} className="p-2 border-b">
              <p>Course: {timetable.courseId}</p>
              <p>Instructor: {timetable.instructorId}</p>
              <p>Time: {timetable.preferredStartTime} - {timetable.preferredEndTime}</p>
              {user?.isAdmin && (
                <button onClick={() => deleteTimetable(timetable.id)} className="bg-red-500 text-white p-1 rounded">
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {user?.isAdmin && (
        <button onClick={() => navigate("/allocate-timetable")}
          className="mt-4 bg-blue-600 text-white p-2 rounded">
          Allocate New Timetable
        </button>
      )}
    </div>
  );
};

export default Timetable;
