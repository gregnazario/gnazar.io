#!/usr/bin/env node

/**
 * Generate PWA icons from the favicon SVG
 * Run with: node scripts/generate-icons.mjs
 *
 * Requires: bun add -d sharp
 */

import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

async function generateIcons() {
	try {
		const sharp = (await import("sharp")).default;

		const svgPath = join(rootDir, "public/favicon.svg");
		const iconsDir = join(rootDir, "public/icons");

		const svgBuffer = await readFile(svgPath);

		const sizes = [192, 512];

		for (const size of sizes) {
			// Regular icon
			await sharp(svgBuffer)
				.resize(size, size)
				.png()
				.toFile(join(iconsDir, `icon-${size}.png`));

			console.log(`Generated icon-${size}.png`);

			// Maskable icon (with padding for safe zone)
			const padding = Math.floor(size * 0.1);
			const innerSize = size - padding * 2;

			await sharp(svgBuffer)
				.resize(innerSize, innerSize)
				.extend({
					top: padding,
					bottom: padding,
					left: padding,
					right: padding,
					background: { r: 10, g: 10, b: 10, alpha: 1 }, // #0a0a0a
				})
				.png()
				.toFile(join(iconsDir, `icon-maskable-${size}.png`));

			console.log(`Generated icon-maskable-${size}.png`);
		}

		// Generate apple-touch-icon (180x180)
		await sharp(svgBuffer)
			.resize(180, 180)
			.png()
			.toFile(join(iconsDir, "apple-touch-icon.png"));

		console.log("Generated apple-touch-icon.png");

		// Generate favicon.ico (32x32 PNG, saved as ico)
		await sharp(svgBuffer)
			.resize(32, 32)
			.png()
			.toFile(join(rootDir, "public/favicon-32.png"));

		console.log("Generated favicon-32.png");

		console.log("\nAll icons generated successfully!");
	} catch (error) {
		if (error.code === "ERR_MODULE_NOT_FOUND") {
			console.log("Sharp not installed. Installing...");
			console.log("Run: bun add -d sharp");
			console.log("Then run this script again.");
		} else {
			console.error("Error generating icons:", error);
		}
		process.exit(1);
	}
}

generateIcons();
