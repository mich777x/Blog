import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Login = ({ isDark }) => {
	const navigate = useNavigate();
	const { updateUser } = useUser();
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);

		// Simulate login - in a real app, this would be an API call
		const mockUser = {
			id: "1",
			name: "John Doe",
			username: "@johndoe",
			email: "john@example.com",
			avatar: "/api/placeholder/150/150",
			bio: "Frontend Developer passionate about creating beautiful user experiences",
			location: "San Francisco, CA",
			website: "johndoe.dev",
			joinDate: new Date().toISOString(),
			stats: {
				articles: 12,
				followers: 1234,
				following: 567,
			},
			social: {
				twitter: "@johndoe",
				github: "johndoe",
				linkedin: "johndoe",
			},
			latestPost: {
				title: "Building Modern Web Applications",
				excerpt: "Learn how to create scalable and maintainable web applications...",
			},
		};

		setTimeout(() => {
			updateUser(mockUser);
			setLoading(false);
			navigate("/profile");
		}, 1000);
	};

	return (
		<div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
			<div className={`max-w-md w-full ${isDark ? "bg-gray-800" : "bg-white"} rounded-xl shadow-lg p-8`}>
				<h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>

				<form onSubmit={handleLogin} className="space-y-6">
					<div>
						<label className="block text-sm font-medium mb-2">Email</label>
						<input type="email" defaultValue="john@example.com" className={`w-full p-3 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`} />
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Password</label>
						<input type="password" defaultValue="password" className={`w-full p-3 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`} />
					</div>

					<div className="flex items-center justify-between">
						<label className="flex items-center">
							<input type="checkbox" className="mr-2" />
							<span className="text-sm">Remember me</span>
						</label>
						<a href="#" className="text-sm text-blue-500 hover:text-blue-600">
							Forgot password?
						</a>
					</div>

					<button
						type="submit"
						disabled={loading}
						className={`w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors
                            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
					>
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm">
						Don't have an account?{" "}
						<a href="#" className="text-blue-500 hover:text-blue-600">
							Sign up
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
