import React from "react";
import { Link } from "react-router-dom";
import FeaturedPost from "./posts/FeaturedPost";
import CategoryFilter from "./categories/CategoryFilter";
import Articles from "./posts/Articles";
import TrendingTopics from "./sidebar/TrendingTopics";
import PopularPosts from "./sidebar/PopularPosts";

const Home = ({ posts, isDark, selectedCategory, setSelectedCategory, currentUser, onDeletePost }) => {
	// Filter posts based on selected category
	const filteredPosts = selectedCategory === "All" ? posts : posts.filter((post) => post.categories.some((category) => category.toLowerCase() === selectedCategory.toLowerCase()));

	// Get the featured post (most recent)
	const featuredPost = filteredPosts[0];
	// Get remaining posts for the articles section (exclude featured post)
	const latestPosts = filteredPosts.slice(1);

	return (
		<>
			{/* Featured Post Section */}
			{featuredPost && (
				<div className="py-8">
					<FeaturedPost post={featuredPost} isDark={isDark} />
				</div>
			)}

			{/* Category Filter */}
			<div className="py-6">
				<CategoryFilter isDark={isDark} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
			</div>

			{/* Main Content Grid */}
			<div className="py-8 grid grid-cols-12 gap-8">
				{/* Articles Section */}
				<div className="col-span-12 lg:col-span-8">
					<div className="flex justify-between items-center mb-8">
						<h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Latest Articles</h2>
						{currentUser && (
							<Link to="/new-post" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
								Create Post
							</Link>
						)}
					</div>

					{latestPosts.length > 0 ? <Articles posts={latestPosts} isDark={isDark} currentUser={currentUser} onDelete={onDeletePost} /> : <div className={`text-center py-12 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{selectedCategory === "All" ? <p className="text-lg">{posts.length === 1 ? "Create your first post to see it here!" : "No additional articles yet."}</p> : <p className="text-lg">No articles found in this category.</p>}</div>}
				</div>

				{/* Sidebar */}
				<div className="col-span-12 lg:col-span-4 space-y-8">
					<TrendingTopics isDark={isDark} posts={posts} />
					<PopularPosts isDark={isDark} posts={posts} />
				</div>
			</div>
		</>
	);
};

export default Home;
