import { describe, expect, it } from "vitest";
import { siteConfig } from "./site";

describe("siteConfig", () => {
	it("has required properties", () => {
		expect(siteConfig.title).toBeDefined();
		expect(siteConfig.description).toBeDefined();
		expect(siteConfig.url).toBeDefined();
		expect(siteConfig.social).toBeDefined();
		expect(siteConfig.locale).toBeDefined();
		expect(siteConfig.twitterHandle).toBeDefined();
	});

	it("has valid social links", () => {
		expect(siteConfig.social.github).toMatch(/^https:\/\/github\.com\//);
		expect(siteConfig.social.linkedin).toMatch(/^https:\/\/linkedin\.com\//);
		expect(siteConfig.social.twitter).toMatch(/^https:\/\/twitter\.com\//);
	});

	it("has a valid URL", () => {
		expect(() => new URL(siteConfig.url)).not.toThrow();
	});

	it("has a valid Twitter handle format", () => {
		expect(siteConfig.twitterHandle).toMatch(/^@[\w]+$/);
	});
});
