import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/venues";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token"); // Retrieve JWT token
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAllVenues = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data.venues;
};

export const getVenueById = async (venueId) => {
    const response = await axios.get(`${API_BASE_URL}/${venueId}`);
    return response.data.venue;
};

// Restricted Actions (Admins Only)
export const addVenue = async (venueData) => {
    const response = await axios.post(API_BASE_URL, venueData, getAuthHeaders());
    return response.data.venue;
};

export const updateVenue = async (venueId, venueData) => {
    const response = await axios.put(`${API_BASE_URL}/${venueId}`, venueData, getAuthHeaders());
    return response.data.venue;
};

export const deleteVenue = async (venueId) => {
    await axios.delete(`${API_BASE_URL}/${venueId}`, getAuthHeaders());
};
