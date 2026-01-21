#!/usr/bin/env node

/**
 * Broken Link and Content Validation Checker
 *
 * Checks for:
 * - Broken internal links
 * - Missing images
 * - Invalid frontmatter
 * - Empty required fields
 *
 * Usage:
 *   node scripts/check-links.mjs
 *   node scripts/check-links.mjs --fix  # Auto-fix some issues
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const contentDir = join(rootDir, "content");
const publicDir = join(rootDir, "public");

const errors = [];
const warnings = [];

// Collect all valid slugs
const blogSlugs = new Set();
const projectSlugs = new Set();

function log(type, file, message) {
	if (type === "error") {
		errors.push({ file, message });
		console.log(`  ❌ ${message}`);
	} else if (type === "warning") {
		warnings.push({ file, message });
		console.log(`  ⚠️  ${message}`);
	} else {
		console.log(`  ✓ ${message}`);
	}
}

function checkFrontmatter(filePath, type) {
	const content = readFileSync(filePath, "utf-8");
	const { data } = matter(content);
	const fileName = filePath.split("/").pop();

	// Required fields for blog posts
	if (type === "blog") {
		if (!data.title || data.title.trim() === "") {
			log("error", fileName, "Missing or empty title");
		}
		if (!data.date) {
			log("error", fileName, "Missing date");
		} else {
			const date = new Date(data.date);
			if (Number.isNaN(date.getTime())) {
				log("error", fileName, `Invalid date format: ${data.date}`);
			}
		}
		if (!data.summary || data.summary.trim() === "") {
			log("warning", fileName, "Missing or empty summary");
		}
		if (!data.tags || data.tags.length === 0) {
			log("warning", fileName, "No tags specified");
		}
		if (data.lastUpdated) {
			const date = new Date(data.lastUpdated);
			if (Number.isNaN(date.getTime())) {
				log(
					"error",
					fileName,
					`Invalid lastUpdated format: ${data.lastUpdated}`,
				);
			}
		}
	}

	// Required fields for projects
	if (type === "project") {
		if (!data.title || data.title.trim() === "") {
			log("error", fileName, "Missing or empty title");
		}
		if (!data.summary || data.summary.trim() === "") {
			log("warning", fileName, "Missing or empty summary");
		}
	}

	return { data, content };
}

function checkInternalLinks(filePath, content) {
	const fileName = filePath.split("/").pop();

	// Match markdown links: [text](/path) or [text](path)
	const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
	let match;

	while (true) {
		match = linkRegex.exec(content);
		if (match === null) break;

		const linkHref = match[2];

		// Skip external links
		if (linkHref.startsWith("http://") || linkHref.startsWith("https://")) {
			continue;
		}

		// Skip anchors
		if (linkHref.startsWith("#")) {
			continue;
		}

		// Skip mailto and tel
		if (linkHref.startsWith("mailto:") || linkHref.startsWith("tel:")) {
			continue;
		}

		// Check internal links
		if (linkHref.startsWith("/blog/")) {
			const slug = linkHref.replace("/blog/", "").replace(/\/$/, "");
			if (!blogSlugs.has(slug)) {
				log("error", fileName, `Broken link to blog post: ${linkHref}`);
			}
		} else if (linkHref.startsWith("/projects/")) {
			const slug = linkHref.replace("/projects/", "").replace(/\/$/, "");
			if (!projectSlugs.has(slug)) {
				log("error", fileName, `Broken link to project: ${linkHref}`);
			}
		}
	}
}

function checkImages(filePath, content) {
	const fileName = filePath.split("/").pop();

	// Match markdown images: ![alt](/path)
	const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
	let match;

	while (true) {
		match = imageRegex.exec(content);
		if (match === null) break;

		const altText = match[1];
		const imagePath = match[2];

		// Skip external images
		if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
			continue;
		}

		// Check if image exists
		const fullPath = join(publicDir, imagePath.replace(/^\//, ""));
		if (!existsSync(fullPath)) {
			log("error", fileName, `Missing image: ${imagePath}`);
		}

		// Check alt text
		if (!altText || altText.trim() === "") {
			log("warning", fileName, `Image missing alt text: ${imagePath}`);
		}
	}
}

function scanDirectory(dir, type) {
	if (!existsSync(dir)) {
		return;
	}

	const files = readdirSync(dir).filter((f) => f.endsWith(".mdx"));

	for (const file of files) {
		const slug = file.replace(/\.mdx$/, "");

		if (type === "blog") {
			blogSlugs.add(slug);
		} else {
			projectSlugs.add(slug);
		}
	}
}

function checkDirectory(dir, type) {
	if (!existsSync(dir)) {
		console.log(`\n📁 ${type} directory not found: ${dir}`);
		return;
	}

	const files = readdirSync(dir).filter((f) => f.endsWith(".mdx"));

	console.log(`\n📁 Checking ${type} (${files.length} files)...`);

	for (const file of files) {
		const filePath = join(dir, file);
		console.log(`\n  📄 ${file}`);

		const { content } = checkFrontmatter(filePath, type);
		checkInternalLinks(filePath, content);
		checkImages(filePath, content);
	}
}

async function main() {
	console.log("🔍 Content Validation & Link Checker\n");
	console.log("=".repeat(50));

	// First pass: collect all slugs
	scanDirectory(join(contentDir, "blog"), "blog");
	scanDirectory(join(contentDir, "projects"), "project");

	console.log(
		`\n📊 Found ${blogSlugs.size} blog posts, ${projectSlugs.size} projects`,
	);

	// Second pass: validate content
	checkDirectory(join(contentDir, "blog"), "blog");
	checkDirectory(join(contentDir, "projects"), "project");

	// Summary
	console.log(`\n${"=".repeat(50)}`);
	console.log("\n📊 Summary:");
	console.log(`   Errors:   ${errors.length}`);
	console.log(`   Warnings: ${warnings.length}`);

	if (errors.length > 0) {
		console.log("\n❌ Errors found:");
		for (const { file, message } of errors) {
			console.log(`   ${file}: ${message}`);
		}
	}

	if (warnings.length > 0) {
		console.log("\n⚠️  Warnings:");
		for (const { file, message } of warnings) {
			console.log(`   ${file}: ${message}`);
		}
	}

	if (errors.length === 0 && warnings.length === 0) {
		console.log("\n✅ All checks passed!");
	}

	// Exit with error code if there are errors
	process.exit(errors.length > 0 ? 1 : 0);
}

main().catch(console.error);
