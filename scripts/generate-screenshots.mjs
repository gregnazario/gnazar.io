#!/usr/bin/env node

/**
 * Generate PWA screenshot images for the install UI (manifest "screenshots")
 *
 * Usage:
 *   node scripts/generate-screenshots.mjs
 *   node scripts/generate-screenshots.mjs --force
 */

import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const outputDir = join(rootDir, "public", "screenshots");

const force = process.argv.includes("--force");

const darkBg = "#0f1712";
const accentColor = "#6bcf73";
const textColor = "#e6f4e7";
const mutedColor = "#9bb3a1";

function browserChrome(width, height, contentSvg) {
	return `
		<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
					<path d="M 40 0 L 0 0 0 40" fill="none" stroke="${accentColor}" stroke-opacity="0.08"/>
				</pattern>
			</defs>

			<!-- Browser chrome -->
			<rect width="${width}" height="56" fill="#1a2420"/>
			<circle cx="28" cy="28" r="7" fill="#e06c60"/>
			<circle cx="52" cy="28" r="7" fill="#e0b84c"/>
			<circle cx="76" cy="28" r="7" fill="#6bcf73"/>
			<rect x="104" y="12" width="${width - 128}" height="32" rx="6" fill="#0f1712"/>
			<text x="120" y="34" font-family="monospace" font-size="15" fill="${mutedColor}">gnazar.io</text>

			<!-- Page -->
			<rect x="0" y="56" width="${width}" height="${height - 56}" fill="${darkBg}"/>
			<rect x="0" y="56" width="${width}" height="${height - 56}" fill="url(#grid)"/>
			${contentSvg}
		</svg>
	`;
}

const desktopContent = `
	<rect x="64" y="140" width="120" height="4" fill="${accentColor}"/>
	<text x="64" y="230" font-family="system-ui, sans-serif" font-size="64" font-weight="700" fill="${textColor}">Greg Nazario</text>
	<text x="64" y="290" font-family="monospace" font-size="22" fill="${accentColor}">Founding Engineer, Aptos Labs</text>
	<text x="64" y="340" font-family="system-ui, sans-serif" font-size="20" fill="${mutedColor}">Infrastructure · Developer tooling · Leadership</text>

	<rect x="64" y="400" width="300" height="120" rx="8" fill="#16211a" stroke="${accentColor}" stroke-opacity="0.3"/>
	<text x="88" y="450" font-family="monospace" font-size="16" fill="${accentColor}">BLOG</text>
	<text x="88" y="484" font-family="system-ui, sans-serif" font-size="16" fill="${mutedColor}">Latest writing</text>

	<rect x="384" y="400" width="300" height="120" rx="8" fill="#16211a" stroke="${accentColor}" stroke-opacity="0.3"/>
	<text x="408" y="450" font-family="monospace" font-size="16" fill="${accentColor}">PROJECTS</text>
	<text x="408" y="484" font-family="system-ui, sans-serif" font-size="16" fill="${mutedColor}">Selected work</text>

	<text x="64" y="640" font-family="monospace" font-size="16" fill="${mutedColor}">gnazar.io</text>
`;

const mobileContent = `
	<rect x="48" y="140" width="100" height="4" fill="${accentColor}"/>
	<text x="48" y="220" font-family="system-ui, sans-serif" font-size="44" font-weight="700" fill="${textColor}">Greg</text>
	<text x="48" y="270" font-family="system-ui, sans-serif" font-size="44" font-weight="700" fill="${textColor}">Nazario</text>
	<text x="48" y="318" font-family="monospace" font-size="17" fill="${accentColor}">Founding Engineer,</text>
	<text x="48" y="344" font-family="monospace" font-size="17" fill="${accentColor}">Aptos Labs</text>

	<rect x="48" y="400" width="444" height="90" rx="8" fill="#16211a" stroke="${accentColor}" stroke-opacity="0.3"/>
	<text x="72" y="438" font-family="monospace" font-size="15" fill="${accentColor}">BLOG</text>
	<text x="72" y="466" font-family="system-ui, sans-serif" font-size="15" fill="${mutedColor}">Latest writing</text>

	<rect x="48" y="510" width="444" height="90" rx="8" fill="#16211a" stroke="${accentColor}" stroke-opacity="0.3"/>
	<text x="72" y="548" font-family="monospace" font-size="15" fill="${accentColor}">PROJECTS</text>
	<text x="72" y="576" font-family="system-ui, sans-serif" font-size="15" fill="${mutedColor}">Selected work</text>
`;

async function render(name, svg) {
	const outputPath = join(outputDir, name);
	if (!force && existsSync(outputPath)) {
		console.log(`  ⏭️  Skipping ${name} (already exists)`);
		return;
	}
	await sharp(Buffer.from(svg)).png().toFile(outputPath);
	console.log(`  ✓ Generated ${name}`);
}

async function main() {
	console.log("📸 Generating PWA screenshots...\n");

	if (!existsSync(outputDir)) {
		mkdirSync(outputDir, { recursive: true });
	}

	await render("desktop.png", browserChrome(1280, 720, desktopContent));
	await render("mobile.png", browserChrome(540, 720, mobileContent));

	console.log("\n✅ Screenshot generation complete!");
}

main().catch(console.error);
