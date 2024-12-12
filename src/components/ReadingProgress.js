import React, { useState, useEffect } from "react";

const ReadingProgress = ({ target }) => {
	const [readingProgress, setReadingProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			if (!target.current) return;

			const element = target.current;
			const totalHeight = element.clientHeight - element.offsetTop;
			const windowHeight = window.innerHeight;
			const scrollTop = window.scrollY;

			if (totalHeight) {
				const percentage = (scrollTop / (totalHeight - windowHeight)) * 100;
				setReadingProgress(Math.min(100, Math.max(0, percentage)));
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [target]);

	return (
		<div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
			<div className="h-full bg-blue-500 transition-all duration-100" style={{ width: `${readingProgress}%` }} />
		</div>
	);
};

export default ReadingProgress;
