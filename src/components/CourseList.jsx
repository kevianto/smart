import { useEffect, useState } from "react";
import { getAllCourses, deleteCourse } from "../services/courseService";
import { useAuth } from "../context/AuthContext";
import CourseForm from "./CourseForm";

const CourseList = () => {
    const { user, token } = useAuth();
    const [courses, setCourses] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        const data = await getAllCourses();
        setCourses(data);
    };

    const handleDelete = async (courseId) => {
        if (window.confirm("Are you sure?")) {
            await deleteCourse(courseId, token);
            loadCourses();
        }
    };

    return (
        <div>
            <h2>Courses</h2>
            {user?.role === "admin" && <CourseForm onSuccess={loadCourses} />}
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>
                        {course.name} ({course.code}) - Instructor: {course.instructor?.name}
                        {user?.role === "admin" && (
                            <>
                                <button onClick={() => setEditingCourse(course)}>Edit</button>
                                <button onClick={() => handleDelete(course._id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            {editingCourse && <CourseForm existingCourse={editingCourse} onSuccess={loadCourses} />}
        </div>
    );
};

export default CourseList;
