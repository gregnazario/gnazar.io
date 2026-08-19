import { expect, test } from "@playwright/test";

// The theme toggle sits inside the nav, which collapses behind the
// hamburger menu on small viewports.
async function revealThemeToggle(page: import("@playwright/test").Page) {
	const themeToggle = page.getByRole("button", {
		name: /switch to .* mode/i,
	});
	if (!(await themeToggle.isVisible())) {
		await page.getByRole("button", { name: /open menu/i }).click();
	}
	return themeToggle;
}

test.describe("Theme Toggle", () => {
	test("should toggle between light and dark themes", async ({ page }) => {
		await page.goto("/");

		const themeToggle = await revealThemeToggle(page);
		await expect(themeToggle).toBeVisible();

		// Get initial theme (unset until the first toggle, which means light)
		const initialTheme =
			(await page.evaluate(() => document.documentElement.dataset.theme)) ??
			"light";

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

		const themeToggle = await revealThemeToggle(page);

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
