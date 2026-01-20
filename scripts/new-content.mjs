#!/usr/bin/env node

/**
 * Create a new blog post or project from template
 *
 * Usage:
 *   bun run new:blog [slug]
 *   bun run new:project [slug]
 *   bun run new (interactive)
 */

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const contentRoot = path.join(process.cwd(), "content");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function prompt(question) {
	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			resolve(answer.trim());
		});
	});
}

function slugify(text) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

function getToday() {
	return new Date().toISOString().split("T")[0];
}

async function createBlogPost(slug) {
	const title = await prompt("Title: ");
	const summary = await prompt("Summary: ");
	const tagsInput = await prompt("Tags (comma-separated): ");
	const tags = tagsInput
		.split(",")
		.map((t) => t.trim())
		.filter(Boolean);

	const finalSlug = slug || slugify(title);
	const filePath = path.join(contentRoot, "blog", `${finalSlug}.mdx`);

	if (fs.existsSync(filePath)) {
		console.error(`\n❌ File already exists: ${filePath}`);
		process.exit(1);
	}

	const tagsYaml =
		tags.length > 0
			? `tags:\n${tags.map((t) => `  - ${t}`).join("\n")}`
			: "tags: []";

	const content = `---
title: "${title}"
date: "${getToday()}"
summary: "${summary}"
${tagsYaml}
published: false
---

Write your content here...
`;

	fs.writeFileSync(filePath, content);
	console.log(`\n✅ Created blog post: ${filePath}`);
	console.log(`\n📝 Next steps:`);
	console.log(`   1. Edit the file to add your content`);
	console.log(`   2. Set published: true when ready`);
	console.log(`   3. Run 'bun run translate' to generate translations`);
}

async function createProject(slug) {
	const title = await prompt("Title: ");
	const summary = await prompt("Summary: ");
	const year =
		(await prompt(`Year (default: ${new Date().getFullYear()}): `)) ||
		String(new Date().getFullYear());
	const role = await prompt("Role (e.g., Design + Engineering): ");
	const featured = (await prompt("Featured? (y/n): ")).toLowerCase() === "y";

	const linksInput = await prompt(
		"Links (format: label|url, comma-separated, or leave empty): ",
	);
	const links = linksInput
		.split(",")
		.map((l) => l.trim())
		.filter(Boolean)
		.map((l) => {
			const [label, href] = l.split("|").map((s) => s.trim());
			return { label, href };
		})
		.filter((l) => l.label && l.href);

	const finalSlug = slug || slugify(title);
	const filePath = path.join(contentRoot, "projects", `${finalSlug}.mdx`);

	if (fs.existsSync(filePath)) {
		console.error(`\n❌ File already exists: ${filePath}`);
		process.exit(1);
	}

	const linksYaml =
		links.length > 0
			? `links:\n${links.map((l) => `  - label: "${l.label}"\n    href: "${l.href}"`).join("\n")}`
			: "links: []";

	const content = `---
title: "${title}"
summary: "${summary}"
year: "${year}"
role: "${role}"
featured: ${featured}
${linksYaml}
---

Write your project description here...
`;

	fs.writeFileSync(filePath, content);
	console.log(`\n✅ Created project: ${filePath}`);
	console.log(`\n📝 Next steps:`);
	console.log(`   1. Edit the file to add your content`);
	console.log(`   2. Run 'bun run translate' to generate translations`);
}

async function main() {
	const args = process.argv.slice(2);
	const command = args[0];
	const slug = args[1];

	console.log("📄 New Content Generator\n");

	let type = command;

	if (!type || (type !== "blog" && type !== "project")) {
		type = await prompt("Type (blog/project): ");
	}

	if (type === "blog") {
		await createBlogPost(slug);
	} else if (type === "project") {
		await createProject(slug);
	} else {
		console.error('Invalid type. Use "blog" or "project".');
		process.exit(1);
	}

	rl.close();
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
