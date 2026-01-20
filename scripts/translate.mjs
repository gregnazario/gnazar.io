#!/usr/bin/env node

/**
 * Translate content using OpenAI API
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... node scripts/translate.mjs
 *   node scripts/translate.mjs --force  # Re-translate all content
 *
 * This script:
 * 1. Reads all MDX files from content/blog and content/projects
 * 2. Translates them to es, fr, zh, ko
 * 3. Saves translations to content/{locale}/blog and content/{locale}/projects
 * 4. Caches translations based on content hash to avoid re-translating unchanged content
 */

import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const contentDir = join(rootDir, "content");
const cacheFile = join(rootDir, ".translation-cache.json");

const locales = ["es", "fr", "zh", "ko"];

const localeNames = {
	es: "Spanish",
	fr: "French",
	zh: "Simplified Chinese",
	ko: "Korean",
};

async function loadCache() {
	try {
		const data = await readFile(cacheFile, "utf-8");
		return JSON.parse(data);
	} catch {
		return {};
	}
}

async function saveCache(cache) {
	await writeFile(cacheFile, JSON.stringify(cache, null, 2));
}

function hashContent(content) {
	return createHash("md5").update(content).digest("hex");
}

async function translateWithOpenAI(content, targetLocale, type) {
	const OpenAI = (await import("openai")).default;

	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) {
		throw new Error(
			"OPENAI_API_KEY environment variable is required for translation",
		);
	}

	const openai = new OpenAI({ apiKey });

	const systemPrompt = `You are a professional translator. Translate the following MDX content from English to ${localeNames[targetLocale]}.

Rules:
1. Preserve all MDX/Markdown formatting (headings, lists, code blocks, links, etc.)
2. Preserve all frontmatter YAML keys in English, only translate the values
3. Do NOT translate code snippets or technical terms that should remain in English
4. Do NOT translate URLs, file paths, or variable names
5. Maintain the same tone and style as the original
6. For ${type === "blog" ? "blog posts" : "project descriptions"}, ensure the translation reads naturally

Return ONLY the translated content, no explanations.`;

	const response = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [
			{ role: "system", content: systemPrompt },
			{ role: "user", content },
		],
		temperature: 0.3,
	});

	return response.choices[0].message.content;
}

async function getFiles(folder) {
	const directory = join(contentDir, folder);
	try {
		const entries = await readdir(directory);
		return entries
			.filter((entry) => entry.endsWith(".mdx"))
			.map((entry) => ({
				name: entry,
				path: join(directory, entry),
				slug: entry.replace(/\.mdx$/, ""),
			}));
	} catch {
		return [];
	}
}

async function ensureDir(dir) {
	if (!existsSync(dir)) {
		await mkdir(dir, { recursive: true });
	}
}

async function translateFile(file, type, locale, cache, force) {
	const content = await readFile(file.path, "utf-8");
	const hash = hashContent(content);
	const cacheKey = `${type}/${file.slug}/${locale}`;

	// Check cache
	if (!force && cache[cacheKey]?.hash === hash) {
		console.log(`  ⏭️  Skipping ${file.name} (${locale}) - unchanged`);
		return cache[cacheKey].translation;
	}

	console.log(`  🔄 Translating ${file.name} to ${localeNames[locale]}...`);

	try {
		const translation = await translateWithOpenAI(content, locale, type);

		// Update cache
		cache[cacheKey] = { hash, translation };

		return translation;
	} catch (error) {
		console.error(`  ❌ Failed to translate ${file.name} to ${locale}:`, error.message);
		return null;
	}
}

async function main() {
	const force = process.argv.includes("--force");

	if (!process.env.OPENAI_API_KEY) {
		console.log("⚠️  OPENAI_API_KEY not set. Skipping translation.");
		console.log("   Set the environment variable to enable translation:");
		console.log("   OPENAI_API_KEY=sk-... node scripts/translate.mjs");
		process.exit(0);
	}

	console.log("🌍 Starting content translation...\n");

	const cache = await loadCache();
	let translatedCount = 0;
	let skippedCount = 0;

	for (const type of ["blog", "projects"]) {
		console.log(`\n📁 Processing ${type}...`);

		const files = await getFiles(type);
		if (files.length === 0) {
			console.log(`   No ${type} files found.`);
			continue;
		}

		for (const locale of locales) {
			const outputDir = join(contentDir, locale, type);
			await ensureDir(outputDir);

			for (const file of files) {
				const translation = await translateFile(file, type, locale, cache, force);

				if (translation) {
					const outputPath = join(outputDir, file.name);
					await writeFile(outputPath, translation);
					translatedCount++;
				} else {
					skippedCount++;
				}
			}
		}
	}

	await saveCache(cache);

	console.log("\n✅ Translation complete!");
	console.log(`   Translated: ${translatedCount}`);
	console.log(`   Skipped/Failed: ${skippedCount}`);
}

main().catch((error) => {
	console.error("Translation failed:", error);
	process.exit(1);
});
