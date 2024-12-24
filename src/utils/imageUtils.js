// utils/imageUtils.js
const generateImageUrl = (title, categories = []) => {
	// Clean and combine title and categories for the seed
	const cleanedTitle = (title || "").toLowerCase().replace(/\s+/g, "-");
	const cleanedCategories = categories.map((cat) => cat.toLowerCase().replace(/\s+/g, "-"));
	const seed = `${cleanedTitle}-${cleanedCategories.join("-")}`;

	// Generate unique ID to prevent caching
	const uniqueId = Date.now();

	// Return URL using picsum photos
	return `https://picsum.photos/seed/${seed}${uniqueId}/800/400`;
};

export default generateImageUrl;
