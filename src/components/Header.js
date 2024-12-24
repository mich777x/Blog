import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Bell, Sun, Moon, User, LogOut, Settings } from "lucide-react";
import SearchOverlay from "./SearchOverlay";

const Header = ({ isDark, toggleTheme, currentUser, onLogout, posts }) => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const profileRef = useRef(null);

	const navigationItems = [{ name: "Home", path: "/" }, { name: "Articles", path: "/articles" }, { name: "Categories", path: "/categories" }, { name: "About", path: "/about" }, ...(currentUser ? [{ name: "New Post", path: "/new-post" }] : [])];

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (profileRef.current && !profileRef.current.contains(event.target)) {
				setShowProfileMenu(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleLoginClick = () => {
		navigate("/login");
	};

	const isActivePath = (path) => {
		return location.pathname === path;
	};

	return (
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

						{currentUser ? (
							<div className="relative" ref={profileRef}>
								<button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
									<div className="text-left hidden sm:block">
										<div className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{currentUser.name}</div>
										<div className="text-xs text-gray-500">demo@example.com</div>
									</div>
								</button>

								{showProfileMenu && (
									<div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${isDark ? "bg-gray-800" : "bg-white"} ring-1 ring-black ring-opacity-5`}>
										<div className="py-1">
											<button onClick={onLogout} className={`w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2`}>
												<LogOut size={16} />
												<span>Sign out</span>
											</button>
										</div>
									</div>
								)}
							</div>
						) : (
							<button onClick={handleLoginClick} className={`px-4 py-2 rounded-lg ${isDark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white transition-colors`}>
								Login
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Search Overlay */}
			<SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} isDark={isDark} posts={posts} />
		</header>
	);
};

export default Header;
