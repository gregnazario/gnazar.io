import { expect, test } from "@playwright/test";

test.describe("Markdown content negotiation", () => {
	test("returns markdown for agent requests", async ({ request }) => {
		const response = await request.get("/", {
			headers: {
				Accept: "text/markdown",
			},
		});

		expect(response.status()).toBe(200);
		expect(response.headers()["content-type"]).toContain("text/markdown");
		expect(response.headers()["x-markdown-tokens"]).toMatch(/^\d+$/);
		await expect(response.text()).resolves.toContain("# gnazar.io");
	});

	test("keeps HTML as the browser default", async ({ request }) => {
		const response = await request.get("/", {
			headers: {
				Accept: "text/html",
			},
		});

		expect(response.status()).toBe(200);
		expect(response.headers()["content-type"]).toContain("text/html");
		await expect(response.text()).resolves.toContain("<!DOCTYPE html>");
	});
});
