import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Share2, Edit2, Trash2, Clock, Copy, Send } from "lucide-react";

const PostView = ({ posts, onEdit, onDelete, isDark, currentUser }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState(null);
	const [isLiked, setIsLiked] = useState(false);
	const [likes, setLikes] = useState(0);
	const [showShareMenu, setShowShareMenu] = useState(false);
	const [copySuccess, setCopySuccess] = useState("");
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");

	useEffect(() => {
		const foundPost = posts?.find((p) => p.id === parseInt(id));
		if (foundPost) {
			setPost(foundPost);
			setLikes(foundPost.likes || 0);
			// Load comments from localStorage
			const savedComments = localStorage.getItem(`comments-${id}`);
			if (savedComments) {
				setComments(JSON.parse(savedComments));
			}
		}
	}, [id, posts]);

	const handleShare = () => {
		const shareUrl = window.location.href;

		navigator.clipboard
			.writeText(shareUrl)
			.then(() => {
				setCopySuccess("Link Copied!");
				setTimeout(() => setCopySuccess(""), 2000);
			})
			.catch(() => setCopySuccess("Failed to copy"));

		setShowShareMenu(false);
	};

	const handleSubmitComment = (e) => {
		e.preventDefault();
		if (!newComment.trim()) return;

		if (!currentUser) {
			navigate("/login");
			return;
		}

		const comment = {
			id: Date.now(),
			userId: currentUser.id,
			username: currentUser.name,
			avatar: currentUser.avatar || "/api/placeholder/40/40",
			content: newComment,
			timestamp: new Date().toISOString(),
			likes: 0,
			isLiked: false,
		};

		const updatedComments = [comment, ...comments];
		setComments(updatedComments);
		localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
		setNewComment("");
	};

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this post?")) {
			onDelete(post.id);
			navigate("/");
		}
	};

	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		const now = new Date();
		const diff = now - date;

		const minutes = Math.floor(diff / 60000);
		const hours = Math.floor(diff / 3600000);
		const days = Math.floor(diff / 86400000);

		if (minutes < 60) return `${minutes}m ago`;
		if (hours < 24) return `${hours}h ago`;
		return `${days}d ago`;
	};

	if (!post) {
		return <div className={`flex items-center justify-center min-h-[400px] ${isDark ? "text-gray-300" : "text-gray-700"}`}>Post not found</div>;
	}

	return (
		<article className={`max-w-4xl mx-auto px-4 py-8 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
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

			{/* Post Actions */}
			<div className="flex items-center justify-between py-6 border-t border-b">
				<div className="flex items-center space-x-6">
					<button
						onClick={() => {
							if (!currentUser) {
								navigate("/login");
								return;
							}
							setIsLiked(!isLiked);
							setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
						}}
						className={`flex items-center space-x-2 ${isLiked ? "text-red-500" : isDark ? "text-gray-300" : "text-gray-600"}`}
					>
						<Heart size={20} fill={isLiked ? "currentColor" : "none"} />
						<span>{likes}</span>
					</button>

					<div className="relative">
						<button onClick={() => setShowShareMenu(!showShareMenu)} className={`flex items-center space-x-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
							<Share2 size={20} />
							<span>Share</span>
						</button>

						{showShareMenu && (
							<>
								<div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />
								<div
									className={`
										absolute right-0 top-full mt-2 w-72 rounded-lg shadow-2xl z-50 
										${isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-800"}
										border overflow-hidden transform origin-top-right
									`}
									style={{
										minWidth: "max-content",
										transformOrigin: "top right",
										animation: "fadeIn 0.2s ease-out",
									}}
								>
									<div className="py-1">
										<button
											onClick={handleShare}
											className={`
												flex items-center space-x-4 px-5 py-3 w-full text-left 
												${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}
												transition-colors group
											`}
										>
											<Copy size={20} className="text-blue-500 mr-2 group-hover:scale-110 transition-transform" />
											<span className="flex-grow">{copySuccess || "Copy Link"}</span>
										</button>
									</div>
								</div>
								<style jsx>{`
									@keyframes fadeIn {
										from {
											opacity: 0;
											transform: scale(0.9);
										}
										to {
											opacity: 1;
											transform: scale(1);
										}
									}
								`}</style>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Comments Section */}
			<div className={`mt-6 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
				<h3 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>Comments ({comments.length})</h3>

				{/* Comment Input */}
				{currentUser ? (
					<form onSubmit={handleSubmitComment} className="mb-6">
						<div className="flex items-start space-x-4">
							<img src={currentUser.avatar || "/api/placeholder/40/40"} alt="User" className="w-10 h-10 rounded-full" />
							<div className="flex-1">
								<textarea
									value={newComment}
									onChange={(e) => setNewComment(e.target.value)}
									placeholder="Write a comment..."
									className={`w-full p-3 rounded-lg 
										${isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}
										focus:outline-none focus:ring-2 focus:ring-blue-500`}
									rows="3"
								/>
								<button
									type="submit"
									disabled={!newComment.trim()}
									className={`mt-2 px-4 py-2 rounded-lg flex items-center space-x-2 
										${newComment.trim() ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-400 cursor-not-allowed text-gray-200"}`}
								>
									<Send size={16} />
									<span>Comment</span>
								</button>
							</div>
						</div>
					</form>
				) : (
					<div className="text-center py-4">
						<p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>Please log in to leave a comment</p>
						<button onClick={() => navigate("/login")} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
							Login
						</button>
					</div>
				)}

				{/* Comments List */}
				{comments.length > 0 ? (
					<div className="space-y-6">
						{comments.map((comment) => (
							<div key={comment.id} className={`${isDark ? "bg-gray-800" : "bg-white"} p-4 rounded-lg shadow`}>
								<div className="flex items-start space-x-3">
									<img src={comment.avatar} alt={comment.username} className="w-10 h-10 rounded-full" />
									<div className="flex-1">
										<div className="flex items-center justify-between">
											<div>
												<span className="font-medium">{comment.username}</span>
												<span className={`ml-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{formatTimestamp(comment.timestamp)}</span>
											</div>
										</div>
										<p className="mt-1">{comment.content}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className={`text-center py-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>No comments yet. Be the first to comment!</div>
				)}
			</div>
		</article>
	);
};

export default PostView;
