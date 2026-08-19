import { expect, test } from "@playwright/test";

test.describe("Archive Page", () => {
	test("should display the archive grouped by date", async ({ page }) => {
		await page.goto("/archive");

		// SectionHeading titles render as h2 on standalone pages
		await expect(
			page.getByRole("heading", { name: "Archive", level: 2 }),
		).toBeVisible();

		// Posts are grouped under year headings
		const yearHeadings = page.locator(".archive-year-title");
		if ((await yearHeadings.count()) > 0) {
			await expect(yearHeadings.first()).toBeVisible();
		}
	});

	test("should link archive entries to blog posts", async ({ page }) => {
		await page.goto("/archive");

		const firstPostLink = page.locator(".archive-posts li a").first();
		if (await firstPostLink.isVisible()) {
			const href = await firstPostLink.getAttribute("href");
			expect(href).toMatch(/^\/blog\//);
			await firstPostLink.click();
			await expect(page).toHaveURL(/\/blog\/.+/);
		}
	});

	test("should reach the archive from the footer nav", async ({ page }) => {
		await page.goto("/");

		await page.locator("footer .footer-nav a", { hasText: "Archive" }).click();
		await expect(page).toHaveURL(/\/archive$/);
	});
});
