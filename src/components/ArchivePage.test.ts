import { afterEach, describe, expect, it } from "vitest";
import type { BlogPost } from "@/lib/content-i18n";
import { groupPostsByYearAndMonth } from "./ArchivePage";

function post(date: string): BlogPost {
	return {
		slug: `post-${date}`,
		title: date,
		date,
		summary: "",
		tags: [],
		published: true,
		content: "",
		locale: "en",
		isTranslated: false,
	};
}

describe("groupPostsByYearAndMonth", () => {
	const originalTz = process.env.TZ;

	afterEach(() => {
		if (originalTz === undefined) {
			delete process.env.TZ;
		} else {
			process.env.TZ = originalTz;
		}
	});

	// A date-only value is a calendar date: it must not slip into the previous
	// month for viewers west of UTC.
	it.each(["America/Los_Angeles", "Pacific/Honolulu"])(
		"files a post under its own month in the %s time zone",
		(timeZone) => {
			process.env.TZ = timeZone;
			const groups = groupPostsByYearAndMonth([post("2026-01-17")]);
			expect(groups).toHaveLength(1);
			expect(groups[0].year).toBe("2026");
			expect(groups[0].months.map((month) => month.month)).toEqual(["01"]);
		},
	);

	it("names the month in the page's language", () => {
		const groups = groupPostsByYearAndMonth([post("2026-01-17")], "es");
		expect(groups[0].months[0].monthName).toBe("enero");
	});
});
