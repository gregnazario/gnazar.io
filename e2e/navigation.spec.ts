import { expect, test } from "@playwright/test";

// Nav links sit behind the hamburger menu on small viewports.
async function revealNavLink(
	page: import("@playwright/test").Page,
	name: RegExp,
) {
	const link = page.getByRole("link", { name }).first();
	if (!(await link.isVisible())) {
		await page.getByRole("button", { name: /open menu/i }).click();
	}
	return link;
}

test.describe("Site Navigation", () => {
	test("should navigate between pages correctly", async ({ page }) => {
		// Start at home
		await page.goto("/");
		await expect(page).toHaveURL("/");

		// Navigate to blog
		const blogLink = await revealNavLink(page, /blog/i);
		await blogLink.click();
		await expect(page).toHaveURL(/\/blog/);

		// Navigate to projects
		const projectsLink = await revealNavLink(page, /projects/i);
		await projectsLink.click();
		await expect(page).toHaveURL(/\/projects/);

		// Navigate back to home via the header link (the logo's accessible
		// name is "gnazar.io", not the site author's name)
		const homeLink = await revealNavLink(page, /^Home$/);
		await homeLink.click();
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
