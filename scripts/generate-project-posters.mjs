#!/usr/bin/env node

/**
 * Generate branded poster images for projects that don't have a live
 * site to screenshot. Reads frontmatter from content/projects/*.mdx and
 * renders a terminal-styled card per project.
 *
 * Usage:
 *   node scripts/generate-project-posters.mjs
 *   node scripts/generate-project-posters.mjs --force
 */

import sharp from "sharp";
import { readFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const projectsDir = join(rootDir, "content", "projects");
const outputDir = join(rootDir, "public", "images", "projects");

const force = process.argv.includes("--force");

// Projects that have a real live-site screenshot instead of a poster
// (captured from their deployed demos; see scripts/README notes).
const HAS_SCREENSHOT = new Set([
	"aptos-example-games",
	"aptos-multisig-ui",
	"sed-fyi",
]);

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

function wrapText(text, maxChars) {
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
	return lines;
}

// Small deterministic "fingerprint" per slug so each poster gets a
// distinct-but-consistent accent motif without hand-tuning.
function motif(slug) {
	let hash = 0;
	for (const ch of slug) hash = (hash * 31 + ch.codePointAt(0)) % 1000;
	const barCount = 5 + (hash % 4);
	const bars = Array.from({ length: barCount }, (_, i) => {
		const h = 20 + ((hash >> i) % 60);
		return `<rect x="${80 + i * 26}" y="${470 - h}" width="14" height="${h}" rx="2" fill="${accentColor}" fill-opacity="${0.35 + (i % 3) * 0.2}"/>`;
	}).join("\n\t\t\t");
	return bars;
}

function posterSvg(title, summary, tech, year, slug) {
	const titleLines = wrapText(title, 22);
	const allSummaryLines = wrapText(summary, 46);
	const summaryLines = allSummaryLines.slice(0, 2);
	if (allSummaryLines.length > 2 && summaryLines.length === 2) {
		summaryLines[1] = `${summaryLines[1].slice(0, 44)}…`;
	}
	const techLine = tech.slice(0, 5).join(" · ");

	const titleSvg = titleLines
		.map(
			(line, i) =>
				`<text x="80" y="${150 + i * 72}" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="700" fill="${textColor}">${escapeXml(line)}</text>`,
		)
		.join("\n");
	const summarySvg = summaryLines
		.map(
			(line, i) =>
				`<text x="80" y="${150 + titleLines.length * 72 + 34 + i * 32}" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="${mutedColor}">${escapeXml(line)}</text>`,
		)
		.join("\n");

	return `
		<svg width="1200" height="750" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style="stop-color:${darkBg}"/>
					<stop offset="100%" style="stop-color:#111c15"/>
				</linearGradient>
				<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
					<path d="M 40 0 L 0 0 0 40" fill="none" stroke="${accentColor}" stroke-opacity="0.1"/>
				</pattern>
			</defs>

			<rect width="1200" height="750" fill="url(#bg)"/>
			<rect width="1200" height="750" fill="url(#grid)"/>

			<text x="80" y="80" font-family="monospace" font-size="15" letter-spacing="0.25em" fill="${accentColor}">PROJECT</text>
			<text x="1120" y="80" font-family="monospace" font-size="15" fill="${mutedColor}" text-anchor="end">${escapeXml(year ?? "")}</text>

			${titleSvg}
			${summarySvg}

			<text x="80" y="520" font-family="monospace" font-size="20" fill="${accentColor}">${escapeXml(techLine)}</text>

			${motif(slug)}

			<text x="80" y="690" font-family="monospace" font-size="16" fill="${mutedColor}">gnazar.io</text>
			<rect x="1150" y="0" width="50" height="750" fill="${accentColor}" fill-opacity="0.1"/>
		</svg>
	`;
}

async function main() {
	console.log("🖼️  Generating project posters...\n");

	if (!existsSync(outputDir)) {
		mkdirSync(outputDir, { recursive: true });
	}

	const files = readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));

	for (const file of files) {
		const { data } = matter(readFileSync(join(projectsDir, file), "utf-8"));
		const slug = file.replace(/\.mdx$/, "");
		if (HAS_SCREENSHOT.has(slug)) {
			console.log(`  ⏭️  Skipping ${slug} (has live screenshot)`);
			continue;
		}
		const outputPath = join(outputDir, `${slug}.png`);
		if (!force && existsSync(outputPath)) {
			console.log(`  ⏭️  Skipping ${slug} (already exists)`);
			continue;
		}

		const svg = posterSvg(
			data.title || slug,
			data.summary || "",
			Array.isArray(data.tech) ? data.tech : [],
			data.year,
			slug,
		);
		await sharp(Buffer.from(svg)).png().toFile(outputPath);
		console.log(`  ✓ Generated ${slug}.png`);
	}

	console.log("\n✅ Poster generation complete!");
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
