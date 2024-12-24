import React from "react";
import ArticleCard from "./ArticleCard";

const Articles = ({ posts, isDark, currentUser, onDeletePost }) => {
	if (!Array.isArray(posts)) {
		return (
			<div className="py-8">
				<h1 className={`text-3xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"}`}>No articles available</h1>
			</div>
		);
	}

	return (
		<div className="py-8">
			<h1 className={`text-3xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"}`}>All Articles</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{posts.map((post) => (
					<ArticleCard key={post.id} article={post} isDark={isDark} currentUser={currentUser} onDelete={onDeletePost} />
				))}
			</div>
		</div>
	);
};

export default Articles;
