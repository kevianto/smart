import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`/api/courses/${courseId}`)
      .then((res) => setCourse(res.data.course))
      .catch((err) => console.error("Error fetching course:", err));
  }, [courseId]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{course.name}</h1>
      <p><strong>Code:</strong> {course.code}</p>
      <p><strong>Instructor:</strong> {course.instructorId}</p>
      <p><strong>Capacity:</strong> {course.capacity}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
      <Link to={`/edit-course/${course._id}`} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</Link>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => deleteCourse(course._id)}>Delete</button>
    </div>
  );
};

const deleteCourse = async (courseId) => {
  if (window.confirm("Are you sure you want to delete this course?")) {
    try {
      await axios.delete(`/api/courses/${courseId}`);
      alert("Course deleted");
      window.location.href = "/courses";
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  }
};

export default CourseDetails;
