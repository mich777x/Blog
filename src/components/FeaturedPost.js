import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";

const FeaturedPost = ({ post, isDark }) => {
	const [isHovered, setIsHovered] = useState(false);

	// Early return with null if no post is provided
	if (!post) return null;

	return (
		<div className={`relative h-[600px] rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${isHovered ? "transform scale-[1.02]" : ""}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			<img src={post.image} alt={post.title} className="w-full h-full object-cover" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
				<div className="absolute bottom-0 p-8 w-full">
					<div className="flex flex-wrap items-center gap-2 mb-4">
						{post.categories?.map((category, index) => (
							<span key={index} className="px-4 py-1 bg-blue-500 text-white text-sm rounded-full">
								{category}
							</span>
						))}
					</div>

					<h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
					<p className="text-xl text-gray-200 mb-6 max-w-3xl">{post.excerpt}</p>

					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<img src={post.author?.avatar || "/api/placeholder/100/100?default"} alt={post.author?.name || "Author"} className="w-12 h-12 rounded-full border-2 border-white" />
							<div>
								<h3 className="text-white font-medium">{post.author?.name || "Anonymous"}</h3>
								<p className="text-gray-300">{post.author?.role || "Contributor"}</p>
							</div>
						</div>

						<div className="flex items-center space-x-6 text-white">
							<div className="flex items-center space-x-2">
								<Calendar size={20} />
								<span>{new Date(post.date).toLocaleDateString()}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Clock size={20} />
								<span>{post.readTime}</span>
							</div>
							<Link to={`/posts/${post.id}`} className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors">
								Read More
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeaturedPost;
