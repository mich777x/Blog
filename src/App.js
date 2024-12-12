import React, { useState, useRef } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import ReadingProgress from "./components/ReadingProgress";
import Header from "./components/Header";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Categories from "./components/Categories";
import About from "./components/About";
import PostEditor from "./components/PostEditor";
import PostView from "./components/PostView";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";
import { UserProvider } from "./contexts/UserContext";
import Login from "./components/Login.js";

// Route Components
const EditPostWrapper = ({ posts, onUpdatePost, isDark, currentUser }) => {
	const { id } = useParams();
	const post = posts.find((post) => post.id === parseInt(id));

	return (
		<ProtectedRoute currentUser={currentUser}>
			<PostEditor initialPost={post} onSave={onUpdatePost} isDark={isDark} currentUser={currentUser} />
		</ProtectedRoute>
	);
};

const ViewPostWrapper = ({ posts, onEdit, onDelete, isDark, currentUser }) => {
	const { id } = useParams();
	const post = posts.find((post) => post.id === parseInt(id));

	return <PostView post={post} onEdit={onEdit} onDelete={onDelete} isDark={isDark} currentUser={currentUser} />;
};

const CreatePostWrapper = ({ onSave, isDark, currentUser }) => {
	const navigate = useNavigate();

	const handleSave = async (post) => {
		await onSave(post);
		navigate("/");
	};

	return (
		<ProtectedRoute currentUser={currentUser}>
			<PostEditor onSave={handleSave} isDark={isDark} currentUser={currentUser} />
		</ProtectedRoute>
	);
};

const App = () => {
	// State Management
	const [isDark, setIsDark] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [showLoginModal, setShowLoginModal] = useState(false);
	const containerRef = useRef(null);

	// Initialize posts with a default post
	const [posts, setPosts] = useState([
		{
			id: 1,
			title: "Welcome to BlogElite",
			excerpt: "This is your first post. Login to start creating your own content.",
			content: "Welcome to BlogElite. This is a sample post to get you started.",
			image: "https://picsum.photos/seed/welcome/800/400",
			categories: ["Getting Started"],
			author: {
				name: "Admin",
				avatar: "https://picsum.photos/seed/admin/100/100",
				role: "Administrator",
			},
			date: new Date().toISOString(),
			likes: 0,
			comments: 0,
			shares: 0,
			views: 0,
		},
	]);

	const [currentUser, setCurrentUser] = useState(null);

	// Post Management Functions
	const handleCreatePost = async (post) => {
		if (!currentUser) {
			setShowLoginModal(true);
			return;
		}

		const newPost = {
			...post,
			id: Date.now(),
			author: currentUser,
			date: new Date().toISOString(),
			image: `https://picsum.photos/seed/${Date.now()}/800/400`,
			likes: 0,
			comments: 0,
			shares: 0,
			views: 0,
		};
		setPosts((prevPosts) => [newPost, ...prevPosts]);
		return newPost;
	};

	const handleUpdatePost = async (updatedPost) => {
		setPosts((prevPosts) => prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
	};

	const handleDeletePost = async (postId) => {
		setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
	};

	// User Management Functions
	const handleLogin = () => {
		setCurrentUser({
			id: 1,
			name: "Demo User",
			avatar: "https://picsum.photos/seed/user1/100/100",
			role: "Writer",
			bio: "A passionate writer sharing thoughts and ideas",
			stats: {
				articles: 5,
				followers: "100",
			},
		});
		setShowLoginModal(false);
	};

	const handleLogout = () => {
		setCurrentUser(null);
	};

	return (
		<UserProvider>
			<div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
				<ReadingProgress target={containerRef} />
				<Header
					isDark={isDark}
					toggleTheme={() => setIsDark(!isDark)}
					currentUser={currentUser}
					onLogout={handleLogout}
					posts={posts} // Make sure this is being passed
				/>

				<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20" ref={containerRef}>
					<Routes>
						<Route path="/" element={<Home posts={posts} isDark={isDark} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} currentUser={currentUser} onDeletePost={handleDeletePost} onLoginClick={() => setShowLoginModal(true)} />} />
						<Route path="/login" element={<Login isDark={isDark} />} />
						<Route path="/articles" element={<Articles posts={posts} isDark={isDark} currentUser={currentUser} onDeletePost={handleDeletePost} />} />
						<Route path="/categories" element={<Categories isDark={isDark} posts={posts} onCategoryChange={setSelectedCategory} />} />
						<Route path="/about" element={<About isDark={isDark} />} />
						<Route path="/new-post" element={<CreatePostWrapper onSave={handleCreatePost} isDark={isDark} currentUser={currentUser} />} />
						<Route path="/edit-post/:id" element={<EditPostWrapper posts={posts} onUpdatePost={handleUpdatePost} isDark={isDark} currentUser={currentUser} />} />
						<Route path="/posts/:id" element={<ViewPostWrapper posts={posts} onEdit={handleUpdatePost} onDelete={handleDeletePost} isDark={isDark} currentUser={currentUser} />} />
						<Route path="/profile" element={<UserProfile isDark={isDark} />} />
					</Routes>

					{/* Login Modal */}
					{showLoginModal && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
							<div className={`${isDark ? "bg-gray-800" : "bg-white"} p-8 rounded-lg shadow-xl max-w-md w-full`}>
								<h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Login Required</h2>
								<p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>You need to be logged in to create or edit posts.</p>
								<div className="flex justify-end space-x-4">
									<button onClick={() => setShowLoginModal(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">
										Cancel
									</button>
									<button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
										Login
									</button>
								</div>
							</div>
						</div>
					)}
				</main>
			</div>
		</UserProvider>
	);
};

export default App;
