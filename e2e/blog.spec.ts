import { expect, test } from "@playwright/test";

test.describe("Blog Page", () => {
	test("should display blog listing", async ({ page }) => {
		await page.goto("/blog");

		// Check page heading
		await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
	});

	test("should display blog post cards", async ({ page }) => {
		await page.goto("/blog");

		// Check for article elements (post cards)
		const articles = page.locator("article.card");
		const count = await articles.count();

		// Should have at least one post if content exists
		if (count > 0) {
			await expect(articles.first()).toBeVisible();
		}
	});

	test("should navigate to individual blog post", async ({ page }) => {
		await page.goto("/blog");

		// Find and click first blog post link
		const firstPostLink = page.locator("article.card h3 a").first();

		if (await firstPostLink.isVisible()) {
			await firstPostLink.click();
			await expect(page).toHaveURL(/\/blog\/.+/);
		}
	});
});
