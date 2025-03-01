import { useEffect, useState } from "react";
import axios from "axios";

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        // const apiKey = process.env.GEMINI_API_KEY;
        // const genAI = new GoogleGenerativeAI(apiKey);
        // const response = await fetch(genAI);
        // const data = await response.json();
        // setTimetable(data.timetable); 
        const response = await axios.get("http://localhost:5000/api/timetable");
        setTimetable(response.data.timetable);
      } catch (err) {
        setError("Failed to fetch timetable.");
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  // Define table headers for Monday to Friday
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">University Timetable</h2>

      {loading && <p className="text-gray-500">Loading timetable...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 text-left">Time</th>
                {days.map((day) => (
                  <th key={day} className="p-3">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Generating timetable slots */}
              {["08:00 - 10:00", "10:00 - 12:00", "12:00 - 2:00", "2:00 - 4:00", "4:00 - 6:00"].map((timeSlot) => (
                <tr key={timeSlot} className="border-t">
                  <td className="p-3 font-semibold bg-gray-200">{timeSlot}</td>
                  {days.map((day) => {
                    const session = timetable.find(
                      (entry) => entry.day === day && entry.startTime === timeSlot.split(" - ")[0]
                    );

                    return (
                      <td key={day} className="p-3 text-center border">
                        {session ? (
                          <>
                            <p className="font-semibold">{session.course}</p>
                            <p className="text-sm text-gray-600">{session.venue}</p>
                          </>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Timetable;
