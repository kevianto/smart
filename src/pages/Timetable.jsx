import { useEffect, useState } from "react";
import axios from "axios";

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get("https://smartdaro.up.railway.app/api/timetable");
        setTimetable(response.data.timetable);
      } catch (err) {
        setError("Failed to fetch timetable.");
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  // Define table headers (Days from Monday to Friday)
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Define time slots (from 7:00 AM to 7:00 PM, 1-hour intervals)
  const timeSlots = [
    "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
    "01:00", "02:00", "03:00", "04:00", "05:00", "06:00"
  ];

  // Function to check if a course starts at a given time
  const findClass = (day, time) => {
    return timetable.find(
      (entry) => entry.day === day && entry.startTime === time
    );
  };

  // Function to calculate rowspan (number of hours the class spans)
  const getRowSpan = (startTime, endTime) => {
    const startIdx = timeSlots.indexOf(startTime);
    const endIdx = timeSlots.indexOf(endTime);
    return Math.min(endIdx - startIdx, 3); // Max 3-hour class
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">University Timetable</h2>

      {loading && <p className="text-gray-500">Loading timetable...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto w-full max-w-6xl">
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
              {timeSlots.map((timeSlot, index) => (
                <tr key={timeSlot} className="border-t">
                  <td className="p-3 font-semibold bg-gray-200">{timeSlot} - {timeSlots[index + 1] || "07:00"}</td>

                  {days.map((day) => {
                    const session = findClass(day, timeSlot);
                    if (session) {
                      const rowSpan = getRowSpan(session.startTime, session.endTime);
                      return (
                        <td key={day} className="p-3 text-center border bg-green-100" rowSpan={rowSpan}>
                          <p className="font-semibold">{session.course}</p>
                          <p className="text-sm text-gray-600">{session.venue}</p>
                        </td>
                      );
                    }

                    // Check if the current slot is inside a session's span
                    const isInsideSpan = timetable.some(
                      (entry) =>
                        entry.day === day &&
                        timeSlots.indexOf(entry.startTime) < index &&
                        timeSlots.indexOf(entry.endTime) > index
                    );

                    return isInsideSpan ? null : <td key={day} className="p-3 text-center border">-</td>;
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
