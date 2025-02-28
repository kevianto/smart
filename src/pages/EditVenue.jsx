import { useEffect, useState } from "react";
import { getVenueById, updateVenue } from "../api/venueApi";
import { useNavigate, useParams } from "react-router-dom";

const EditVenue = () => {
  const { venueId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    location: "",
    isAvailable: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenue = async () => {
      const data = await getVenueById(venueId);
      setFormData(data);
    };
    fetchVenue();
  }, [venueId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateVenue(venueId, formData);
    navigate("/venues");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Venue</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="input" />
        <input name="capacity" type="number" placeholder="Capacity" value={formData.capacity} onChange={handleChange} required className="input" />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="input" />
        <button type="submit" className="btn">Update Venue</button>
      </form>
    </div>
  );
};

export default EditVenue;
