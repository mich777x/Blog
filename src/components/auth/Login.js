import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const Login = ({ isDark, onLogin }) => {
	const navigate = useNavigate();
	const { updateUser } = useUser();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("demo@example.com");
	const [password, setPassword] = useState("password");
	const [error, setError] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			// Mock user data
			const mockUser = {
				id: 1,
				name: "Demo User",
				avatar: "/api/placeholder/100/100?text=DU",
				role: "Writer",
				bio: "Frontend Developer passionate about creating beautiful user experiences",
				stats: {
					articles: 12,
					followers: 1234,
					following: 567,
				},
			};

			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Update both the UserContext and the App's state
			updateUser(mockUser);
			onLogin(mockUser);

			navigate("/");
		} catch (err) {
			setError("Failed to login. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
			<div className={`max-w-md w-full ${isDark ? "bg-gray-800" : "bg-white"} rounded-xl shadow-lg p-8`}>
				<h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>

				{error && <div className="mb-6 p-4 bg-red-100 text-red-600 rounded-lg">{error}</div>}

				<form onSubmit={handleLogin} className="space-y-6">
					<div>
						<label className="block text-sm font-medium mb-2">Email</label>
						<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full p-3 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`} required />
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Password</label>
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full p-3 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`} required />
					</div>

					<div className="flex items-center justify-between">
						<label className="flex items-center">
							<input type="checkbox" className="mr-2" />
							<span className="text-sm">Remember me</span>
						</label>
						<button type="button" className="text-sm text-blue-500 hover:text-blue-600">
							Forgot password?
						</button>
					</div>

					<button type="submit" disabled={loading} className={`w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm">
						Don't have an account? <button className="text-blue-500 hover:text-blue-600">Sign up</button>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
