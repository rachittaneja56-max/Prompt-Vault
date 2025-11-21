import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext()

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // Restore user from localStorage when app starts 
    useEffect(() => {
        const storedUser = localStorage.getItem("promptvault_user");
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoading(false);
    }, []);   //runs only at start because of [] empty dependancy
    const login = (email, password) => {
        const existingUser = JSON.parse(localStorage.getItem("promptvault_user"));

        if (!existingUser) {
            const newUser = { email, password };
            localStorage.setItem("promptvault_user", JSON.stringify(newUser));
            setUser(newUser);
            return true;
        }

        if (existingUser.email === email && existingUser.password === password) {
            setUser(existingUser);
            return true;
        } else {
            alert("Invalid email or password.");
            return false;
        }
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem("promptvault_user");
    };
    const value = { user, login, logout, loading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider
export const useAuth = () => useContext(AuthContext);
