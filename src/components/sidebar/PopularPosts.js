import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Clock, Eye } from "lucide-react";
import generateImageUrl from "../../utils/imageUtils";

const PopularPosts = ({ isDark, posts = [] }) => {
	// Take the top 4 posts with highest views/likes
	const popularPosts = posts
		.sort((a, b) => (b.views || 0) - (a.views || 0))
		.slice(0, 4)
		.map((post) => ({
			...post,
			image: generateImageUrl(post.title, post.categories),
		}));

	return (
		<div className={`rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} p-6 shadow-lg`}>
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<div>
					<h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Popular Posts</h3>
					<p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Most read articles this week</p>
				</div>
				<TrendingUp className={`${isDark ? "text-blue-400" : "text-blue-500"}`} size={20} />
			</div>

			{/* Posts List */}
			<div className="space-y-4">
				{popularPosts.map((post) => (
					<Link
						key={post.id}
						to={`/posts/${post.id}`}
						className={`group block ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"} 
                            rounded-lg transition-all duration-200 p-3`}
					>
						<div className="flex gap-4">
							{/* Post Image */}
							<div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
								<img
									src={post.image}
									alt={post.title}
									className="w-full h-full object-cover transform transition-transform 
                                        duration-300 group-hover:scale-110"
								/>
							</div>

							{/* Post Info */}
							<div className="flex-1">
								{/* Categories */}
								<div className="flex flex-wrap gap-2 mb-2">
									{post.categories.slice(0, 2).map((category, index) => (
										<span key={index} className="text-xs px-2 py-1 rounded-full bg-blue-500 text-white">
											{category}
										</span>
									))}
								</div>

								{/* Title */}
								<h4
									className={`font-medium line-clamp-2 mb-2 
                                    ${isDark ? "text-white" : "text-gray-900"}
                                    group-hover:text-blue-500`}
								>
									{post.title}
								</h4>

								{/* Meta Info */}
								<div className="flex items-center gap-4 text-sm">
									<div
										className={`flex items-center gap-1 
                                        ${isDark ? "text-gray-400" : "text-gray-500"}`}
									>
										<Clock size={14} />
										<span>{new Date(post.date).toLocaleDateString()}</span>
									</div>
									<div
										className={`flex items-center gap-1 
                                        ${isDark ? "text-gray-400" : "text-gray-500"}`}
									>
										<Eye size={14} />
										<span>{post.views || 0} views</span>
									</div>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>

			{/* View All Link */}
			<Link
				to="/articles"
				className={`block text-center mt-6 py-2 rounded-lg text-sm font-medium 
                    transition-all duration-200
                    ${isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
			>
				View All Articles
			</Link>
		</div>
	);
};

export default PopularPosts;
