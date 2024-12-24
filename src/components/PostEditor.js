import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const PostEditor = ({ posts, onSave, isDark, currentUser }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState({});

	const initialPost = {
		title: "",
		excerpt: "",
		content: "",
		categories: [],
		image: "/api/placeholder/800/400",
	};

	const [post, setPost] = useState(initialPost);

	// Load existing post data if editing
	useEffect(() => {
		if (id && posts) {
			const existingPost = posts.find((p) => p.id === parseInt(id));
			if (existingPost) {
				setPost({
					...existingPost,
					content: existingPost.content.replace(/<[^>]*>/g, ""), // Remove any existing HTML tags
				});
			} else {
				navigate("/");
			}
		}
	}, [id, posts, navigate]);

	const validateForm = () => {
		const newErrors = {};
		if (!post.title.trim()) newErrors.title = "Title is required";
		if (!post.excerpt.trim()) newErrors.excerpt = "Excerpt is required";
		if (!post.content.trim()) newErrors.content = "Content is required";
		if (post.categories.length === 0) newErrors.categories = "Select at least one category";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		setIsSubmitting(true);
		try {
			const postData = {
				...post,
				id: parseInt(id), // Ensure ID is always an integer
				content: post.content.trim(),
			};

			const success = await onSave(postData);

			if (!success) {
				throw new Error("Failed to update post");
			}

			// Navigation is handled by the parent component
		} catch (error) {
			console.error("Error saving post:", error);
			setErrors({ submit: "Failed to save post. Please try again." });
			setIsSubmitting(false);
		}
	};

	const categories = ["Technology", "Development", "Design", "AI & ML", "Web Development", "Mobile Development", "DevOps", "Cloud Computing", "Cybersecurity", "Data Science"];

	const handleFormat = (format) => {
		const textarea = document.getElementById("content-editor");
		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const text = textarea.value;
		const selectedText = text.substring(start, end);
		let newText = "";

		switch (format) {
			case "heading":
				newText = `# ${selectedText}`;
				break;
			case "subheading":
				newText = `## ${selectedText}`;
				break;
			case "list":
				newText = selectedText
					.split("\n")
					.map((line) => `- ${line}`)
					.join("\n");
				break;
			default:
				newText = selectedText;
		}

		const newContent = text.substring(0, start) + newText + text.substring(end);
		setPost({ ...post, content: newContent });

		// Set cursor position after inserted text
		setTimeout(() => {
			textarea.focus();
			const newCursorPos = start + newText.length;
			textarea.setSelectionRange(newCursorPos, newCursorPos);
		}, 0);
	};

	return (
		<div className={`max-w-4xl mx-auto rounded-xl shadow-lg p-8 ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
			<h2 className="text-2xl font-bold mb-6">{id ? "Edit Post" : "Create New Post"}</h2>

			{errors.submit && <div className="mb-6 p-4 bg-red-100 text-red-600 rounded-lg">{errors.submit}</div>}

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Title Input */}
				<div>
					<label className="block mb-2 font-medium">Title</label>
					<input type="text" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} className={`w-full p-3 rounded-lg border ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} focus:ring-2 focus:ring-blue-500 outline-none ${errors.title ? "border-red-500" : ""}`} placeholder="Enter post title" />
					{errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
				</div>

				{/* Image Preview */}
				<div>
					<label className="block mb-2 font-medium">Post Image Preview</label>
					<div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
						<img src={post.image} alt="Post preview" className="w-full h-full object-cover" />
					</div>
				</div>

				{/* Excerpt Input */}
				<div>
					<label className="block mb-2 font-medium">Excerpt</label>
					<textarea value={post.excerpt} onChange={(e) => setPost({ ...post, excerpt: e.target.value })} className={`w-full p-3 rounded-lg border ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} focus:ring-2 focus:ring-blue-500 outline-none ${errors.excerpt ? "border-red-500" : ""}`} rows="3" placeholder="Write a brief excerpt for your post" />
					{errors.excerpt && <p className="mt-1 text-sm text-red-500">{errors.excerpt}</p>}
				</div>

				{/* Content Editor */}
				<div>
					<label className="block mb-2 font-medium">Content</label>
					<div className="border rounded-lg overflow-hidden">
						<div className="border-b p-2 bg-gray-50 flex flex-wrap gap-2">
							<button type="button" onClick={() => handleFormat("heading")} className="px-3 py-1 rounded hover:bg-gray-200">
								Heading
							</button>
							<button type="button" onClick={() => handleFormat("subheading")} className="px-3 py-1 rounded hover:bg-gray-200">
								Subheading
							</button>
							<button type="button" onClick={() => handleFormat("list")} className="px-3 py-1 rounded hover:bg-gray-200">
								List
							</button>
						</div>
						<textarea id="content-editor" value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} className={`w-full p-4 min-h-[400px] ${isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"} ${errors.content ? "border-red-500" : ""}`} placeholder="Write your post content here..." />
					</div>
					{errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
					<p className={`mt-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Use the toolbar buttons to format your text</p>
				</div>

				{/* Categories Selection */}
				<div>
					<label className="block mb-2 font-medium">Categories</label>
					<select
						multiple
						value={post.categories}
						onChange={(e) => {
							const options = [...e.target.selectedOptions];
							const values = options.map((option) => option.value);
							setPost({ ...post, categories: values });
						}}
						className={`w-full p-3 rounded-lg border ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} focus:ring-2 focus:ring-blue-500 outline-none ${errors.categories ? "border-red-500" : ""}`}
						size="5"
					>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
					{errors.categories && <p className="mt-1 text-sm text-red-500">{errors.categories}</p>}
					<p className={`mt-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Hold Ctrl/Cmd to select multiple categories</p>
				</div>

				{/* Action Buttons */}
				<div className="flex space-x-4">
					<button type="submit" disabled={isSubmitting} className={`px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}>
						{isSubmitting ? "Saving..." : id ? "Update Post" : "Publish Post"}
					</button>
					<Link to="/" className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
						Cancel
					</Link>
				</div>
			</form>
		</div>
	);
};

export default PostEditor;
