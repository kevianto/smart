import { useState, useEffect } from "react";
import { addCourse, updateCourse } from "../services/courseService";
import { useAuth } from "../context/AuthContext";

const CourseForm = ({ existingCourse, onSuccess }) => {
    const { user, token } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        instructorId: "",
        capacity: "",
        duration: "",
    });

    useEffect(() => {
        if (existingCourse) {
            setFormData(existingCourse);
        }
    }, [existingCourse]);

    if (!user || user.role !== "admin") return <p>Access denied: Admins only.</p>;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (existingCourse) {
                await updateCourse(existingCourse._id, formData, token);
            } else {
                await addCourse(formData, token);
            }
            onSuccess();
        } catch (error) {
            console.error("Error saving course:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Course Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="code" placeholder="Course Code" value={formData.code} onChange={handleChange} required />
            <input type="text" name="instructorId" placeholder="Instructor ID" value={formData.instructorId} onChange={handleChange} required />
            <input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleChange} required />
            <input type="text" name="duration" placeholder="Duration (weeks)" value={formData.duration} onChange={handleChange} required />
            <button type="submit">{existingCourse ? "Update" : "Add"} Course</button>
        </form>
    );
};

export default CourseForm;
