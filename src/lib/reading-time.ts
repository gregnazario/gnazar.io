/**
 * Calculate reading time for content
 * Based on average reading speed of 200-250 words per minute
 */

const WORDS_PER_MINUTE = 225;

export function calculateReadingTime(content: string): number {
	// Remove HTML tags and extra whitespace
	const text = content
		.replace(/<[^>]*>/g, "")
		.replace(/\s+/g, " ")
		.trim();

	const wordCount = text.split(/\s+/).filter(Boolean).length;
	const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

	return Math.max(1, minutes); // Minimum 1 minute
}

export function formatReadingTime(minutes: number): string {
	return `${minutes} min read`;
}
