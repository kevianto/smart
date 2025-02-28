import axios from "axios";

const API_URL = "http://localhost:5000/api/timetables"; // Update with your backend URL

export const getTimetablesByDay = async (day) => {
    const response = await axios.get(`${API_URL}/day/${day}`);
    return response.data.timetables;
};

export const getTimetableById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.timetable;
};

export const allocateTimetable = async (timetableData, token) => {
    const response = await axios.post(`${API_URL}/allocate`, timetableData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.timetable;
};

export const deleteTimetable = async (id, token) => {
    await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
