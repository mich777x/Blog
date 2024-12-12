import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, Pen, Trash2 } from "lucide-react";

const ArticleCard = ({ article, isDark, onEdit, onDelete, currentUser }) => {
	const [isLiked, setIsLiked] = useState(false);
	const [likes, setLikes] = useState(article.likes || 0);

	const handleLike = () => {
		setIsLiked(!isLiked);
		setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
	};

	return (
		<div className={`rounded-xl overflow-hidden ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}>
			<div className="relative">
				<img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
				{currentUser?.id === article.author?.id && (
					<div className="absolute top-2 right-2 flex space-x-2">
						<button
							onClick={(e) => {
								e.preventDefault();
								onEdit(article.id);
							}}
							className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
						>
							<Pen size={16} className="text-gray-600" />
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								if (window.confirm("Are you sure you want to delete this article?")) {
									onDelete(article.id);
								}
							}}
							className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
						>
							<Trash2 size={16} className="text-red-500" />
						</button>
					</div>
				)}
			</div>

			<div className="p-6">
				<div className="flex flex-wrap gap-2 mb-3">
					{article.categories?.map((category, index) => (
						<span key={index} className="px-3 py-1 text-sm rounded-full bg-blue-500 text-white">
							{category}
						</span>
					))}
				</div>

				<Link to={`/posts/${article.id}`}>
					<h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{article.title}</h3>
				</Link>

				<p className={`mb-4 line-clamp-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{article.excerpt}</p>

				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<img src={article.author?.avatar} alt={article.author?.name} className="w-10 h-10 rounded-full" />
						<div>
							<p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{article.author?.name}</p>
							<p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{new Date(article.date).toLocaleDateString()}</p>
						</div>
					</div>

					<div className="flex items-center space-x-4">
						<button onClick={handleLike} className={`flex items-center space-x-1 ${isLiked ? "text-red-500" : isDark ? "text-gray-400" : "text-gray-500"}`}>
							<Heart size={18} fill={isLiked ? "currentColor" : "none"} />
							<span>{likes}</span>
						</button>
						<div className="flex items-center space-x-1 text-gray-500">
							<MessageCircle size={18} />
							<span>{article.comments || 0}</span>
						</div>
						<button className="text-gray-500 hover:text-gray-700">
							<Share2 size={18} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArticleCard;
