// utils/postGenerator.js

const topics = ["All", "Technology", "Development", "Design", "AI & ML", "Mobile", "Web Dev", "Cloud", "Security", "Data Science", "DevOps"];

const authors = [
	{
		id: 1,
		name: "Demo User",
		avatar: "https://picsum.photos/seed/author1/100/100",
		role: "Senior Developer",
	},
	{
		id: 2,
		name: "Jane Smith",
		avatar: "https://picsum.photos/seed/author2/100/100",
		role: "UX Designer",
	},
	{
		id: 3,
		name: "Mike Johnson",
		avatar: "https://picsum.photos/seed/author3/100/100",
		role: "Tech Lead",
	},
	{
		id: 4,
		name: "Sarah Wilson",
		avatar: "https://picsum.photos/seed/author4/100/100",
		role: "Full Stack Developer",
	},
	{
		id: 5,
		name: "David Brown",
		avatar: "https://picsum.photos/seed/author5/100/100",
		role: "DevOps Engineer",
	},
];

const generateTitle = (topic) => {
	const titleTemplates = [`Complete Guide to ${topic}`, `${topic} Best Practices in ${new Date().getFullYear()}`, `Understanding ${topic}: A Comprehensive Guide`, `Getting Started with ${topic}`, `Advanced ${topic} Techniques`, `Essential ${topic} Concepts`, `Mastering ${topic}`, `${topic} for Beginners`, `Professional ${topic} Development`, `Modern ${topic} Solutions`];
	return titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
};

const generateExcerpt = (topic) => {
	const excerpts = [`Discover the essential concepts and best practices in ${topic}. Learn how to improve your development workflow.`, `A comprehensive guide to understanding ${topic} and its practical applications in modern software development.`, `Deep dive into ${topic}: Tips, tricks, and advanced techniques for developers of all skill levels.`, `Everything you need to know about ${topic}, from basic concepts to advanced implementations.`, `Learn how to leverage ${topic} to build scalable and maintainable applications.`, `Master the fundamentals of ${topic} and take your development skills to the next level.`, `Explore the latest trends and innovations in ${topic} development.`, `A step-by-step guide to implementing ${topic} in your projects.`];
	return excerpts[Math.floor(Math.random() * excerpts.length)];
};

const generateContent = (topic) => {
	const sections = [
		{
			title: "Introduction",
			content: `Welcome to our comprehensive guide on ${topic}. In this article, we'll explore the fundamental concepts, best practices, and advanced techniques that make ${topic} such a powerful tool in modern development.`,
		},
		{
			title: "Key Concepts",
			content: `Understanding the core principles of ${topic} is essential for any developer looking to master this technology. Let's break down the most important concepts you need to know.`,
		},
		{
			title: "Getting Started",
			content: `Before diving deep into ${topic}, let's set up our development environment and understand the basic requirements. This will ensure a smooth learning experience as we progress through more advanced topics.`,
		},
		{
			title: "Best Practices",
			content: `Following established best practices in ${topic} will help you write cleaner, more maintainable code. Here are some guidelines that professional developers follow when working with ${topic}.`,
		},
		{
			title: "Advanced Techniques",
			content: `Once you've mastered the basics, these advanced ${topic} techniques will help you tackle more complex challenges and optimize your applications.`,
		},
		{
			title: "Real-World Examples",
			content: `Let's look at some practical examples of ${topic} in action. These real-world scenarios will help you understand how to apply the concepts we've discussed.`,
		},
		{
			title: "Common Challenges",
			content: `When working with ${topic}, you might encounter several common challenges. Here's how to address them effectively and avoid potential pitfalls.`,
		},
		{
			title: "Future Trends",
			content: `The ${topic} ecosystem is constantly evolving. Stay ahead of the curve by understanding upcoming trends and future developments in this field.`,
		},
	];

	// Randomly select 4-6 sections for the article
	const selectedSections = sections.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 4);

	return selectedSections.map((section) => `<h2>${section.title}</h2>\n<p>${section.content}</p>`).join("\n\n");
};

const getRandomCategories = () => {
	const numCategories = Math.floor(Math.random() * 2) + 1; // 1-3 categories
	const shuffledTopics = [...topics].sort(() => 0.5 - Math.random());
	return shuffledTopics.slice(0, numCategories);
};

const generateRandomDate = (startDate, endDate) => {
	const start = startDate.getTime();
	const end = endDate.getTime();
	const randomDate = new Date(start + Math.random() * (end - start));
	return randomDate.toISOString();
};

const generateImageUrl = (title, categories = []) => {
	const seed = `${title}-${categories.join("-")}`.toLowerCase().replace(/\s+/g, "-");
	return `https://picsum.photos/seed/${seed}/800/400`;
};

const generateRandomPosts = (count = 10) => {
	const posts = [];
	const endDate = new Date();
	const startDate = new Date();
	startDate.setMonth(startDate.getMonth() - 3); // Posts from last 3 months

	for (let i = 0; i < count; i++) {
		const topic = topics[Math.floor(Math.random() * topics.length)];
		const author = authors[Math.floor(Math.random() * authors.length)];
		const title = generateTitle(topic);
		const categories = getRandomCategories();

		posts.push({
			id: i + 1,
			title: title,
			excerpt: generateExcerpt(topic),
			content: generateContent(topic),
			image: generateImageUrl(title, categories),
			categories: categories,
			author: author,
			date: generateRandomDate(startDate, endDate),
			likes: Math.floor(Math.random() * 100),
			comments: Math.floor(Math.random() * 20),
			shares: Math.floor(Math.random() * 50),
			readTime: `${Math.floor(Math.random() * 10) + 5} min`,
			views: Math.floor(Math.random() * 1000),
		});
	}

	// Sort by date, most recent first
	return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export { generateRandomPosts, generateContent, generateExcerpt, generateTitle, generateImageUrl, topics };
