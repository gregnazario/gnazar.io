import { describe, expect, it } from "vitest";
import { formatDate } from "./format";

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
