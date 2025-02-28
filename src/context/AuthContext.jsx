import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
                setIsAuthenticated(true);
                setIsAdmin(decodedUser.isAdmin || false);
            } catch (error) {
                console.error("Invalid token:", error);
                logout();
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        setIsAuthenticated(true);
        setIsAdmin(decodedUser.isAdmin || false);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
