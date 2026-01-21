#!/usr/bin/env node

/**
 * Generate OG images for individual blog posts
 *
 * Usage:
 *   node scripts/generate-post-og-images.mjs
 *   node scripts/generate-post-og-images.mjs --force  # Regenerate all
 */

import sharp from "sharp";
import { readFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const contentDir = join(rootDir, "content", "blog");
const outputDir = join(rootDir, "public", "og");

const force = process.argv.includes("--force");

// Color scheme
const darkBg = "#0f1712";
const accentColor = "#6bcf73";
const textColor = "#e6f4e7";
const mutedColor = "#9bb3a1";

function escapeXml(text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function wrapText(text, maxChars = 40) {
	const words = text.split(" ");
	const lines = [];
	let currentLine = "";

	for (const word of words) {
		const line = `${currentLine} ${word}`.trim();
		if (line.length <= maxChars) {
			currentLine = line;
		} else {
			if (currentLine) lines.push(currentLine);
			currentLine = word;
		}
	}
	if (currentLine) lines.push(currentLine);

	return lines.slice(0, 3); // Max 3 lines
}

async function generateOgImage(slug, title, date, tags) {
	const outputPath = join(outputDir, `${slug}.png`);

	// Skip if already exists (unless force)
	if (!force && existsSync(outputPath)) {
		console.log(`  ⏭️  Skipping ${slug} (already exists)`);
		return;
	}

	const titleLines = wrapText(title, 35);
	const formattedDate = new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const titleY = 280;
	const lineHeight = 65;

	const titleSvg = titleLines
		.map(
			(line, i) =>
				`<text x="80" y="${titleY + i * lineHeight}" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="700" fill="${textColor}">${escapeXml(line)}</text>`,
		)
		.join("\n");

	const tagsX = 80;
	const tagsY = titleY + titleLines.length * lineHeight + 40;
	const tagsSvg = tags
		.slice(0, 3)
		.map(
			(tag, i) =>
				`<rect x="${tagsX + i * 120}" y="${tagsY}" width="100" height="28" rx="4" fill="${accentColor}" fill-opacity="0.2"/>
				<text x="${tagsX + i * 120 + 50}" y="${tagsY + 19}" font-family="monospace" font-size="12" fill="${accentColor}" text-anchor="middle">${escapeXml(tag.toUpperCase())}</text>`,
		)
		.join("\n");

	const svg = `
		<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style="stop-color:${darkBg}"/>
					<stop offset="100%" style="stop-color:#111c15"/>
				</linearGradient>
				<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
					<path d="M 40 0 L 0 0 0 40" fill="none" stroke="${accentColor}" stroke-opacity="0.1"/>
				</pattern>
			</defs>

			<!-- Background -->
			<rect width="1200" height="630" fill="url(#bg)"/>
			<rect width="1200" height="630" fill="url(#grid)"/>

			<!-- Accent line -->
			<rect x="80" y="180" width="120" height="4" fill="${accentColor}"/>

			<!-- Blog label -->
			<text x="80" y="220" font-family="monospace" font-size="14" letter-spacing="0.2em" fill="${accentColor}">BLOG POST</text>

			<!-- Title -->
			${titleSvg}

			<!-- Tags -->
			${tagsSvg}

			<!-- Date -->
			<text x="80" y="560" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="${mutedColor}">${escapeXml(formattedDate)}</text>

			<!-- Site -->
			<text x="1120" y="560" font-family="monospace" font-size="16" fill="${mutedColor}" text-anchor="end">gnazar.io</text>

			<!-- Corner accent -->
			<rect x="1150" y="0" width="50" height="630" fill="${accentColor}" fill-opacity="0.1"/>
		</svg>
	`;

	await sharp(Buffer.from(svg)).png().toFile(outputPath);
	console.log(`  ✓ Generated ${slug}.png`);
}

async function main() {
	console.log("🖼️  Generating blog post OG images...\n");

	// Ensure output directory exists
	if (!existsSync(outputDir)) {
		mkdirSync(outputDir, { recursive: true });
	}

	// Get all blog posts
	const files = readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

	for (const file of files) {
		const slug = file.replace(/\.mdx$/, "");
		const content = readFileSync(join(contentDir, file), "utf-8");
		const { data } = matter(content);

		const title = data.title || slug;
		const date = data.date || new Date().toISOString();
		const tags = data.tags || [];

		await generateOgImage(slug, title, date, tags);
	}

	console.log("\n✅ OG image generation complete!");
}

main().catch(console.error);
