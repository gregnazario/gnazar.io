/**
 * Calculate reading time for content
 * Based on average reading speed of 200-250 words per minute
 */

const WORDS_PER_MINUTE = 225;

/**
 * Safely strip all HTML tags from a string by repeatedly removing tags
 * until none remain. This prevents bypasses like "<<script>script>".
 */
function stripHtmlTags(input: string): string {
	const tagPattern = /<[^>]*>/g;
	let result = input;
	let previous: string;
	do {
		previous = result;
		result = result.replace(tagPattern, "");
	} while (result !== previous);
	return result;
}

export function calculateReadingTime(content: string): number {
	// Remove HTML tags and extra whitespace
	const text = stripHtmlTags(content).replace(/\s+/g, " ").trim();

	const wordCount = text.split(/\s+/).filter(Boolean).length;
	const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

	return Math.max(1, minutes); // Minimum 1 minute
}

export function formatReadingTime(minutes: number): string {
	return `${minutes} min read`;
}
