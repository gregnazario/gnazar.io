import { expect, test } from "@playwright/test";

test.describe("Language Switching", () => {
	// Switching between two non-English languages keeps the same route mounted
	// and only changes its locale parameter.
	test.skip(
		({ isMobile }) => Boolean(isMobile),
		"the language menu sits inside the hamburger menu on small viewports",
	);

	test("retypes the home copy instead of stacking two languages", async ({
		page,
	}) => {
		await page.goto("/es");

		const hero = page.locator(".hero .typewriter");
		await expect(hero).toHaveAttribute("data-done", "true", { timeout: 15000 });

		await page.getByRole("combobox", { name: /idioma/i }).selectOption("fr");
		await expect(page).toHaveURL(/\/fr$/);

		// The typed sentence must only ever be the new text, or nothing yet —
		// never the sentence from the previous language
		await expect
			.poll(
				async () => {
					const typed =
						(await hero.locator(".typewriter-overlay").textContent()) ?? "";
					const full =
						(await hero.locator(".typewriter-base").textContent()) ?? "";
					const sentence = typed.replace("█", "");
					return sentence === "" || sentence === full;
				},
				{ timeout: 15000 },
			)
			.toBe(true);
		await expect(hero).toHaveAttribute("data-done", "true", { timeout: 15000 });

		const text = (await hero.locator(".typewriter-base").textContent()) ?? "";
		expect(text).toContain("Aptos Labs");
		expect(text).toContain("chez");
	});
});
