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
