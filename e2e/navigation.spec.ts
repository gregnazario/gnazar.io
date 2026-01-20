import { expect, test } from "@playwright/test";

test.describe("Site Navigation", () => {
	test("should navigate between pages correctly", async ({ page }) => {
		// Start at home
		await page.goto("/");
		await expect(page).toHaveURL("/");

		// Navigate to blog
		await page.getByRole("link", { name: /blog/i }).first().click();
		await expect(page).toHaveURL(/\/blog/);

		// Navigate to projects
		await page
			.getByRole("link", { name: /projects/i })
			.first()
			.click();
		await expect(page).toHaveURL(/\/projects/);

		// Navigate back to home
		await page.getByRole("link", { name: /greg nazario/i }).click();
		await expect(page).toHaveURL("/");
	});

	test("should have a functional header on all pages", async ({ page }) => {
		const pages = ["/", "/blog", "/projects"];

		for (const path of pages) {
			await page.goto(path);
			const header = page.locator("header");
			await expect(header).toBeVisible();
		}
	});

	test("should have a functional footer on all pages", async ({ page }) => {
		const pages = ["/", "/blog", "/projects"];

		for (const path of pages) {
			await page.goto(path);
			const footer = page.locator("footer");
			await expect(footer).toBeVisible();
		}
	});
});
