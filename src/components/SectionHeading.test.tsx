import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SectionHeading from "./SectionHeading";

describe("SectionHeading", () => {
	it("renders title", () => {
		render(<SectionHeading title="Test Title" />);
		expect(screen.getByText("Test Title")).toBeInTheDocument();
	});

	it("renders eyebrow when provided", () => {
		render(<SectionHeading title="Title" eyebrow="Eyebrow Text" />);
		expect(screen.getByText("Eyebrow Text")).toBeInTheDocument();
	});

	it("renders subtitle when provided", () => {
		render(<SectionHeading title="Title" subtitle="Subtitle Text" />);
		expect(screen.getByText("Subtitle Text")).toBeInTheDocument();
	});

	it("renders all elements together", () => {
		render(
			<SectionHeading
				title="Main Title"
				eyebrow="Category"
				subtitle="Description text"
			/>,
		);
		expect(screen.getByText("Main Title")).toBeInTheDocument();
		expect(screen.getByText("Category")).toBeInTheDocument();
		expect(screen.getByText("Description text")).toBeInTheDocument();
	});

	it("renders the title as an h2 by default", () => {
		render(<SectionHeading title="Focus areas" />);
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"Focus areas",
		);
	});

	it("renders the title as an h1 when it is the page heading", () => {
		render(<SectionHeading as="h1" title="Projects" />);
		expect(
			screen.getByRole("heading", { level: 1, name: "Projects" }),
		).toBeInTheDocument();
	});

	it("renders subtitle as ReactNode", () => {
		render(
			<SectionHeading
				title="Title"
				subtitle={<span data-testid="custom-subtitle">Custom Subtitle</span>}
			/>,
		);
		expect(screen.getByTestId("custom-subtitle")).toBeInTheDocument();
	});
});
