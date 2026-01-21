#!/usr/bin/env node

/**
 * Optimize images for web performance
 * - Resizes images to appropriate dimensions
 * - Generates WebP versions for modern browsers
 * - Compresses PNG/JPEG
 */

import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const imagesDir = join(publicDir, "images");

async function optimizeHeadshot() {
	const input = join(imagesDir, "headshot.png");

	if (!existsSync(input)) {
		console.log("⚠️  headshot.png not found, skipping...");
		return;
	}

	// Get original file size
	const { size: originalSize } = await sharp(input)
		.metadata()
		.then(() => import("node:fs").then((fs) => fs.statSync(input)));

	console.log(
		`📸 Optimizing headshot.png (original: ${(originalSize / 1024 / 1024).toFixed(2)}MB)`,
	);

	// Create optimized PNG at 2x display size (840x1040 for 420x520 display)
	// Using 2x for retina displays
	const optimizedPng = await sharp(input)
		.resize(840, 1040, { fit: "cover", position: "top" })
		.png({ quality: 85, compressionLevel: 9 })
		.toBuffer();

	await sharp(optimizedPng).toFile(join(imagesDir, "headshot-optimized.png"));
	console.log(
		`  ✓ headshot-optimized.png: ${(optimizedPng.length / 1024).toFixed(1)}KB`,
	);

	// Create WebP version (even smaller)
	const webp = await sharp(input)
		.resize(840, 1040, { fit: "cover", position: "top" })
		.webp({ quality: 85 })
		.toBuffer();

	await sharp(webp).toFile(join(imagesDir, "headshot.webp"));
	console.log(`  ✓ headshot.webp: ${(webp.length / 1024).toFixed(1)}KB`);

	// Create AVIF version (smallest, best quality)
	const avif = await sharp(input)
		.resize(840, 1040, { fit: "cover", position: "top" })
		.avif({ quality: 80 })
		.toBuffer();

	await sharp(avif).toFile(join(imagesDir, "headshot.avif"));
	console.log(`  ✓ headshot.avif: ${(avif.length / 1024).toFixed(1)}KB`);

	const totalSaved = originalSize - optimizedPng.length;
	console.log(
		`\n💾 Saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB (${((totalSaved / originalSize) * 100).toFixed(1)}% reduction)`,
	);
	console.log(
		"\n📝 Update your code to use <picture> with srcset for best performance:",
	);
	console.log(`
<picture>
  <source srcSet="/images/headshot.avif" type="image/avif" />
  <source srcSet="/images/headshot.webp" type="image/webp" />
  <img src="/images/headshot-optimized.png" alt="..." width={420} height={520} />
</picture>
`);
}

async function main() {
	console.log("🖼️  Optimizing images...\n");

	if (!existsSync(imagesDir)) {
		mkdirSync(imagesDir, { recursive: true });
	}

	await optimizeHeadshot();

	console.log("\n✅ Image optimization complete!");
}

main().catch(console.error);
