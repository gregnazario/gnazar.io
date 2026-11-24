import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Project } from "@/lib/content-i18n";
import ProjectHeader from "./ProjectHeader";

const project: Project = {
	slug: "gimme",
	title: "gimme",
	summary: "A package manager.",
	role: "Design + Engineering",
	year: "2026",
	featured: true,
	links: [],
	tech: ["Swift"],
	status: "active",
	stars: 0,
	forks: 0,
	lastPush: "2026-08-25",
	content: "",
	locale: "en",
	isTranslated: false,
};

describe("ProjectHeader", () => {
	it("shows star and fork counts that are above zero", () => {
		render(<ProjectHeader project={{ ...project, stars: 8, forks: 2 }} />);
		expect(screen.getByText(/8 stars/)).toBeInTheDocument();
		expect(screen.getByText(/2 forks/)).toBeInTheDocument();
	});

	it("hides star and fork counts that are zero but keeps the last push", () => {
		const { container } = render(<ProjectHeader project={project} />);
		expect(container).not.toHaveTextContent(/0 stars/);
		expect(container).not.toHaveTextContent(/0 forks/);
		expect(screen.getByText(/Last push/)).toBeInTheDocument();
	});

	it("hides the role every project shares", () => {
		const { container } = render(<ProjectHeader project={project} />);
		expect(container).not.toHaveTextContent("Design + Engineering");
	});

	it("keeps a role that says something about the project", () => {
		render(
			<ProjectHeader project={{ ...project, role: "Capstone team project" }} />,
		);
		expect(screen.getByText("Capstone team project")).toBeInTheDocument();
	});
});
