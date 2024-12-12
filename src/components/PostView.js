import React from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2, Heart, MessageCircle, Share2, Clock } from "lucide-react";
import CommentSection from "./CommentSection";

const PostView = ({ post, onEdit, onDelete, isDark, currentUser }) => {
	const navigate = useNavigate();

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this post?")) {
			onDelete(post.id);
			navigate("/");
		}
	};

	const handleLoginClick = () => {
		// You can implement your login logic here
		// For now, we'll just alert
		alert("Please log in to interact");
	};

	if (!post) {
		return <div className={`p-8 text-center ${isDark ? "text-gray-200" : "text-gray-800"}`}>Post not found</div>;
	}

	return (
		<article className={`max-w-4xl mx-auto px-4 py-8 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
			{/* Post Header */}
			<div className="mb-8">
				<div className="flex justify-between items-center mb-4">
					<div className="flex items-center space-x-4">
						<img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full" />
						<div>
							<h3 className="font-medium">{post.author.name}</h3>
							<p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{post.author.role}</p>
						</div>
					</div>

					{currentUser && currentUser.name === post.author.name && (
						<div className="flex space-x-2">
							<button onClick={() => navigate(`/edit-post/${post.id}`)} className={`p-2 rounded-full ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}>
								<Edit2 size={20} />
							</button>
							<button onClick={handleDelete} className="p-2 rounded-full hover:bg-red-100 text-red-500">
								<Trash2 size={20} />
							</button>
						</div>
					)}
				</div>

				<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
				<div className="flex flex-wrap gap-2 mb-4">
					{post.categories.map((category, index) => (
						<span key={index} className={`px-3 py-1 rounded-full text-sm ${isDark ? "bg-gray-800 text-blue-400" : "bg-blue-100 text-blue-600"}`}>
							{category}
						</span>
					))}
				</div>

				<div className="flex items-center space-x-4 text-sm">
					<span className="flex items-center space-x-1">
						<Clock size={16} />
						<span>{new Date(post.date).toLocaleDateString()}</span>
					</span>
					<span className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>{post.readTime} read</span>
				</div>
			</div>

			{/* Post Image */}
			{post.image && (
				<div className="mb-8">
					<img src={post.image} alt={post.title} className="w-full h-auto rounded-lg object-cover" />
				</div>
			)}

			{/* Post Content */}
			<div className={`prose max-w-none mb-8 ${isDark ? "prose-invert" : ""}`} dangerouslySetInnerHTML={{ __html: post.content }} />

			{/* Post Stats */}
			<div className="flex items-center justify-between py-6 border-t border-b">
				<div className="flex items-center space-x-6">
					<button onClick={currentUser ? undefined : handleLoginClick} className={`flex items-center space-x-2 ${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
						<Heart size={20} />
						<span>{post.likes}</span>
					</button>
					<button onClick={currentUser ? undefined : handleLoginClick} className={`flex items-center space-x-2 ${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
						<MessageCircle size={20} />
						<span>{post.comments}</span>
					</button>
					<button onClick={currentUser ? undefined : handleLoginClick} className={`flex items-center space-x-2 ${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
						<Share2 size={20} />
						<span>{post.shares}</span>
					</button>
				</div>
			</div>

			{/* Comment Section */}
			<CommentSection isDark={isDark} postId={post.id} currentUser={currentUser} onLoginClick={handleLoginClick} />
		</article>
	);
};

export default PostView;
