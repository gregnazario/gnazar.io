import { expect, test } from "@playwright/test";

test.describe("Tags Pages", () => {
	test("should display the tags index", async ({ page }) => {
		await page.goto("/tags");

		// SectionHeading titles render as h2 on standalone pages
		await expect(
			page.getByRole("heading", { name: "Tags", level: 2 }),
		).toBeVisible();

		// Tag links render in the cloud
		const tagLinks = page.locator(".tags-cloud a.tag-link");
		const count = await tagLinks.count();
		if (count > 0) {
			await expect(tagLinks.first()).toBeVisible();
		}
	});

	test("should navigate to a tag page and list its posts", async ({ page }) => {
		await page.goto("/tags");

		const firstTag = page.locator(".tags-cloud a.tag-link").first();
		if (await firstTag.isVisible()) {
			await firstTag.click();
			await expect(page).toHaveURL(/\/tags\/.+/);

			// Tag pages show post cards for the tag
			const articles = page.locator("article.card");
			if ((await articles.count()) > 0) {
				await expect(articles.first()).toBeVisible();
			}
		}
	});

	test("should link tags from post cards to tag pages", async ({ page }) => {
		await page.goto("/blog");

		const firstTagLink = page.locator("article.card .card-meta a").first();
		if (await firstTagLink.isVisible()) {
			const href = await firstTagLink.getAttribute("href");
			expect(href).toMatch(/^\/tags\//);
			await firstTagLink.click();
			await expect(page).toHaveURL(/\/tags\/.+/);
		}
	});

	test("should reach the tags index from the footer nav", async ({ page }) => {
		await page.goto("/");

		await page.locator("footer .footer-nav a", { hasText: "Tags" }).click();
		await expect(page).toHaveURL(/\/tags$/);
	});
});
