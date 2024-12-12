import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, User, Bell, Sun, Moon } from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import { useUser } from "../contexts/UserContext";

const Header = ({ isDark, toggleTheme, currentUser, onLogout, posts }) => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);
	const { user, logout } = useUser();
	const navigate = useNavigate();
	const location = useLocation();

	const navigationItems = [{ name: "Home", path: "/" }, { name: "Articles", path: "/articles" }, { name: "Categories", path: "/categories" }, { name: "About", path: "/about" }, ...(currentUser ? [{ name: "New Post", path: "/new-post" }] : [])];

	const isActivePath = (path) => {
		return location.pathname === path;
	};

	const handleUserClick = () => {
		if (user) {
			navigate("/profile");
		} else {
			navigate("/login");
		}
	};

	const [notifications] = useState([
		{ id: 1, type: "like", content: "New post published", time: "2m ago" },
		{ id: 2, type: "comment", content: "Someone commented on your post", time: "5m ago" },
		{ id: 3, type: "follow", content: "New follower", time: "10m ago" },
	]);

	return (
		<>
			<header className={`fixed w-full top-0 z-40 ${isDark ? "bg-gray-900" : "bg-white"} shadow-md`}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{/* Logo */}
						<Link to="/" className="flex-shrink-0">
							<h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
								Blog<span className="text-blue-500">Elite</span>
							</h1>
						</Link>

						{/* Navigation */}
						<nav className="hidden md:flex items-center space-x-1">
							{navigationItems.map((item) => (
								<Link key={item.name} to={item.path} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActivePath(item.path) ? (isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900") : isDark ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"}`}>
									{item.name}
								</Link>
							))}
						</nav>

						{/* Right side buttons */}
						<div className="flex items-center space-x-4">
							<button onClick={toggleTheme} className={`p-2 rounded-full ${isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"} transition-colors`} title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
								{isDark ? <Sun size={20} /> : <Moon size={20} />}
							</button>

							<button onClick={() => setIsSearchOpen(true)} className={`p-2 rounded-full ${isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"} transition-colors`} title="Search">
								<Search size={20} />
							</button>

							<div className="relative">
								<button onClick={() => setShowNotifications(!showNotifications)} className={`p-2 rounded-full ${isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"} transition-colors`} title="Notifications">
									<Bell size={20} />
									<span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
								</button>

								{showNotifications && (
									<div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg ${isDark ? "bg-gray-800" : "bg-white"} border overflow-hidden`}>
										<div className="p-4">
											<h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Notifications</h3>
											<div className="mt-2 space-y-2">
												{notifications.map((notification) => (
													<div key={notification.id} className={`p-3 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"} cursor-pointer`}>
														<p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{notification.content}</p>
														<span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{notification.time}</span>
													</div>
												))}
											</div>
										</div>
									</div>
								)}
							</div>

							<div className="relative">
								<Link to="/profile">
									<button className={`p-2 rounded-full ${isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"} transition-colors duration-200`}>
										<User size={20} />
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Search Overlay */}
			<SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} isDark={isDark} posts={posts} />

			<div className="relative">
				<button onClick={handleUserClick} className={`p-2 rounded-full ${isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"} transition-colors duration-200`}>
					<User size={20} />
				</button>
			</div>
		</>
	);
};

export default Header;
