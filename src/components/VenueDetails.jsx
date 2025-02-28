import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVenueById, updateVenue, deleteVenue } from "../services/api";
import { useAuth } from "../context/AuthContext";

const VenueDetails = () => {
    const { venueId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [venue, setVenue] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        capacity: "",
        location: "",
        isAvailable: true,
    });

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const venueData = await getVenueById(venueId);
                setVenue(venueData);
                setFormData(venueData);
            } catch (error) {
                console.error("Error fetching venue:", error);
            }
        };
        fetchVenue();
    }, [venueId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleUpdate = async () => {
        try {
            const updatedVenue = await updateVenue(venueId, formData);
            setVenue(updatedVenue);
            setEditMode(false);
        } catch (error) {
            console.error("Error updating venue:", error);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this venue?")) return;
        try {
            await deleteVenue(venueId);
            navigate("/"); // Redirect to homepage after deletion
        } catch (error) {
            console.error("Error deleting venue:", error);
        }
    };

    if (!venue) return <p className="text-center text-gray-500">Loading venue details...</p>;

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{editMode ? "Edit Venue" : venue.name}</h2>

            {editMode ? (
                <div className="space-y-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
                    <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} className="border p-2 w-full" />
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="border p-2 w-full" />
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} />
                        <span>Available</span>
                    </label>
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                    <button onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
                </div>
            ) : (
                <div className="space-y-2">
                    <p><strong>Capacity:</strong> {venue.capacity}</p>
                    <p><strong>Location:</strong> {venue.location}</p>
                    <p><strong>Available:</strong> {venue.isAvailable ? "Yes" : "No"}</p>

                    {user && user.role === "admin" && (
                        <div className="mt-4">
                            <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VenueDetails;
