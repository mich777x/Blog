// utils/imageUtils.js
const generateImageUrl = (title, categories) => {
	// Use picsum for random images
	const imageId = Math.floor(Math.random() * 1000);
	return `https://picsum.photos/seed/${imageId}/800/400`;
};

export default generateImageUrl;
