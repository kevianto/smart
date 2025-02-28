import React, { useEffect, useState } from "react";
import { getTimetableById } from "../services/timetableService";
import { useParams } from "react-router-dom";

const TimetableDetails = () => {
    const { timetableId } = useParams();
    const [timetable, setTimetable] = useState(null);

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const data = await getTimetableById(timetableId);
                setTimetable(data);
            } catch (error) {
                console.error("Error fetching timetable:", error);
            }
        };
        fetchTimetable();
    }, [timetableId]);

    if (!timetable) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-xl font-bold">Timetable Details</h2>
            <p><strong>Course:</strong> {timetable.course.name}</p>
            <p><strong>Instructor:</strong> {timetable.instructor.name}</p>
            <p><strong>Venue:</strong> {timetable.venue.name}</p>
            <p><strong>Day:</strong> {timetable.day}</p>
            <p><strong>Time:</strong> {timetable.startTime} - {timetable.endTime}</p>
        </div>
    );
};

export default TimetableDetails;
