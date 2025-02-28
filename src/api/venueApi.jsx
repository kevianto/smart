import axios from "axios";

const API_URL = "/api/venues"; // Adjust as per your backend route

export const getAllVenues = async () => {
  const response = await axios.get(API_URL);
  return response.data.venues;
};

export const getVenueById = async (venueId) => {
  const response = await axios.get(`${API_URL}/${venueId}`);
  return response.data.venue;
};

export const addVenue = async (venueData) => {
  const response = await axios.post(API_URL, venueData);
  return response.data.venue;
};

export const updateVenue = async (venueId, venueData) => {
  const response = await axios.put(`${API_URL}/${venueId}`, venueData);
  return response.data.venue;
};

export const deleteVenue = async (venueId) => {
  await axios.delete(`${API_URL}/${venueId}`);
};
