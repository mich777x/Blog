import React, { useState } from "react";
import { ChevronRight, User, Shield, Twitter, Facebook, Linkedin } from "lucide-react";

const Newsletter = ({ isDark }) => {
	const [email, setEmail] = useState("");
	const [frequency, setFrequency] = useState("weekly");
	const [interests, setInterests] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setIsSubmitting(false);
		setEmail("");
		setInterests([]);
	};

	return (
		<div className={`rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} p-8 shadow-lg`}>
			<div className="max-w-2xl mx-auto">
				<h3 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Stay Updated</h3>
				<p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>Join our newsletter and get the latest articles, insights, and trends delivered to your inbox.</p>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="flex space-x-2">
						<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className={`flex-1 p-4 rounded-lg ${isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-blue-500`} required />
						<button type="submit" disabled={isSubmitting} className={`px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}>
							{isSubmitting ? (
								<span>Subscribing...</span>
							) : (
								<>
									<span>Subscribe</span>
									<ChevronRight size={20} />
								</>
							)}
						</button>
					</div>

					<div>
						<label className={`block mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Email Frequency</label>
						<div className="flex space-x-4">
							{["daily", "weekly", "monthly"].map((option) => (
								<label key={option} className="flex items-center space-x-2 cursor-pointer">
									<input type="radio" name="frequency" value={option} checked={frequency === option} onChange={(e) => setFrequency(e.target.value)} className="form-radio text-blue-500" />
									<span className={`capitalize ${isDark ? "text-gray-300" : "text-gray-700"}`}>{option}</span>
								</label>
							))}
						</div>
					</div>

					<div>
						<label className={`block mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Interests</label>
						<div className="flex flex-wrap gap-2">
							{["Technology", "Design", "Development", "AI", "Business"].map((interest) => (
								<label key={interest} className={`px-4 py-2 rounded-full cursor-pointer transition-colors ${interests.includes(interest) ? "bg-blue-500 text-white" : isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
									<input
										type="checkbox"
										className="hidden"
										checked={interests.includes(interest)}
										onChange={(e) => {
											if (e.target.checked) {
												setInterests([...interests, interest]);
											} else {
												setInterests(interests.filter((i) => i !== interest));
											}
										}}
									/>
									{interest}
								</label>
							))}
						</div>
					</div>
				</form>

				<div className="mt-6 pt-6 border-t border-gray-200">
					<div className="flex items-center space-x-4">
						<div className={`flex-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
							<div className="flex items-center mb-1">
								<User size={16} className="mr-2" />
								<span>Join 10,000+ subscribers</span>
							</div>
							<div className="flex items-center">
								<Shield size={16} className="mr-2" />
								<span>No spam, unsubscribe anytime</span>
							</div>
						</div>
						<div className="flex space-x-2">
							{["Twitter", "Facebook", "LinkedIn"].map((platform) => (
								<button key={platform} className={`p-2 rounded-full ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}>
									<span className="sr-only">{platform}</span>
									{platform === "Twitter" && <Twitter size={20} />}
									{platform === "Facebook" && <Facebook size={20} />}
									{platform === "LinkedIn" && <Linkedin size={20} />}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Newsletter;
