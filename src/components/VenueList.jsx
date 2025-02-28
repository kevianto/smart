import { useVenue } from "../context/VenueContext";
import { useAuth } from "../context/AuthContext";
import { deleteVenue } from "../services/api";

const VenueList = () => {
    const { venues, setVenues } = useVenue();
    const { user } = useAuth();

    const handleDelete = async (venueId) => {
        try {
            await deleteVenue(venueId);
            setVenues((prev) => prev.filter((venue) => venue._id !== venueId));
        } catch (error) {
            console.error("Error deleting venue:", error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Venues</h2>
            <ul className="space-y-4">
                {venues.map((venue) => (
                    <li key={venue._id} className="bg-gray-100 p-4 rounded-md">
                        <h3 className="text-lg font-semibold">{venue.name}</h3>
                        <p>Capacity: {venue.capacity}</p>
                        <p>Location: {venue.location}</p>
                        <p>Available: {venue.isAvailable ? "Yes" : "No"}</p>
                        {user && user.role === "admin" && (
                            <button onClick={() => handleDelete(venue._id)} className="bg-red-500 text-white px-3 py-1 rounded mt-2">Delete</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VenueList;
