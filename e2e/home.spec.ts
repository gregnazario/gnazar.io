import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
	test("should display the hero section", async ({ page }) => {
		await page.goto("/");

		// Check for the main heading
		await expect(
			page.getByRole("heading", { name: /greg nazario/i }),
		).toBeVisible();

		// Check for hero actions
		await expect(
			page.getByRole("link", { name: /view projects/i }),
		).toBeVisible();
		await expect(
			page.getByRole("link", { name: /read my blog/i }),
		).toBeVisible();
	});

	test("should display social links", async ({ page }) => {
		await page.goto("/");

		const socialNav = page.getByRole("navigation", { name: /social links/i });
		await expect(socialNav).toBeVisible();

		// Check that social links exist and open in new tab
		const githubLink = socialNav.getByRole("link", { name: /github/i });
		await expect(githubLink).toHaveAttribute("target", "_blank");
	});

	test("should have working navigation to projects", async ({ page }) => {
		await page.goto("/");

		await page.getByRole("link", { name: /view projects/i }).click();
		await expect(page).toHaveURL(/\/projects/);
	});

	test("should have working navigation to blog", async ({ page }) => {
		await page.goto("/");

		await page.getByRole("link", { name: /read my blog/i }).click();
		await expect(page).toHaveURL(/\/blog/);
	});

	test("should display experience section", async ({ page }) => {
		await page.goto("/");

		await expect(page.getByText(/years at the frontier/i)).toBeVisible();
	});

	test("should display focus areas section", async ({ page }) => {
		await page.goto("/");

		await expect(
			page.getByRole("heading", { name: /focus areas/i }),
		).toBeVisible();
		await expect(
			page.getByRole("heading", { name: /infrastructure scaling/i }),
		).toBeVisible();
		await expect(
			page.getByRole("heading", { name: /developer tooling/i }),
		).toBeVisible();
	});
});
