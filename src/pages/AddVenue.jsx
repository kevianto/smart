import { useState } from "react";
import { addVenue } from "../api/venueApi";
import { useNavigate } from "react-router-dom";

const AddVenue = () => {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    location: "",
    isAvailable: true,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addVenue(formData);
    navigate("/venues");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Add Venue</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="input" />
        <input name="capacity" type="number" placeholder="Capacity" value={formData.capacity} onChange={handleChange} required className="input" />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="input" />
        <button type="submit" className="btn">Add Venue</button>
      </form>
    </div>
  );
};

export default AddVenue;
