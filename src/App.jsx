import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { VenueProvider } from "./context/VenueContext";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

import VenueList from "./components/VenueList";
import VenueDetails from "./components/VenueDetails";
import VenueForm from "./components/VenueForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute

function App() {
    return (
        <AuthProvider>
            <VenueProvider>
                <Router>
                    <div className="p-6">
                        <Routes>
                            <Route path="/" element={<VenueList />} />
                            <Route path="/venue/:venueId" element={<VenueDetails />} />
                            <Route path="/add-venue" element={<PrivateRoute element={<VenueForm />} adminOnly={true} />} />
                            <Route path="/edit-venue/:venueId" element={<PrivateRoute element={<VenueForm />} adminOnly={true} />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </div>
                </Router>
            </VenueProvider>
        </AuthProvider>
    );
}

export default App;
