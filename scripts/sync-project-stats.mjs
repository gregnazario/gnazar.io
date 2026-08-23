#!/usr/bin/env node

/**
 * Refresh GitHub stats (stars/forks/last push) in project frontmatter.
 *
 * Reads content/projects/*.mdx, finds each project's GitHub "Source" link,
 * fetches repo metadata from the GitHub API, and surgically updates the
 * stars/forks/lastPush frontmatter lines (preserving file formatting).
 *
 * Usage:
 *   node scripts/sync-project-stats.mjs           # unauthenticated (rate limited)
 *   GITHUB_TOKEN=... node scripts/sync-project-stats.mjs
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectsDir = join(__dirname, "..", "content", "projects");

const headers = {
	Accept: "application/vnd.github+json",
	"User-Agent": "gnazar.io-stats-sync",
	...(process.env.GITHUB_TOKEN
		? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
		: {}),
};

function repoFromFrontmatter(data) {
	const links = Array.isArray(data.links) ? data.links : [];
	for (const link of links) {
		if (
			link &&
			typeof link.href === "string" &&
			link.href.startsWith("https://github.com/")
		) {
			const parts = link.href.replace("https://github.com/", "").split("/");
			if (parts.length >= 2) {
				return `${parts[0]}/${parts[1].replace(/\.git$/, "")}`;
			}
		}
	}
	return null;
}

/**
 * Update `key` in the frontmatter block only, leaving the MDX body
 * untouched even if it contains lines that look like frontmatter.
 */
function setFrontmatterValue(src, key, value) {
	// Frontmatter is everything through the closing `---` delimiter.
	const match = src.match(/^---\n.*?\n---\n/s);
	if (!match) {
		return src;
	}
	const frontmatter = match[0];
	const rest = src.slice(frontmatter.length);

	const re = new RegExp(`^${key}:.*$`, "m");
	let updated;
	if (re.test(frontmatter)) {
		updated = frontmatter.replace(re, `${key}: ${value}`);
	} else {
		// Insert after status: (or featured: as fallback) inside frontmatter
		const anchor = /^status:.*$/m.test(frontmatter) ? "status" : "featured";
		const anchorRe = new RegExp(`^(${anchor}:.*$)`, "m");
		updated = frontmatter.replace(anchorRe, `$1\n${key}: ${value}`);
	}
	return `${updated}${rest}`;
}

async function main() {
	console.log("📡 Syncing GitHub project stats...\n");

	const files = readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));

	for (const file of files) {
		const filePath = join(projectsDir, file);
		const raw = readFileSync(filePath, "utf-8");
		const { data } = matter(raw);
		const repo = repoFromFrontmatter(data);
		if (!repo) {
			console.log(`  ⏭️  ${file} (no GitHub link)`);
			continue;
		}

		try {
			const res = await fetch(`https://api.github.com/repos/${repo}`, {
				headers,
			});
			if (!res.ok) {
				console.log(`  ⚠️  ${file}: GitHub API ${res.status} for ${repo}`);
				continue;
			}
			const info = await res.json();
			const lastPush = info.pushed_at?.slice(0, 10) ?? "";
			let updated = raw;
			updated = setFrontmatterValue(updated, "stars", info.stargazers_count);
			updated = setFrontmatterValue(updated, "forks", info.forks_count);
			updated = setFrontmatterValue(updated, "lastPush", `"${lastPush}"`);
			if (updated !== raw) {
				writeFileSync(filePath, updated);
				console.log(
					`  ✓ ${repo}: ★${info.stargazers_count} forks=${info.forks_count} lastPush=${lastPush}`,
				);
			} else {
				console.log(`  = ${repo}: up to date`);
			}
		} catch (err) {
			console.log(`  ⚠️  ${file}: ${err.message}`);
		}
	}

	console.log("\n✅ Stats sync complete!");
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
