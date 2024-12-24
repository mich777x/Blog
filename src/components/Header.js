import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Sun, Moon, LogOut } from "lucide-react";
import SearchOverlay from "./SearchOverlay";

const Header = ({ isDark, toggleTheme, currentUser, onLogout, posts }) => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const profileDropdownRef = useRef(null);

	const navigationItems = [{ name: "Home", path: "/" }, { name: "Articles", path: "/articles" }, { name: "Categories", path: "/categories" }, { name: "About", path: "/about" }, ...(currentUser ? [{ name: "New Post", path: "/new-post" }] : [])];

	// Close profile dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
				setIsProfileOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const isActivePath = (path) => {
		return location.pathname === path;
	};

	const handleLoginClick = () => {
		navigate("/login");
	};

	const handleLogout = () => {
		setIsProfileOpen(false);
		onLogout();
		navigate("/");
	};

	return (
		<>
			<header className={`fixed w-full top-0 z-40 ${isDark ? "bg-gray-900" : "bg-white"} shadow-md`}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{/* Logo */}
						<Link to="/" className="flex-shrink-0">
							<h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
								BlogX<span className="text-blue-500">Elite</span>
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

							{/* Profile Dropdown */}
							{currentUser ? (
								<div className="relative" ref={profileDropdownRef}>
									<button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2">
										<img src={currentUser.avatar || "/api/placeholder/32/32"} alt={currentUser.name} className="w-8 h-8 rounded-full" />
									</button>

									{/* Profile Dropdown Menu */}
									{isProfileOpen && (
										<div className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"} z-50`}>
											<div className={`p-4 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
												<p className="font-medium">{currentUser.name}</p>
												<p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{currentUser.email}</p>
											</div>

											<button onClick={handleLogout} className={`w-full px-4 py-2 flex items-center space-x-2 ${isDark ? "hover:bg-gray-700 text-red-400" : "hover:bg-gray-100 text-red-500"} transition-colors`}>
												<LogOut size={16} />
												<span>Logout</span>
											</button>
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
			</header>

			{/* Search Overlay */}
			<SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} isDark={isDark} posts={posts} />
		</>
	);
};

export default Header;
