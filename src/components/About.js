import React from "react";

const About = ({ isDark }) => {
	return (
		<div className="py-8 max-w-4xl mx-auto">
			<h1 className={`text-4xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"}`}>About BlogElite</h1>

			<div className={`prose max-w-none ${isDark ? "text-gray-300" : "text-gray-600"}`}>
				<p className="text-lg mb-6">Welcome to BlogElite, a platform dedicated to sharing knowledge and insights about technology, development, and digital innovation.</p>

				<h2 className={`text-2xl font-bold mt-8 mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Our Mission</h2>
				<p className="mb-6">Our mission is to provide high-quality, informative content that helps developers, designers, and tech enthusiasts stay up-to-date with the latest trends and best practices in the industry.</p>

				<h2 className={`text-2xl font-bold mt-8 mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Get Involved</h2>
				<p className="mb-6">We welcome contributions from the community. Whether you're a seasoned developer or just starting out, your perspective matters. Join our community to share your knowledge and experiences.</p>

				<h2 className={`text-2xl font-bold mt-8 mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Contact Us</h2>
				<p>Have questions or suggestions? We'd love to hear from you. Reach out to us at contact@blogelite.com.</p>
			</div>
		</div>
	);
};

export default About;
