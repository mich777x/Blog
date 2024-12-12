import React from "react";
import { TrendingUp } from "lucide-react";

const TrendingTopics = ({ isDark }) => {
	const topics = [
		{ id: 1, name: "Technology", count: 128, trend: "+12%" },
		{ id: 2, name: "Web Development", count: 96, trend: "+8%" },
		{ id: 3, name: "AI & ML", count: 84, trend: "+15%" },
		{ id: 4, name: "Design", count: 72, trend: "+5%" },
	];

	return (
		<div className={`rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} p-6 shadow-lg`}>
			<div className="flex items-center justify-between mb-6">
				<h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Trending Topics</h3>
				<TrendingUp className={`${isDark ? "text-blue-400" : "text-blue-500"}`} size={20} />
			</div>

			<div className="space-y-4">
				{topics.map((topic) => (
					<div key={topic.id} className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>
						<div>
							<h4 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{topic.name}</h4>
							<p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{topic.count} articles</p>
						</div>
						<span className="text-green-500 text-sm font-medium">{topic.trend}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default TrendingTopics;
