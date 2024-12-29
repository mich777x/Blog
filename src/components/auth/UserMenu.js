// components/UserMenu.js
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { User, LogOut, Settings } from "lucide-react";

const UserMenu = ({ isDark }) => {
	const { currentUser, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	if (!currentUser) {
		return (
			<button
				className={`px-4 py-2 rounded-lg ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"} text-white`}
				onClick={() => {
					// Mock login for demonstration
					login({
						id: 1,
						name: "Test User",
						avatar: "/api/placeholder/100/100",
						role: "Writer",
					});
				}}
			>
				Login
			</button>
		);
	}

	return (
		<div className="relative">
			<button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
				<img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
				<span className={isDark ? "text-white" : "text-gray-900"}>{currentUser.name}</span>
			</button>

			{isOpen && (
				<div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
					<div className="py-1">
						<button
							onClick={() => {
								logout();
								setIsOpen(false);
							}}
							className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
						>
							<LogOut size={16} className="mr-2" />
							Logout
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
