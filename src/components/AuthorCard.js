import React from "react";

const AuthorCard = ({ author, isDark }) => {
	// Default author data when no author is provided
	const defaultAuthor = {
		name: "Guest User",
		avatar: "/api/placeholder/150/150?guest",
		role: "Reader",
		bio: "Welcome to our blog! Create an account to start sharing your thoughts.",
		stats: {
			articles: 0,
			followers: "0",
		},
	};

	// Use provided author data or default if author is null/undefined
	const authorData = author || defaultAuthor;

	return (
		<div className={`rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} p-6 shadow-lg`}>
			<div className="flex items-center space-x-4">
				<img src={authorData.avatar} alt={authorData.name} className="w-16 h-16 rounded-full border-2 border-blue-500" />
				<div>
					<h3 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{authorData.name}</h3>
					<p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{authorData.role}</p>
				</div>
			</div>

			<p className={`mt-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{authorData.bio}</p>

			<div className="mt-4 flex items-center justify-between">
				<div className="flex space-x-4">
					<div className="text-center">
						<span className={`block font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{authorData.stats.articles}</span>
						<span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Articles</span>
					</div>
					<div className="text-center">
						<span className={`block font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{authorData.stats.followers}</span>
						<span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Followers</span>
					</div>
				</div>

				{!author && (
					<button onClick={() => (window.location.href = "/login")} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
						Sign In
					</button>
				)}

				{author && <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Follow</button>}
			</div>
		</div>
	);
};

export default AuthorCard;
