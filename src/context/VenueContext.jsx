import { createContext, useContext, useState } from "react";

const VenueContext = createContext(); // Creating the context

export const VenueProvider = ({ children }) => {
    const [venues, setVenues] = useState([]); // Store venues

    return (
        <VenueContext.Provider value={{ venues, setVenues }}>
            {children}
        </VenueContext.Provider>
    );
};

// Hook to use VenueContext in other components
export const useVenue = () => useContext(VenueContext);
