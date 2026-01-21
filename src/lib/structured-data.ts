import type { BlogPost } from "@/lib/content-i18n";
import { siteConfig } from "@/lib/site";

/**
 * Generate Article structured data for blog posts
 * https://schema.org/Article
 */
export function generateArticleSchema(post: BlogPost, url: string) {
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: post.title,
		description: post.summary,
		datePublished: post.date,
		dateModified: post.lastUpdated || post.date,
		author: {
			"@type": "Person",
			name: siteConfig.title,
			url: siteConfig.url,
		},
		publisher: {
			"@type": "Person",
			name: siteConfig.title,
			url: siteConfig.url,
			logo: {
				"@type": "ImageObject",
				url: `${siteConfig.url}/favicon.svg`,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": url,
		},
		url,
		image: `${siteConfig.url}/og/${post.slug}.png`,
		keywords: post.tags.join(", "),
		wordCount: estimateWordCount(post.content),
		articleSection: post.tags[0] || "Blog",
		inLanguage: post.locale,
	};
}

/**
 * Generate BlogPosting structured data (more specific than Article)
 * https://schema.org/BlogPosting
 */
export function generateBlogPostingSchema(post: BlogPost, url: string) {
	return {
		...generateArticleSchema(post, url),
		"@type": "BlogPosting",
	};
}

/**
 * Estimate word count from content (strip HTML)
 */
function estimateWordCount(content: string): number {
	const text = content
		.replace(/<[^>]*>/g, "")
		.replace(/\s+/g, " ")
		.trim();
	return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Generate TechArticle structured data for technical posts
 * https://schema.org/TechArticle
 */
export function generateTechArticleSchema(post: BlogPost, url: string) {
	return {
		...generateArticleSchema(post, url),
		"@type": "TechArticle",
		proficiencyLevel: "Beginner", // Could be derived from tags
	};
}
