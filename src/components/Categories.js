import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, TrendingUp } from "lucide-react";

const Categories = ({ isDark, posts, onCategoryChange }) => {
	const navigate = useNavigate();

	// Calculate post counts for each category
	const calculateCategoryCounts = () => {
		const counts = {};
		posts.forEach((post) => {
			post.categories.forEach((category) => {
				counts[category] = (counts[category] || 0) + 1;
			});
		});
		return counts;
	};

	const categoryCounts = calculateCategoryCounts();

	const categories = [
		{
			name: "Technology",
			description: "Latest tech news and updates",
			icon: "💻",
			color: "bg-blue-500",
		},
		{
			name: "Development",
			description: "Programming and software development",
			icon: "⌨️",
			color: "bg-green-500",
		},
		{
			name: "Design",
			description: "UI/UX and graphic design",
			icon: "🎨",
			color: "bg-purple-500",
		},
		{
			name: "AI & ML",
			description: "Artificial Intelligence and Machine Learning",
			icon: "🤖",
			color: "bg-red-500",
		},
		{
			name: "Mobile",
			description: "Mobile development and apps",
			icon: "📱",
			color: "bg-yellow-500",
		},
		{
			name: "Cloud",
			description: "Cloud computing and services",
			icon: "☁️",
			color: "bg-cyan-500",
		},
		{
			name: "Security",
			description: "Cybersecurity and data protection",
			icon: "🔒",
			color: "bg-orange-500",
		},
		{
			name: "DevOps",
			description: "Development operations and practices",
			icon: "⚙️",
			color: "bg-teal-500",
		},
	];

	const handleCategoryClick = (categoryName) => {
		onCategoryChange(categoryName);
		navigate("/");
	};

	return (
		<div className="py-8">
			<div className="mb-8">
				<h1 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Categories</h1>
				<p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Explore our collection of articles by topic</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{categories.map((category) => (
					<button key={category.name} onClick={() => handleCategoryClick(category.name)} className={`p-6 rounded-xl transition-all duration-200 transform hover:scale-105 text-left ${isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"} shadow-lg`}>
						<div className="flex items-center space-x-3 mb-4">
							<span className="text-2xl">{category.icon}</span>
							<h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{category.name}</h2>
						</div>
						<p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{category.description}</p>
						<div className="flex items-center justify-between">
							<div className={`flex items-center space-x-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
								<FileText size={16} />
								<span className="text-sm">{categoryCounts[category.name] || 0} articles</span>
							</div>
							<div className={`px-3 py-1 rounded-full text-xs ${category.color} text-white`}>View Articles</div>
						</div>
					</button>
				))}
			</div>

			{/* Recent Activity Section */}
			<div className={`mt-12 p-6 rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}>
				<div className="flex items-center space-x-2 mb-6">
					<TrendingUp className={`${isDark ? "text-gray-400" : "text-gray-500"}`} />
					<h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Recent Activity</h2>
				</div>
				<div className="space-y-4">
					{posts.slice(0, 5).map((post) => (
						<div key={post.id} className={`p-4 rounded-lg ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"} transition-colors cursor-pointer`} onClick={() => navigate(`/posts/${post.id}`)}>
							<h3 className={`font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{post.title}</h3>
							<div className="flex flex-wrap gap-2">
								{post.categories.map((cat, index) => (
									<span key={index} className={`px-2 py-1 rounded-full text-xs ${categories.find((c) => c.name === cat)?.color || "bg-gray-500"} text-white`}>
										{cat}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Categories;
