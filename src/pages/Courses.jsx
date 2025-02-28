import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../services/courseService";

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            const data = await getCourseById(id);
            setCourse(data);
        };
        fetchCourse();
    }, [id]);

    if (!course) return <p>Loading...</p>;

    return (
        <div>
            <h2>{course.name}</h2>
            <p>Code: {course.code}</p>
            <p>Instructor: {course.instructor?.name}</p>
            <p>Capacity: {course.capacity}</p>
            <p>Duration: {course.duration} weeks</p>
        </div>
    );
};

export default CourseDetail;
