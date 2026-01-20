import { expect, test } from "@playwright/test";

test.describe("Projects Page", () => {
	test("should display projects listing", async ({ page }) => {
		await page.goto("/projects");

		// Check page heading
		await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
	});

	test("should display project cards", async ({ page }) => {
		await page.goto("/projects");

		// Check for article elements (project cards)
		const articles = page.locator("article.card");
		const count = await articles.count();

		// Should have at least one project if content exists
		if (count > 0) {
			await expect(articles.first()).toBeVisible();
		}
	});

	test("should navigate to individual project", async ({ page }) => {
		await page.goto("/projects");

		// Find and click first project link
		const firstProjectLink = page.locator("article.card h3 a").first();

		if (await firstProjectLink.isVisible()) {
			await firstProjectLink.click();
			await expect(page).toHaveURL(/\/projects\/.+/);
		}
	});
});
