import React from "react";
import ArticleCard from "./ArticleCard";
import { useNavigate } from "react-router-dom";

const Articles = ({ posts, isDark, currentUser, onDeletePost }) => {
	const navigate = useNavigate();

	return (
		<div className="py-8">
			<h1 className={`text-3xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"}`}>All Articles</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{posts.map((post) => (
					<ArticleCard key={post.id} article={post} isDark={isDark} onEdit={() => navigate(`/edit-post/${post.id}`)} onDelete={onDeletePost} currentUser={currentUser} />
				))}
			</div>
		</div>
	);
};

export default Articles;
