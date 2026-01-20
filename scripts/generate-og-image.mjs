#!/usr/bin/env node

/**
 * Generate OG image for social sharing
 * Run with: node scripts/generate-og-image.mjs
 *
 * Creates a 1200x630 branded image with:
 * - Dark background matching site theme
 * - Green accent color
 * - Name and title text
 * - Terminal-style aesthetic
 */

import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

// Site config (matching src/lib/site.ts)
const siteConfig = {
	title: "Greg Nazario",
	description:
		"Founding Senior Software Engineer at Aptos. 11+ years scaling infrastructure, developer tooling, and teams.",
};

async function generateOgImage() {
	try {
		const sharp = (await import("sharp")).default;

		const width = 1200;
		const height = 630;

		// Colors matching site theme
		const bgColor = "#0a0a0a";
		const accentColor = "#45d38a";
		const textColor = "#ffffff";
		const subtextColor = "#a0a0a0";

		// Create SVG with text overlay
		const svgText = `
			<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" style="stop-color:#0f0f0f;stop-opacity:1" />
						<stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
					</linearGradient>
					<linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" style="stop-color:${accentColor};stop-opacity:0.3" />
						<stop offset="100%" style="stop-color:${accentColor};stop-opacity:0" />
					</linearGradient>
				</defs>
				
				<!-- Background -->
				<rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
				
				<!-- Accent gradient overlay -->
				<rect x="0" y="0" width="${width}" height="${height}" fill="url(#accentGradient)" opacity="0.5"/>
				
				<!-- Grid pattern -->
				<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
					<path d="M 40 0 L 0 0 0 40" fill="none" stroke="${accentColor}" stroke-width="0.5" opacity="0.1"/>
				</pattern>
				<rect width="${width}" height="${height}" fill="url(#grid)"/>
				
				<!-- Terminal prompt decoration -->
				<text x="80" y="180" font-family="monospace" font-size="24" fill="${accentColor}">
					<tspan fill="${accentColor}">❯</tspan>
					<tspan fill="${subtextColor}"> whoami</tspan>
				</text>
				
				<!-- Main title -->
				<text x="80" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="700" fill="${textColor}">
					${siteConfig.title}
				</text>
				
				<!-- Subtitle/Role -->
				<text x="80" y="350" font-family="system-ui, -apple-system, sans-serif" font-size="32" fill="${accentColor}">
					Founding Engineer at Aptos Labs
				</text>
				
				<!-- Description -->
				<text x="80" y="420" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="${subtextColor}">
					<tspan x="80" dy="0">11+ years scaling infrastructure, developer tooling,</tspan>
					<tspan x="80" dy="36">and teams at the frontier of technology.</tspan>
				</text>
				
				<!-- Bottom accent line -->
				<rect x="80" y="520" width="200" height="4" fill="${accentColor}" rx="2"/>
				
				<!-- URL -->
				<text x="80" y="570" font-family="monospace" font-size="20" fill="${subtextColor}">
					gnazar.io
				</text>
				
				<!-- Corner decoration -->
				<circle cx="${width - 80}" cy="80" r="8" fill="${accentColor}" opacity="0.8"/>
				<circle cx="${width - 80}" cy="80" r="16" fill="none" stroke="${accentColor}" stroke-width="2" opacity="0.4"/>
				<circle cx="${width - 80}" cy="80" r="24" fill="none" stroke="${accentColor}" stroke-width="1" opacity="0.2"/>
			</svg>
		`;

		// Generate the image
		await sharp(Buffer.from(svgText))
			.png()
			.toFile(join(rootDir, "public/og-image.png"));

		console.log("Generated og-image.png (1200x630)");

		// Also generate a smaller version for Twitter summary card (if needed)
		await sharp(Buffer.from(svgText))
			.resize(800, 418)
			.png()
			.toFile(join(rootDir, "public/twitter-image.png"));

		console.log("Generated twitter-image.png (800x418)");

		console.log("\nOG images generated successfully!");
	} catch (error) {
		if (error.code === "ERR_MODULE_NOT_FOUND") {
			console.log("Sharp not installed. Run: bun add -d sharp");
		} else {
			console.error("Error generating OG image:", error);
		}
		process.exit(1);
	}
}

generateOgImage();
