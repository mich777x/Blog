import React, { useState } from "react";
import { Filter, Search, X } from "lucide-react";

const CategoryFilter = ({ isDark, categories, selectedCategory, onCategoryChange }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [showAllCategories, setShowAllCategories] = useState(false);

	const allCategories = [
		{ id: "all", name: "All", color: "bg-gray-500" },
		{ id: "tech", name: "Technology", color: "bg-blue-500" },
		{ id: "dev", name: "Development", color: "bg-green-500" },
		{ id: "design", name: "Design", color: "bg-purple-500" },
		{ id: "ai", name: "AI & ML", color: "bg-red-500" },
		{ id: "mobile", name: "Mobile", color: "bg-yellow-500" },
		{ id: "web", name: "Web Dev", color: "bg-indigo-500" },
		{ id: "cloud", name: "Cloud", color: "bg-cyan-500" },
		{ id: "security", name: "Security", color: "bg-orange-500" },
		{ id: "data", name: "Data Science", color: "bg-pink-500" },
		{ id: "devops", name: "DevOps", color: "bg-teal-500" },
	];

	// Filter categories based on search
	const filteredCategories = allCategories.filter((category) => category.name.toLowerCase().includes(searchQuery.toLowerCase()));

	// Determine which categories to show
	const displayedCategories = showAllCategories ? filteredCategories : filteredCategories.slice(0, 6);

	return (
		<div className={`p-6 rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}>
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-2">
					<Filter size={20} className={isDark ? "text-gray-400" : "text-gray-500"} />
					<h3 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Filter by Category</h3>
				</div>

				{/* Search input */}
				<div className="relative">
					<input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search categories..." className={`pl-8 pr-4 py-2 rounded-lg ${isDark ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-100 text-gray-900 placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
					<Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
					{searchQuery && (
						<button onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 transform -translate-y-1/2">
							<X size={16} className="text-gray-400 hover:text-gray-600" />
						</button>
					)}
				</div>
			</div>

			<div className="flex flex-wrap gap-3">
				{displayedCategories.map((category) => (
					<button key={category.id} onClick={() => onCategoryChange(category.name)} className={`px-4 py-2 rounded-full transition-all duration-200 ${selectedCategory === category.name ? `${category.color} text-white transform scale-105` : isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
						{category.name}
					</button>
				))}
			</div>

			{filteredCategories.length > 6 && (
				<button onClick={() => setShowAllCategories(!showAllCategories)} className={`mt-4 text-sm ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-500 hover:text-blue-600"}`}>
					{showAllCategories ? "Show Less" : "Show More Categories"}
				</button>
			)}

			{filteredCategories.length === 0 && <p className={`mt-4 text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>No categories found matching your search.</p>}
		</div>
	);
};

export default CategoryFilter;
