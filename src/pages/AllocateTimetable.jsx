import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllocateTimetable = () => {
  const [courseId, setCourseId] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [students, setStudents] = useState("");
  const [preferredDay, setPreferredDay] = useState("Monday");
  const [preferredStartTime, setPreferredStartTime] = useState("");
  const [preferredEndTime, setPreferredEndTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleAllocate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/timetable/allocate", {
        courseId,
        instructorId,
        students: students.split(","),
        preferredDay,
        preferredStartTime,
        preferredEndTime,
      }, { headers: { Authorization: `Bearer ${token}` } });

      setSuccess("Timetable allocated successfully");
      setTimeout(() => navigate("/timetable"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to allocate timetable");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Allocate AI Timetable</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success} Redirecting...</p>}

      <form onSubmit={handleAllocate} className="space-y-2">
        <input type="text" placeholder="Course ID" value={courseId} onChange={(e) => setCourseId(e.target.value)} className="p-2 border rounded w-full" required />
        <input type="text" placeholder="Instructor ID" value={instructorId} onChange={(e) => setInstructorId(e.target.value)} className="p-2 border rounded w-full" required />
        <input type="text" placeholder="Student IDs (comma separated)" value={students} onChange={(e) => setStudents(e.target.value)} className="p-2 border rounded w-full" required />

        <label className="block">Preferred Day:</label>
        <select value={preferredDay} onChange={(e) => setPreferredDay(e.target.value)} className="p-2 border rounded w-full">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>

        <input type="time" value={preferredStartTime} onChange={(e) => setPreferredStartTime(e.target.value)} className="p-2 border rounded w-full" required />
        <input type="time" value={preferredEndTime} onChange={(e) => setPreferredEndTime(e.target.value)} className="p-2 border rounded w-full" required />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Allocate Timetable</button>
      </form>
    </div>
  );
};

export default AllocateTimetable;
