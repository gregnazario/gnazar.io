import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Project } from "@/lib/content-i18n";
import { renderWithRouter } from "@/test/render-with-router";
import ProjectCard from "./ProjectCard";

const project: Project = {
	slug: "gimme",
	title: "gimme",
	summary: "A package manager.",
	role: "Design + Engineering",
	year: "2026",
	featured: true,
	links: [],
	image: "/images/projects/gimme.png",
	tech: ["Swift"],
	content: "",
	locale: "en",
	isTranslated: false,
};

describe("ProjectCard", () => {
	it("treats the preview image as decoration, not a third link", async () => {
		const { container } = renderWithRouter(
			<ProjectCard project={project} showRole showAction />,
		);
		await screen.findByRole("heading", { name: "gimme" });
		expect(screen.queryByRole("img", { name: /preview/ })).toBeNull();
		const imageLink = container.querySelector("a.project-card-image");
		expect(imageLink).toHaveAttribute("tabindex", "-1");
		expect(imageLink).toHaveAttribute("aria-hidden", "true");
	});

	it("names the project in its action link", async () => {
		renderWithRouter(<ProjectCard project={project} showAction />);
		expect(
			await screen.findByRole("link", { name: "Read more about gimme" }),
		).toHaveAttribute("href", "/projects/gimme");
	});

	it("hides the role every project shares", async () => {
		const { container } = renderWithRouter(
			<ProjectCard project={project} showRole />,
		);
		await screen.findByRole("heading", { name: "gimme" });
		expect(container).not.toHaveTextContent("Design + Engineering");
	});
});
