import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./components/Home";
import Articles from "./components/posts/Articles";
import Categories from "./components/categories/Categories";
import About from "./components/static/About";
import PostEditor from "./components/posts/PostEditor";
import PostView from "./components/posts/PostView";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { UserProvider } from "./contexts/UserContext";
import Login from "./components/auth/Login";
import { generateRandomPosts } from "./utils/postGenerator";
import DataService from "./services/DataService";

const App = () => {
	const navigate = useNavigate();
	const [isDark, setIsDark] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [posts, setPosts] = useState(() => generateRandomPosts(15));

	// User Management Functions
	const handleLogin = (userData) => {
		const user = {
			id: 1,
			name: "Demo User",
			avatar: "/api/placeholder/100/100?text=DU",
			role: "Writer",
			bio: "A passionate writer sharing thoughts and ideas",
			stats: {
				articles: 5,
				followers: "100",
			},
		};
		setCurrentUser(user);
		setShowLoginModal(false);
		navigate("/"); // Redirect to home after login
	};

	const handleLogout = () => {
		setCurrentUser(null);
		navigate("/");
	};

	useEffect(() => {
		const savedCategory = localStorage.getItem("selectedCategory");
		if (savedCategory) {
			setSelectedCategory(savedCategory);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("selectedCategory", selectedCategory);
	}, [selectedCategory]);
	const handleLikePost = useCallback(
		(postId) => {
			setPosts((prevPosts) => {
				const updatedPosts = prevPosts.map((post) => {
					if (post.id === postId) {
						const isCurrentlyLiked = DataService.hasLiked("post", postId, currentUser?.id);
						const newLikesCount = isCurrentlyLiked ? post.likes - 1 : post.likes + 1;

						// Save like state
						DataService.saveLike("post", postId, currentUser?.id);

						return {
							...post,
							likes: newLikesCount,
						};
					}
					return post;
				});

				// Save updated posts to localStorage
				DataService.savePosts(updatedPosts);
				return updatedPosts;
			});
		},
		[currentUser]
	);

	// Add Comment Handler
	const handleAddComment = useCallback((postId, commentContent) => {
		setPosts((prevPosts) => {
			const updatedPosts = prevPosts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						comments: (post.comments || 0) + 1,
					};
				}
				return post;
			});

			// Save updated posts to localStorage
			DataService.savePosts(updatedPosts);
			return updatedPosts;
		});
	}, []);

	// Create Post Handler
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
			views: 0,
		};

		const updatedPosts = [newPost, ...posts];
		setPosts(updatedPosts);
		DataService.savePosts(updatedPosts);
		return newPost;
	};

	// Update Post Handler

	const handleUpdatePost = async (updatedPost) => {
		try {
			setPosts((prevPosts) => {
				const updatedPosts = prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post));
				// Save to localStorage
				DataService.savePosts(updatedPosts);
				return updatedPosts;
			});
			return updatedPost;
		} catch (error) {
			console.error("Error updating post:", error);
			throw error;
		}
	};

	// Delete Post Handler
	const handleDeletePost = async (postId) => {
		setPosts((prevPosts) => {
			const updatedPosts = prevPosts.filter((post) => post.id !== postId);
			DataService.savePosts(updatedPosts);
			return updatedPosts;
		});
	};

	return (
		<UserProvider value={{ user: currentUser, updateUser: setCurrentUser }}>
			<div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
				<Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} currentUser={currentUser} onLogout={handleLogout} posts={posts} />

				<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
					<Routes>
						<Route path="/" element={<Home posts={posts} isDark={isDark} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} currentUser={currentUser} onDeletePost={handleDeletePost} onLoginClick={() => setShowLoginModal(true)} />} />
						<Route path="/posts/:id" element={<PostView posts={posts} onEdit={handleUpdatePost} onDelete={handleDeletePost} onLike={handleLikePost} onAddComment={handleAddComment} isDark={isDark} currentUser={currentUser} />} />
						<Route path="/login" element={<Login isDark={isDark} onLogin={handleLogin} />} />
						<Route path="/articles" element={<Articles posts={posts} isDark={isDark} currentUser={currentUser} onDeletePost={handleDeletePost} onUpdatePost={handleUpdatePost} />} />
						<Route path="/categories" element={<Categories isDark={isDark} posts={posts} onCategoryChange={setSelectedCategory} />} />
						<Route path="/about" element={<About isDark={isDark} />} />
						<Route
							path="/new-post"
							element={
								<ProtectedRoute currentUser={currentUser}>
									<PostEditor onSave={handleCreatePost} isDark={isDark} currentUser={currentUser} />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/edit-post/:id"
							element={
								<ProtectedRoute currentUser={currentUser}>
									<PostEditor posts={posts} onSave={handleUpdatePost} isDark={isDark} currentUser={currentUser} />
								</ProtectedRoute>
							}
						/>
						<Route path="/posts/:id" element={<PostView posts={posts} onEdit={handleUpdatePost} onDelete={handleDeletePost} isDark={isDark} currentUser={currentUser} />} />
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
