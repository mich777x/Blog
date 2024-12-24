import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Upload, X, Image as ImageIcon } from "lucide-react";

const PostEditor = ({ posts, onSave, isDark, currentUser }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState({});
	const fileInputRef = useRef(null);
	const [imagePreview, setImagePreview] = useState(null);

	const initialPost = {
		title: "",
		excerpt: "",
		content: "",
		categories: [],
		image: "/api/placeholder/800/400",
	};

	const [post, setPost] = useState(initialPost);

	const stripHtmlTags = (html) => {
		const temporalDivElement = document.createElement("div");
		temporalDivElement.innerHTML = html;
		return temporalDivElement.textContent || temporalDivElement.innerText || "";
	};

	useEffect(() => {
		if (id && posts) {
			const existingPost = posts.find((p) => p.id === parseInt(id));
			if (existingPost) {
				const plainTextContent = stripHtmlTags(existingPost.content || "");
				setPost({
					...existingPost,
					content: plainTextContent,
					categories: existingPost.categories || [],
				});
				setImagePreview(existingPost.image);
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
		if (!imagePreview) newErrors.image = "Featured image is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const formatContent = (text) => {
		return text
			.split("\n\n")
			.map((paragraph) => `<p>${paragraph}</p>`)
			.join("");
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				// 5MB limit
				setErrors({ ...errors, image: "Image size should be less than 5MB" });
				return;
			}

			if (!file.type.startsWith("image/")) {
				setErrors({ ...errors, image: "Please upload an image file" });
				return;
			}

			const reader = new FileReader();
			reader.onload = (e) => {
				setImagePreview(e.target.result);
				setPost((prev) => ({ ...prev, image: e.target.result }));
			};
			reader.readAsDataURL(file);
		}
	};

	const removeImage = () => {
		setImagePreview(null);
		setPost((prev) => ({ ...prev, image: null }));
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		setIsSubmitting(true);
		try {
			const formattedContent = formatContent(post.content);

			const updatedPost = {
				...post,
				content: formattedContent,
				id: id ? parseInt(id) : Date.now(),
				author: post.author || currentUser,
				date: post.date || new Date().toISOString(),
				lastModified: new Date().toISOString(),
				likes: post.likes || 0,
				comments: post.comments || 0,
				views: post.views || 0,
				image: imagePreview || post.image,
			};

			await onSave(updatedPost);
			navigate("/");
		} catch (error) {
			console.error("Error saving post:", error);
			setErrors({ submit: "Failed to save post. Please try again." });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={`max-w-4xl mx-auto rounded-xl shadow-lg p-8 ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
			<h2 className="text-2xl font-bold mb-6">{id ? "Edit Post" : "Create New Post"}</h2>

			{errors.submit && <div className="mb-6 p-4 bg-red-100 text-red-600 rounded-lg">{errors.submit}</div>}

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Image Upload Section */}
				{/* Image Upload Section */}
				<div>
					<label className="block mb-2 font-medium">Featured Image</label>
					<div className="space-y-4">
						{/* Image Preview Area */}
						<div className={`border-2 border-dashed rounded-lg ${isDark ? "border-gray-600" : "border-gray-300"} ${errors.image ? "border-red-500" : ""}`}>
							{imagePreview ? (
								<div className="relative w-full h-64">
									<img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
									<button type="button" onClick={removeImage} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
										<X size={20} />
									</button>
								</div>
							) : (
								<div className={`flex flex-col items-center justify-center h-64 ${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
									<ImageIcon size={48} className={isDark ? "text-gray-400" : "text-gray-500"} />
									<p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>No image selected</p>
								</div>
							)}
						</div>

						{/* Upload Button */}
						<div className="flex items-center space-x-4">
							<button type="button" onClick={() => fileInputRef.current?.click()} className={`px-4 py-2 ${isDark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white rounded-lg transition-colors flex items-center space-x-2`}>
								<Upload size={20} />
								<span>{imagePreview ? "Change Image" : "Upload Image"}</span>
							</button>
							<p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>PNG, JPG, GIF up to 5MB</p>
						</div>

						<input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
					</div>
					{errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
				</div>
				{/* Rest of the form fields... */}
				<div>
					<label className="block mb-2 font-medium">Title</label>
					<input type="text" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} className={`w-full p-3 rounded-lg ${isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"} border ${errors.title ? "border-red-500" : "border-gray-300"}`} placeholder="Enter post title" />
					{errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
				</div>

				<div>
					<label className="block mb-2 font-medium">Excerpt</label>
					<textarea value={post.excerpt} onChange={(e) => setPost({ ...post, excerpt: e.target.value })} className={`w-full p-3 rounded-lg ${isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"} border ${errors.excerpt ? "border-red-500" : "border-gray-300"}`} rows="3" placeholder="Write a brief excerpt" />
					{errors.excerpt && <p className="mt-1 text-sm text-red-500">{errors.excerpt}</p>}
				</div>

				<div>
					<label className="block mb-2 font-medium">Content</label>
					<div className="mb-2">
						<small className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Write your content in plain text. Use double line breaks for new paragraphs.</small>
					</div>
					<textarea value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} className={`w-full p-3 rounded-lg ${isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"} border ${errors.content ? "border-red-500" : "border-gray-300"}`} rows="15" placeholder="Write your post content" />
					{errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
				</div>

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
						className={`w-full p-3 rounded-lg ${isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"} border ${errors.categories ? "border-red-500" : "border-gray-300"}`}
					>
						{["Technology", "Development", "Design", "AI & ML", "Web Development", "Mobile Development", "DevOps", "Cloud Computing", "Cybersecurity", "Data Science"].map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
					{errors.categories && <p className="mt-1 text-sm text-red-500">{errors.categories}</p>}
					<p className="mt-2 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple categories</p>
				</div>

				<div className="flex space-x-4">
					<button type="submit" disabled={isSubmitting} className="w-24 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50">
						{isSubmitting ? "Saving..." : id ? "Update" : "Publish"}
					</button>

					<Link to="/" className="w-24 h-10 flex items-center justify-center bg-gray-500 text-white rounded-lg hover:bg-gray-600">
						Cancel
					</Link>
				</div>
			</form>
		</div>
	);
};

export default PostEditor;
