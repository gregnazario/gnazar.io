import { expect, test } from "@playwright/test";

test.describe("Accessibility", () => {
	test("should have proper heading hierarchy on home page", async ({
		page,
	}) => {
		await page.goto("/");

		// Should have an h1
		const h1 = page.getByRole("heading", { level: 1 });
		await expect(h1).toBeVisible();

		// Should have h2 headings for sections
		const h2s = page.getByRole("heading", { level: 2 });
		expect(await h2s.count()).toBeGreaterThan(0);
	});

	test("should have accessible navigation landmarks", async ({ page }) => {
		await page.goto("/");

		// Main content landmark
		const main = page.locator("main");
		await expect(main).toBeVisible();

		// Header landmark
		const header = page.locator("header");
		await expect(header).toBeVisible();

		// Footer landmark
		const footer = page.locator("footer");
		await expect(footer).toBeVisible();
	});

	test("should have accessible links with proper attributes", async ({
		page,
	}) => {
		await page.goto("/");

		// External links should have proper rel attributes
		const externalLinks = page.locator('a[target="_blank"]');
		const count = await externalLinks.count();

		for (let i = 0; i < count; i++) {
			const link = externalLinks.nth(i);
			const rel = await link.getAttribute("rel");
			expect(rel).toContain("noopener");
		}
	});

	test("should have accessible images with alt text", async ({ page }) => {
		await page.goto("/");

		// All images should have alt attributes
		const images = page.locator("img");
		const count = await images.count();

		for (let i = 0; i < count; i++) {
			const img = images.nth(i);
			const alt = await img.getAttribute("alt");
			expect(alt).toBeDefined();
			expect(alt?.length).toBeGreaterThan(0);
		}
	});

	test("should have focusable interactive elements", async ({ page }) => {
		await page.goto("/");

		// Theme toggle should be focusable
		const themeToggle = page.getByRole("button", {
			name: /switch to .* mode/i,
		});
		await themeToggle.focus();
		await expect(themeToggle).toBeFocused();

		// Navigation links should be focusable
		const navLink = page.getByRole("link", { name: /view projects/i });
		await navLink.focus();
		await expect(navLink).toBeFocused();
	});
});
