import axios from "axios";

const API_URL = "http://localhost:5000/api/courses";

// Get all courses
export const getAllCourses = async () => {
    const response = await axios.get(API_URL);
    return response.data.courses;
};

// Get course by ID
export const getCourseById = async (courseId) => {
    const response = await axios.get(`${API_URL}/${courseId}`);
    return response.data.course;
};

// Add a new course (Admin only)
export const addCourse = async (courseData, token) => {
    const response = await axios.post(API_URL, courseData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.course;
};

// Update course (Admin only)
export const updateCourse = async (courseId, courseData, token) => {
    const response = await axios.put(`${API_URL}/${courseId}`, courseData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.course;
};

// Delete course (Admin only)
export const deleteCourse = async (courseId, token) => {
    const response = await axios.delete(`${API_URL}/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.message;
};
