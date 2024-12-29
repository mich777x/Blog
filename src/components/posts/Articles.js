import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Share2, Pen, Trash2, Send } from "lucide-react";

const Articles = ({ posts, isDark, currentUser, onDelete }) => {
	const navigate = useNavigate();

	// State for individual article interactions
	const [articleStates, setArticleStates] = useState(
		posts.reduce(
			(acc, post) => ({
				...acc,
				[post.id]: {
					isLiked: false,
					showComments: false,
					comments: Array.isArray(post.comments) ? post.comments : [],
					newComment: "",
					likes: post.likes || 0,
				},
			}),
			{}
		)
	);

	if (!Array.isArray(posts)) {
		return (
			<div className="py-8">
				<h1 className={`text-3xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"}`}>No articles available</h1>
			</div>
		);
	}

	const handleShare = (e, article) => {
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

	const handleEdit = (e, articleId) => {
		e.preventDefault();
		navigate(`/edit-post/${articleId}`);
	};

	const handleDelete = (e, articleId) => {
		e.preventDefault();
		if (window.confirm("Are you sure you want to delete this article?")) {
			onDelete(articleId);
		}
	};

	const handleLike = (articleId) => {
		setArticleStates((prev) => ({
			...prev,
			[articleId]: {
				...prev[articleId],
				isLiked: !prev[articleId].isLiked,
				likes: prev[articleId].isLiked ? prev[articleId].likes - 1 : prev[articleId].likes + 1,
			},
		}));
	};

	const handleCommentSubmit = (e, articleId) => {
		e.preventDefault();
		const articleState = articleStates[articleId];

		if (!articleState.newComment.trim() || !currentUser) return;

		const comment = {
			id: Date.now(),
			text: articleState.newComment.trim(),
			author: currentUser,
			date: new Date().toISOString(),
		};

		setArticleStates((prev) => ({
			...prev,
			[articleId]: {
				...prev[articleId],
				comments: [comment, ...prev[articleId].comments],
				newComment: "",
			},
		}));
	};

	return (
		<div className="py-8">
			<h1 className={`text-3xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"}`}>All Articles</h1>

			<div className="grid grid-cols-1 md:grid-cols-2  gap-8">
				{posts.map((article) => (
					<div key={article.id} className={`rounded-xl overflow-hidden ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg relative`}>
						<div className="relative">
							<img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
							{currentUser?.id === article.author?.id && (
								<div className="absolute top-2 right-2 flex space-x-2">
									<button onClick={(e) => handleEdit(e, article.id)} className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
										<Pen size={16} className="text-gray-600" />
									</button>
									<button onClick={(e) => handleDelete(e, article.id)} className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
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
									<button onClick={() => handleLike(article.id)} className={`flex items-center space-x-1 ${articleStates[article.id].isLiked ? "text-red-500" : isDark ? "text-gray-400" : "text-gray-500"}`}>
										<Heart size={18} fill={articleStates[article.id].isLiked ? "currentColor" : "none"} />
										<span>{articleStates[article.id].likes}</span>
									</button>
									<button
										onClick={() =>
											setArticleStates((prev) => ({
												...prev,
												[article.id]: {
													...prev[article.id],
													showComments: !prev[article.id].showComments,
												},
											}))
										}
										className={`flex items-center space-x-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
									>
										<MessageCircle size={18} />
										<span>{articleStates[article.id].comments.length}</span>
									</button>
									<button onClick={(e) => handleShare(e, article)} className={`p-2 rounded-full ${isDark ? "text-gray-400 hover:bg-gray-700" : "text-gray-500 hover:bg-gray-100"}`}>
										<Share2 size={18} />
									</button>
								</div>
							</div>

							{/* Comments Section */}
							{articleStates[article.id].showComments && (
								<div className={`mt-6 border-t ${isDark ? "border-gray-700" : "border-gray-200"} pt-4`}>
									{currentUser ? (
										<form onSubmit={(e) => handleCommentSubmit(e, article.id)} className="mb-4">
											<div className="flex space-x-2">
												<input
													type="text"
													value={articleStates[article.id].newComment}
													onChange={(e) =>
														setArticleStates((prev) => ({
															...prev,
															[article.id]: {
																...prev[article.id],
																newComment: e.target.value,
															},
														}))
													}
													placeholder="Write a comment..."
													className={`flex-1 p-2 rounded-lg ${isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
												/>
												<button type="submit" disabled={!articleStates[article.id].newComment.trim()} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50">
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
										{articleStates[article.id].comments.map((comment) => (
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
				))}
			</div>
		</div>
	);
};

export default Articles;
