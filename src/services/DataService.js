// src/services/DataService.js

const STORAGE_KEYS = {
	POSTS: "blog_posts",
	COMMENTS: "blog_comments",
	USER: "blog_current_user",
	LIKES: "blog_likes",
	THEME: "blog_theme",
};

class DataService {
	// Posts
	static savePosts(posts) {
		localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
	}

	static getPosts() {
		const posts = localStorage.getItem(STORAGE_KEYS.POSTS);
		return posts ? JSON.parse(posts) : [];
	}

	// Comments
	static saveComments(postId, comments) {
		const allComments = this.getAllComments();
		allComments[postId] = comments;
		localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(allComments));
	}

	static getComments(postId) {
		const allComments = this.getAllComments();
		return allComments[postId] || [];
	}

	static getAllComments() {
		const comments = localStorage.getItem(STORAGE_KEYS.COMMENTS);
		return comments ? JSON.parse(comments) : {};
	}

	// User
	static saveUser(user) {
		localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
	}

	static getUser() {
		const user = localStorage.getItem(STORAGE_KEYS.USER);
		return user ? JSON.parse(user) : null;
	}

	static clearUser() {
		localStorage.removeItem(STORAGE_KEYS.USER);
	}

	// Likes
	static saveLike(type, id, userId) {
		const likes = this.getLikes();
		const key = `${type}_${id}`;
		if (!likes[key]) {
			likes[key] = [];
		}

		const index = likes[key].indexOf(userId);
		if (index === -1) {
			likes[key].push(userId);
		} else {
			likes[key].splice(index, 1);
		}

		localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likes));
		return likes[key].length;
	}

	static getLikes() {
		const likes = localStorage.getItem(STORAGE_KEYS.LIKES);
		return likes ? JSON.parse(likes) : {};
	}

	static hasLiked(type, id, userId) {
		const likes = this.getLikes();
		const key = `${type}_${id}`;
		return likes[key] ? likes[key].includes(userId) : false;
	}

	// Theme
	static saveTheme(isDark) {
		localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(isDark));
	}

	static getTheme() {
		const theme = localStorage.getItem(STORAGE_KEYS.THEME);
		return theme ? JSON.parse(theme) : false;
	}

	// Clear all data
	static clearAll() {
		Object.values(STORAGE_KEYS).forEach((key) => {
			localStorage.removeItem(key);
		});
	}
}

export default DataService;
