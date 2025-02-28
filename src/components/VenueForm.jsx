import { useState } from "react";
import { addVenue } from "../services/api";
import { useVenue } from "../context/VenueContext";
import { useAuth } from "../context/AuthContext";

const VenueForm = () => {
    const { user } = useAuth();
    const { setVenues } = useVenue();
    const [formData, setFormData] = useState({ name: "", capacity: "", location: "", isAvailable: true });

    if (!user || user.role !== "admin") {
        return <p className="text-red-500">You do not have permission to add venues.</p>;
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newVenue = await addVenue(formData);
            setVenues((prev) => [...prev, newVenue]);
        } catch (error) {
            console.error("Error adding venue:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Venue Name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
            <input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleChange} className="border p-2 w-full" />
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="border p-2 w-full" />
            <label className="flex items-center space-x-2">
                <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} />
                <span>Available</span>
            </label>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Venue</button>
        </form>
    );
};

export default VenueForm;
