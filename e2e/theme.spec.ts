import { expect, test } from "@playwright/test";

test.describe("Theme Toggle", () => {
	test("should toggle between light and dark themes", async ({ page }) => {
		await page.goto("/");

		const themeToggle = page.getByRole("button", {
			name: /switch to .* mode/i,
		});
		await expect(themeToggle).toBeVisible();

		// Get initial theme
		const initialTheme = await page.evaluate(
			() => document.documentElement.dataset.theme,
		);

		// Click to toggle theme
		await themeToggle.click();

		// Verify theme changed
		const newTheme = await page.evaluate(
			() => document.documentElement.dataset.theme,
		);
		expect(newTheme).not.toBe(initialTheme);

		// Click again to toggle back
		await themeToggle.click();
		const finalTheme = await page.evaluate(
			() => document.documentElement.dataset.theme,
		);
		expect(finalTheme).toBe(initialTheme);
	});

	test("should persist theme across page navigation", async ({ page }) => {
		await page.goto("/");

		const themeToggle = page.getByRole("button", {
			name: /switch to .* mode/i,
		});

		// Set to dark mode
		await themeToggle.click();
		const darkTheme = await page.evaluate(
			() => document.documentElement.dataset.theme,
		);

		// Navigate to another page
		await page.getByRole("link", { name: /blog/i }).first().click();
		await page.waitForURL(/\/blog/);

		// Theme should persist
		const persistedTheme = await page.evaluate(
			() => document.documentElement.dataset.theme,
		);
		expect(persistedTheme).toBe(darkTheme);
	});
});
