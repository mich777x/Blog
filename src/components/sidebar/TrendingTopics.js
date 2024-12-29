import React, { useMemo } from "react";
import { TrendingUp, Users, ArrowRight, ChevronUp } from "lucide-react";
import generateImageUrl from "../../utils/imageUtils";

const TrendingTopics = ({ isDark, posts = [] }) => {
	const trendingTopics = useMemo(() => {
		// Get all categories from posts
		const allCategories = posts.reduce((acc, post) => {
			post.categories.forEach((category) => {
				if (!acc[category]) {
					acc[category] = {
						name: category,
						count: 1,
						engagement: post.likes + (post.comments?.length || 0),
						latestPost: post.date,
					};
				} else {
					acc[category].count += 1;
					acc[category].engagement += post.likes + (post.comments?.length || 0);
					if (new Date(post.date) > new Date(acc[category].latestPost)) {
						acc[category].latestPost = post.date;
					}
				}
			});
			return acc;
		}, {});

		// Convert to array and sort by engagement
		return Object.values(allCategories)
			.sort((a, b) => b.engagement - a.engagement)
			.slice(0, 4)
			.map((topic) => ({
				...topic,
				image: generateImageUrl(topic.name, [topic.name]),
				trend: Math.floor(Math.random() * 20) + 1, // Simulated trend percentage
			}));
	}, [posts]);

	const formatNumber = (num) => {
		if (num >= 1000) {
			return `${(num / 1000).toFixed(1)}k`;
		}
		return num;
	};

	return (
		<div className={`rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} p-6 shadow-lg`}>
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<div>
					<h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Trending Topics</h3>
					<p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Popular discussions this week</p>
				</div>
				<TrendingUp className={`${isDark ? "text-blue-400" : "text-blue-500"}`} size={20} />
			</div>

			{/* Topics List */}
			<div className="space-y-4">
				{trendingTopics.map((topic) => (
					<div
						key={topic.name}
						className={`group flex items-center gap-4 p-3 rounded-lg cursor-pointer 
                            ${isDark ? "hover:bg-gray-700 hover:shadow-md" : "hover:bg-gray-50 hover:shadow-md"}`}
					>
						{/* Topic Image */}
						<div className="relative overflow-hidden rounded-lg w-12 h-12">
							<img
								src={topic.image}
								alt={topic.name}
								className="w-full h-full object-cover transform transition-transform 
                                    duration-300 group-hover:scale-110"
							/>
						</div>

						{/* Topic Info */}
						<div className="flex-1">
							<div className="flex items-center gap-2">
								<h4 className={`font-medium ${isDark ? "text-white" : "text-gray-900"} group-hover:text-blue-500`}>{topic.name}</h4>
								<ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
							</div>

							{/* Stats */}
							<div className="flex items-center gap-4 mt-1">
								<div className="flex items-center gap-1 text-sm">
									<Users size={14} className={isDark ? "text-gray-400" : "text-gray-500"} />
									<span className={isDark ? "text-gray-400" : "text-gray-500"}>{formatNumber(topic.engagement)}</span>
								</div>
								<div className="flex items-center gap-1">
									<ChevronUp size={14} className="text-green-500" />
									<span className="text-sm text-green-500">{topic.trend}%</span>
								</div>
							</div>
						</div>

						{/* Article Count */}
						<div
							className={`text-sm font-medium px-2 py-1 rounded 
                            ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}`}
						>
							{topic.count} posts
						</div>
					</div>
				))}
			</div>

			{/* Footer */}
			<button
				className={`w-full mt-6 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
			>
				View All Topics
			</button>
		</div>
	);
};

export default TrendingTopics;
