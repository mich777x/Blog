import React, { useState } from "react";
import { Settings, Heart, MessageCircle, Calendar, MapPin, Link as LinkIcon, Twitter, Github, Linkedin } from "lucide-react";

const UserProfile = ({ isDark }) => {
	const [activeTab, setActiveTab] = useState("articles");

	// Sample user data
	const userData = {
		name: "JohnDoe",
		username: "@JohnDoe",
		avatar: "/api/placeholder/150/150",
		bio: "Senior Frontend Developer | Tech Writer | Open Source Contributor",
		location: "San Francisco, CA",
		website: "JohnDoe.dev",
		joinDate: "March 2024",
		stats: {
			articles: 45,
			followers: 2840,
			following: 892,
			likes: 1253,
		},
		social: {
			twitter: "@JohnDoe",
			github: "JohnDoe",
			linkedin: "JohnDoe",
		},
	};

	// Sample articles data
	const articles = [
		{
			id: 1,
			title: "Modern React Best Practices in 2024",
			excerpt: "Learn about the latest React patterns and practices...",
			date: "Mar 10, 2024",
			readTime: "8 min",
			likes: 234,
			comments: 45,
			image: "/api/placeholder/400/250",
		},
		{
			id: 2,
			title: "Building Scalable Frontend Architecture",
			excerpt: "A comprehensive guide to structuring large applications...",
			date: "Mar 5, 2024",
			readTime: "12 min",
			likes: 189,
			comments: 32,
			image: "/api/placeholder/400/250",
		},
	];

	// Sample bookmarks data
	const bookmarks = [
		{
			id: 1,
			title: "The Future of Web Development",
			author: "John Doe",
			date: "Mar 8, 2024",
			image: "/api/placeholder/400/250",
		},
	];

	return (
		<div className={`min-h-screen ${isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
			{/* Profile Header */}
			<div className={`w-full h-48 bg-gradient-to-r from-blue-500 to-purple-600`} />

			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="relative -mt-24">
					<div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-xl shadow-lg p-6`}>
						<div className="flex flex-col md:flex-row items-start md:items-center gap-6">
							<img src={userData.avatar} alt={userData.name} className="w-32 h-32 rounded-full border-4 border-white shadow-lg" />

							<div className="flex-1">
								<div className="flex items-start justify-between">
									<div>
										<h1 className="text-2xl font-bold">{userData.name}</h1>
										<p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{userData.username}</p>
									</div>

									<div className="flex gap-2">
										<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Follow</button>
										<button className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
											<Settings size={20} />
										</button>
									</div>
								</div>

								<p className="mt-4">{userData.bio}</p>

								<div className="mt-4 flex flex-wrap gap-4">
									<span className="flex items-center text-sm">
										<MapPin size={16} className="mr-1" />
										{userData.location}
									</span>
									<span className="flex items-center text-sm">
										<LinkIcon size={16} className="mr-1" />
										{userData.website}
									</span>
									<span className="flex items-center text-sm">
										<Calendar size={16} className="mr-1" />
										Joined {userData.joinDate}
									</span>
								</div>

								<div className="mt-6 flex gap-6">
									<div className="text-center">
										<div className="font-bold">{userData.stats.articles}</div>
										<div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Articles</div>
									</div>
									<div className="text-center">
										<div className="font-bold">{userData.stats.followers}</div>
										<div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Followers</div>
									</div>
									<div className="text-center">
										<div className="font-bold">{userData.stats.following}</div>
										<div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Following</div>
									</div>
									<div className="text-center">
										<div className="font-bold">{userData.stats.likes}</div>
										<div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Likes</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Content Tabs */}
				<div className="mt-8">
					<div className="flex border-b border-gray-200">
						{["articles", "bookmarks", "about"].map((tab) => (
							<button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 font-medium capitalize transition-colors ${activeTab === tab ? `border-b-2 border-blue-500 ${isDark ? "text-blue-400" : "text-blue-600"}` : isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"}`}>
								{tab}
							</button>
						))}
					</div>

					<div className="py-8">
						{activeTab === "articles" && (
							<div className="grid md:grid-cols-2 gap-6">
								{articles.map((article) => (
									<div key={article.id} className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-xl shadow-lg overflow-hidden`}>
										<img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
										<div className="p-6">
											<h3 className="text-xl font-bold mb-2">{article.title}</h3>
											<p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{article.excerpt}</p>
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-4">
													<span className="flex items-center">
														<Heart size={16} className="mr-1" />
														{article.likes}
													</span>
													<span className="flex items-center">
														<MessageCircle size={16} className="mr-1" />
														{article.comments}
													</span>
												</div>
												<div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
													{article.date} · {article.readTime}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						)}

						{activeTab === "bookmarks" && (
							<div className="grid md:grid-cols-2 gap-6">
								{bookmarks.map((bookmark) => (
									<div key={bookmark.id} className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-xl shadow-lg overflow-hidden`}>
										<img src={bookmark.image} alt={bookmark.title} className="w-full h-48 object-cover" />
										<div className="p-6">
											<h3 className="text-xl font-bold mb-2">{bookmark.title}</h3>
											<div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
												By {bookmark.author} · {bookmark.date}
											</div>
										</div>
									</div>
								))}
							</div>
						)}

						{activeTab === "about" && (
							<div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-xl shadow-lg p-6`}>
								<h3 className="text-xl font-bold mb-6">Connect with me</h3>
								<div className="space-y-4">
									<a href="#" className="flex items-center space-x-2 hover:text-blue-500">
										<Twitter size={20} />
										<span>{userData.social.twitter}</span>
									</a>
									<a href="#" className="flex items-center space-x-2 hover:text-blue-500">
										<Github size={20} />
										<span>{userData.social.github}</span>
									</a>
									<a href="#" className="flex items-center space-x-2 hover:text-blue-500">
										<Linkedin size={20} />
										<span>{userData.social.linkedin}</span>
									</a>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
