import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Share2, Pen, Trash2, Send } from "lucide-react";

const ArticleCard = ({ article, isDark, onDelete, currentUser }) => {
	const navigate = useNavigate();
	const [isLiked, setIsLiked] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState(() => {
		return Array.isArray(article?.comments) ? article.comments : [];
	});
	const [newComment, setNewComment] = useState("");
	const [likes, setLikes] = useState(article?.likes || 0);

	const handleShare = (e) => {
		e.stopPropagation();
		if (navigator.share) {
			navigator.share({
				title: article.title,
				text: article.excerpt,
				url: `${window.location.origin}/posts/${article.id}`,
			}).catch(console.error);
		} else {
			navigator.clipboard
				.writeText(`${window.location.origin}/posts/${article.id}`)
				.then(() => alert("Link copied to clipboard!"))
				.catch(console.error);
		}
	};

	const handleEdit = (e) => {
		e.preventDefault();
		navigate(`/edit-post/${article.id}`);
	};

	const handleDelete = (e) => {
		e.preventDefault();
		if (window.confirm("Are you sure you want to delete this article?")) {
			onDelete(article.id);
		}
	};

	const handleLike = () => {
		setIsLiked(!isLiked);
		setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
	};

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		if (!newComment.trim() || !currentUser) return;

		const comment = {
			id: Date.now(),
			text: newComment.trim(),
			author: currentUser,
			date: new Date().toISOString(),
		};

		setComments((prevComments) => [comment, ...prevComments]);
		setNewComment("");
	};

	if (!article) return null;

	return (
		<div className={`rounded-xl overflow-hidden ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg relative`}>
			<div className="relative">
				<img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
				{currentUser?.id === article.author?.id && (
					<div className="absolute top-2 right-2 flex space-x-2">
						<button onClick={handleEdit} className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
							<Pen size={16} className="text-gray-600" />
						</button>
						<button onClick={handleDelete} className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
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
						<button onClick={() => setShowComments(!showComments)} className={`flex items-center space-x-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
							<MessageCircle size={18} />
							<span>{comments.length}</span>
						</button>
						<button onClick={handleShare} className={`p-2 rounded-full ${isDark ? "text-gray-400 hover:bg-gray-700" : "text-gray-500 hover:bg-gray-100"}`}>
							<Share2 size={18} />
						</button>
					</div>
				</div>

				{/* Comments Section */}
				{showComments && (
					<div className={`mt-6 border-t ${isDark ? "border-gray-700" : "border-gray-200"} pt-4`}>
						{currentUser ? (
							<form onSubmit={handleCommentSubmit} className="mb-4">
								<div className="flex space-x-2">
									<input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." className={`flex-1 p-2 rounded-lg ${isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
									<button type="submit" disabled={!newComment.trim()} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50">
										<Send size={18} />
									</button>
								</div>
							</form>
						) : (
							<p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-4`}>
								Please{" "}
								<Link to="/login" className="text-blue-500 hover:underline">
									login
								</Link>{" "}
								to comment
							</p>
						)}

						<div className="space-y-4 max-h-60 overflow-y-auto">
							{comments.map((comment) => (
								<div key={comment.id} className={`p-3 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
									<div className="flex items-center space-x-2 mb-2">
										<img src={comment.author.avatar} alt={comment.author.name} className="w-6 h-6 rounded-full" />
										<span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{comment.author.name}</span>
										<span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{new Date(comment.date).toLocaleDateString()}</span>
									</div>
									<p className={isDark ? "text-gray-300" : "text-gray-700"}>{comment.text}</p>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ArticleCard;
