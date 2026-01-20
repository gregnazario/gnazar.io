import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Badge from "./Badge";

describe("Badge", () => {
	it("renders children correctly", () => {
		render(<Badge>Test Badge</Badge>);
		expect(screen.getByText("Test Badge")).toBeInTheDocument();
	});

	it("applies the badge class", () => {
		render(<Badge>Styled Badge</Badge>);
		const badge = screen.getByText("Styled Badge");
		expect(badge).toHaveClass("badge");
	});

	it("renders as a span element", () => {
		render(<Badge>Span Badge</Badge>);
		const badge = screen.getByText("Span Badge");
		expect(badge.tagName).toBe("SPAN");
	});

	it("renders complex children", () => {
		render(
			<Badge>
				<strong>Bold</strong> text
			</Badge>,
		);
		expect(screen.getByText("Bold")).toBeInTheDocument();
	});
});
