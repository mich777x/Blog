import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

const SearchOverlay = ({ isOpen, onClose, isDark, posts = [] }) => {
	// Add default empty array
	const [query, setQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const navigate = useNavigate();

	// In SearchOverlay.js, add this at the start of your handleSearch function:
	const handleSearch = (searchQuery) => {
		console.log("Searching through posts:", posts); // Add this line
		setQuery(searchQuery);

		if (searchQuery.length >= 2 && Array.isArray(posts)) {
			const filtered = posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || (post.categories && post.categories.some((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase()))) || (post.author && post.author.name.toLowerCase().includes(searchQuery.toLowerCase())));
			console.log("Search results:", filtered); // Add this line
			setSearchResults(filtered);
		} else {
			setSearchResults([]);
		}
	};

	const handleResultClick = (postId) => {
		onClose();
		navigate(`/posts/${postId}`);
	};

	const handleClose = () => {
		setQuery("");
		setSearchResults([]);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={handleClose} />

			<div className={`relative ${isDark ? "bg-gray-900" : "bg-white"}`}>
				<div className="max-w-3xl mx-auto p-4">
					<div className="relative">
						<Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"}`} size={20} />
						<input type="text" value={query} onChange={(e) => handleSearch(e.target.value)} placeholder="Search posts..." className={`w-full pl-12 pr-10 py-4 rounded-lg text-lg ${isDark ? "bg-gray-800 text-white placeholder-gray-400" : "bg-gray-100 text-gray-900 placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-blue-500`} autoFocus />
						<button onClick={handleClose} className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"} hover:text-gray-700`}>
							<X size={20} />
						</button>
					</div>

					<div className="mt-6">
						{query.length >= 2 ? (
							searchResults.length > 0 ? (
								<div className="space-y-4">
									{searchResults.map((result) => (
										<div key={result.id} onClick={() => handleResultClick(result.id)} className={`p-4 rounded-lg cursor-pointer ${isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-50 hover:bg-gray-100"}`}>
											<div className="flex items-center justify-between mb-2">
												<div className="flex gap-2">
													{result.categories &&
														result.categories.map((category, index) => (
															<span key={index} className={`px-3 py-1 rounded-full text-sm ${isDark ? "bg-gray-700 text-blue-400" : "bg-blue-100 text-blue-600"}`}>
																{category}
															</span>
														))}
												</div>
												<span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{new Date(result.date).toLocaleDateString()}</span>
											</div>
											<h3 className={`text-lg font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{result.title}</h3>
											<p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{result.excerpt}</p>
											{result.author && <p className={`mt-2 text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>By {result.author.name}</p>}
										</div>
									))}
								</div>
							) : (
								<div className={`text-center py-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>No results found for "{query}"</div>
							)
						) : (
							<div className="py-4">
								<h3 className={`font-medium mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Popular Categories</h3>
								<div className="flex flex-wrap gap-2">
									{["Getting Started", "Technology", "Development", "Writing", "Tips"].map((term) => (
										<button key={term} onClick={() => handleSearch(term)} className={`px-4 py-2 rounded-full text-sm ${isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
											{term}
										</button>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchOverlay;
