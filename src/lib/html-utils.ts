/**
 * Safely strip all HTML tags from a string by repeatedly removing tags
 * until none remain. This prevents bypasses like "<<script>script>".
 */
export function stripHtmlTags(input: string): string {
	const tagPattern = /<[^>]*>/g;
	let result = input;
	let previous: string;
	do {
		previous = result;
		result = result.replace(tagPattern, "");
	} while (result !== previous);
	return result;
}
