import React, { useEffect, useState } from "react";
import { getTimetablesByDay } from "../services/timetableService";
import { Link } from "react-router-dom";

const TimetableList = () => {
    const [timetables, setTimetables] = useState([]);
    const [day, setDay] = useState("Monday");

    useEffect(() => {
        const fetchTimetables = async () => {
            try {
                const data = await getTimetablesByDay(day);
                setTimetables(data);
            } catch (error) {
                console.error("Error fetching timetables:", error);
            }
        };
        fetchTimetables();
    }, [day]);

    return (
        <div>
            <h2 className="text-xl font-bold">Timetables for {day}</h2>
            <select value={day} onChange={(e) => setDay(e.target.value)}>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
                    <option key={d} value={d}>{d}</option>
                ))}
            </select>
            <ul>
                {timetables.map((timetable) => (
                    <li key={timetable._id}>
                        <Link to={`/timetable/${timetable._id}`}>
                            {timetable.course.name} - {timetable.venue.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TimetableList;
