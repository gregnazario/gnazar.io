import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SocialLinks from "./SocialLinks";

describe("SocialLinks", () => {
	it("renders social navigation", () => {
		render(<SocialLinks />);
		const nav = screen.getByRole("navigation", { name: /social links/i });
		expect(nav).toBeInTheDocument();
	});

	it("renders LinkedIn link", () => {
		render(<SocialLinks />);
		const link = screen.getByRole("link", { name: /linkedin/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", expect.stringContaining("linkedin"));
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noreferrer noopener");
	});

	it("renders GitHub link", () => {
		render(<SocialLinks />);
		const link = screen.getByRole("link", { name: /github/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", expect.stringContaining("github"));
	});

	it("renders X/Twitter link", () => {
		render(<SocialLinks />);
		const link = screen.getByRole("link", { name: /^x$/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", expect.stringContaining("twitter"));
	});

	it("has correct security attributes on all links", () => {
		render(<SocialLinks />);
		const links = screen.getAllByRole("link");
		for (const link of links) {
			expect(link).toHaveAttribute("target", "_blank");
			expect(link).toHaveAttribute("rel", "noreferrer noopener");
		}
	});
});
