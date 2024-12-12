import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Simulate fetching user data from local storage or API
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				// In a real app, you'd fetch from your API
				const storedUser = localStorage.getItem("user");
				if (storedUser) {
					setUser(JSON.parse(storedUser));
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, []);

	const updateUser = (userData) => {
		setUser(userData);
		localStorage.setItem("user", JSON.stringify(userData));
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	return <UserContext.Provider value={{ user, loading, updateUser, logout }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
