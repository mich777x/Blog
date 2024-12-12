import React, { useState } from "react";
import { Heart, Reply, MoreHorizontal, Send } from "lucide-react";
const CommentSection = ({ isDark, postId, currentUser, onLoginClick }) => {
	const [comments, setComments] = useState([
		{
			id: 1,
			content: "Great article! Thanks for sharing these insights.",
			author: {
				name: "Sarah Johnson",
				avatar: "https://picsum.photos/seed/sarah/100/100",
				role: "Reader",
			},
			date: "2024-03-10T10:30:00Z",
			likes: 5,
			replies: [
				{
					id: 11,
					content: "Completely agree with your points!",
					author: {
						name: "Mike Chen",
						avatar: "https://picsum.photos/seed/mike/100/100",
						role: "Reader",
					},
					date: "2024-03-10T11:00:00Z",
					likes: 2,
				},
			],
		},
	]);

	const [newComment, setNewComment] = useState("");
	const [replyingTo, setReplyingTo] = useState(null);
	const [replyContent, setReplyContent] = useState("");
	const [likedComments, setLikedComments] = useState(new Set());

	const handleSubmitComment = (e) => {
		e.preventDefault();
		if (!currentUser) {
			onLoginClick();
			return;
		}
		if (!newComment.trim()) return;

		const comment = {
			id: Date.now(),
			content: newComment,
			author: currentUser,
			date: new Date().toISOString(),
			likes: 0,
			replies: [],
		};

		setComments((prev) => [comment, ...prev]);
		setNewComment("");
	};

	const handleSubmitReply = (commentId) => {
		if (!currentUser) {
			onLoginClick();
			return;
		}
		if (!replyContent.trim()) return;

		const reply = {
			id: Date.now(),
			content: replyContent,
			author: currentUser,
			date: new Date().toISOString(),
			likes: 0,
		};

		setComments((prev) =>
			prev.map((comment) => {
				if (comment.id === commentId) {
					return {
						...comment,
						replies: [...(comment.replies || []), reply],
					};
				}
				return comment;
			})
		);

		setReplyingTo(null);
		setReplyContent("");
	};

	const handleLikeComment = (commentId) => {
		if (!currentUser) {
			onLoginClick();
			return;
		}

		const commentKey = `comment-${commentId}`;
		setLikedComments((prev) => {
			const newLiked = new Set(prev);
			if (newLiked.has(commentKey)) {
				newLiked.delete(commentKey);
			} else {
				newLiked.add(commentKey);
			}
			return newLiked;
		});

		setComments((prev) =>
			prev.map((comment) => {
				if (comment.id === commentId) {
					return {
						...comment,
						likes: likedComments.has(`comment-${commentId}`) ? comment.likes - 1 : comment.likes + 1,
					};
				}
				return comment;
			})
		);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24)), "day");
	};

	return (
		<div className={`mt-8 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
			<h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

			{/* Comment Form */}
			<form onSubmit={handleSubmitComment} className="mb-8">
				<div className="flex items-start space-x-4">
					<img src={currentUser?.avatar || "https://picsum.photos/seed/default/100/100"} alt="User Avatar" className="w-10 h-10 rounded-full" />
					<div className="flex-grow">
						<textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder={currentUser ? "Write a comment..." : "Login to comment"} className={`w-full p-3 rounded-lg ${isDark ? "bg-gray-800 text-white placeholder-gray-400" : "bg-gray-100 text-gray-900 placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-blue-500`} rows="3" disabled={!currentUser} />
						<div className="mt-2 flex justify-end">
							<button type="submit" disabled={!currentUser || !newComment.trim()} className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${currentUser && newComment.trim() ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
								<Send size={16} />
								<span>Comment</span>
							</button>
						</div>
					</div>
				</div>
			</form>

			{/* Comments List */}
			<div className="space-y-6">
				{comments.map((comment) => (
					<div key={comment.id} className={`${isDark ? "bg-gray-800" : "bg-gray-50"} p-6 rounded-lg`}>
						{/* Comment Header */}
						<div className="flex items-start justify-between">
							<div className="flex items-center space-x-3">
								<img src={comment.author.avatar} alt={comment.author.name} className="w-10 h-10 rounded-full" />
								<div>
									<h4 className="font-medium">{comment.author.name}</h4>
									<p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{formatDate(comment.date)}</p>
								</div>
							</div>
							<button className={`p-1 rounded-full ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
								<MoreHorizontal size={20} />
							</button>
						</div>

						{/* Comment Content */}
						<p className="mt-3">{comment.content}</p>

						{/* Comment Actions */}
						<div className="mt-4 flex items-center space-x-4">
							<button onClick={() => handleLikeComment(comment.id)} className={`flex items-center space-x-1 ${likedComments.has(`comment-${comment.id}`) ? "text-blue-500" : isDark ? "text-gray-400" : "text-gray-500"}`}>
								<Heart size={16} fill={likedComments.has(`comment-${comment.id}`) ? "currentColor" : "none"} />
								<span>{comment.likes}</span>
							</button>
							<button onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} className={`flex items-center space-x-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
								<Reply size={16} />
								<span>Reply</span>
							</button>
						</div>

						{/* Reply Form */}
						{replyingTo === comment.id && (
							<div className="mt-4 ml-12">
								<div className="flex items-start space-x-4">
									<img src={currentUser?.avatar || "https://picsum.photos/seed/default/100/100"} alt="User Avatar" className="w-8 h-8 rounded-full" />
									<div className="flex-grow">
										<textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder={currentUser ? "Write a reply..." : "Login to reply"} className={`w-full p-3 rounded-lg ${isDark ? "bg-gray-700 text-white placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-blue-500`} rows="2" disabled={!currentUser} />
										<div className="mt-2 flex justify-end space-x-2">
											<button onClick={() => setReplyingTo(null)} className={`px-3 py-1 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
												Cancel
											</button>
											<button onClick={() => handleSubmitReply(comment.id)} disabled={!currentUser || !replyContent.trim()} className={`px-3 py-1 rounded-lg ${currentUser && replyContent.trim() ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
												Reply
											</button>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Replies */}
						{comment.replies && comment.replies.length > 0 && (
							<div className="mt-4 ml-12 space-y-4">
								{comment.replies.map((reply) => (
									<div key={reply.id} className={`p-4 rounded-lg ${isDark ? "bg-gray-700" : "bg-white"}`}>
										<div className="flex items-start justify-between">
											<div className="flex items-center space-x-3">
												<img src={reply.author.avatar} alt={reply.author.name} className="w-8 h-8 rounded-full" />
												<div>
													<h4 className="font-medium">{reply.author.name}</h4>
													<p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{formatDate(reply.date)}</p>
												</div>
											</div>
										</div>
										<p className="mt-2">{reply.content}</p>
										<div className="mt-2">
											<button onClick={() => handleLikeComment(reply.id)} className={`flex items-center space-x-1 ${likedComments.has(`comment-${reply.id}`) ? "text-blue-500" : isDark ? "text-gray-400" : "text-gray-500"}`}>
												<Heart size={16} fill={likedComments.has(`comment-${reply.id}`) ? "currentColor" : "none"} />
												<span>{reply.likes}</span>
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default CommentSection;
