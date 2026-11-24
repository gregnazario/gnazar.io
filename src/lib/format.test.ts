import { afterEach, describe, expect, it } from "vitest";
import { formatDate, parseDate, pluralize } from "./format";

describe("formatDate with date-only values", () => {
	const originalTz = process.env.TZ;

	afterEach(() => {
		if (originalTz === undefined) {
			delete process.env.TZ;
		} else {
			process.env.TZ = originalTz;
		}
	});

	// A date-only value is a calendar date, not midnight UTC: viewers west of
	// UTC must not see it shift to the previous day.
	it.each(["America/Los_Angeles", "Pacific/Honolulu"])(
		"keeps the calendar date in the %s time zone",
		(timeZone) => {
			process.env.TZ = timeZone;
			expect(formatDate("2026-01-17")).toBe("Jan 17, 2026");
		},
	);
});

describe("parseDate", () => {
	it("parses a date-only value as that calendar date", () => {
		const date = parseDate("2026-01-17");
		expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([
			2026, 0, 17,
		]);
	});

	it("returns an invalid date for an impossible calendar date", () => {
		expect(parseDate("2026-02-30").getTime()).toBeNaN();
	});
});

describe("pluralize", () => {
	it("uses the singular for exactly one", () => {
		expect(pluralize(1, "post")).toBe("post");
	});

	it("uses the plural for every other count", () => {
		expect(pluralize(0, "post")).toBe("posts");
		expect(pluralize(2, "post")).toBe("posts");
	});

	it("accepts an irregular plural", () => {
		expect(pluralize(0, "category", "categories")).toBe("categories");
	});
});

describe("formatDate", () => {
	it("formats a valid date string with timezone", () => {
		// Use ISO format with time to avoid timezone issues
		const result = formatDate("2024-01-15T12:00:00");
		expect(result).toBe("Jan 15, 2024");
	});

	it("formats an ISO date string", () => {
		const result = formatDate("2024-06-20T12:00:00Z");
		expect(result).toMatch(/Jun \d{2}, 2024/);
	});

	it("returns the original value for invalid dates", () => {
		const result = formatDate("not-a-date");
		expect(result).toBe("not-a-date");
	});

	it("returns the original value for empty string", () => {
		const result = formatDate("");
		expect(result).toBe("");
	});

	it("formats dates and returns expected month/year", () => {
		// Use full ISO timestamps to avoid timezone issues
		const dec = formatDate("2023-12-25T12:00:00");
		expect(dec).toContain("Dec");
		expect(dec).toContain("2023");

		const mar = formatDate("2024-03-01T12:00:00");
		expect(mar).toContain("Mar");
		expect(mar).toContain("2024");
	});
});
