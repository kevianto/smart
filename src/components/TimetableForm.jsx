import React, { useState } from "react";
import { allocateTimetable } from "../services/timetableService";
import { useAuth } from "../context/AuthContext";

const TimetableForm = () => {
    const { token, isAdmin } = useAuth();
    const [formData, setFormData] = useState({
        courseId: "",
        instructorId: "",
        students: [],
        preferredDay: "Monday",
        preferredStartTime: "",
        preferredEndTime: "",
    });

    if (!isAdmin) {
        return <p>Unauthorized: Admins only</p>;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await allocateTimetable(formData, token);
            alert("Timetable allocated successfully!");
        } catch (error) {
            console.error("Error allocating timetable:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold">Allocate Timetable</h2>
            <input type="text" name="courseId" placeholder="Course ID" onChange={handleChange} required />
            <input type="text" name="instructorId" placeholder="Instructor ID" onChange={handleChange} required />
            <input type="text" name="students" placeholder="Student IDs (comma separated)" onChange={handleChange} required />
            <select name="preferredDay" onChange={handleChange}>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
                    <option key={d} value={d}>{d}</option>
                ))}
            </select>
            <input type="time" name="preferredStartTime" onChange={handleChange} required />
            <input type="time" name="preferredEndTime" onChange={handleChange} required />
            <button type="submit">Allocate</button>
        </form>
    );
};

export default TimetableForm;
