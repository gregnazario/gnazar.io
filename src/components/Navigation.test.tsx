import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { defaultLocale } from "@/lib/i18n";
import { renderWithRouter } from "@/test/render-with-router";
import NavigationProgress from "./NavigationProgress";
import NotFound from "./NotFound";
import ProjectNavigation from "./ProjectNavigation";

describe("NotFound", () => {
	it("announces the page as not found for screen readers", async () => {
		renderWithRouter(<NotFound />, "/no-such-page");
		expect(
			await screen.findByRole("heading", { level: 1, name: "Page not found" }),
		).toBeInTheDocument();
	});
});

describe("ProjectNavigation", () => {
	const previous = { slug: "config-sync", title: "config-sync" };
	const next = { slug: "golf", title: "golf" };

	it("links to the neighbouring projects and back to the list", async () => {
		renderWithRouter(
			<ProjectNavigation
				previous={previous}
				next={next}
				locale={defaultLocale}
			/>,
		);
		expect(
			await screen.findByRole("link", {
				name: /previous project.*config-sync/i,
			}),
		).toHaveAttribute("href", "/projects/config-sync");
		expect(
			screen.getByRole("link", { name: /next project.*golf/i }),
		).toHaveAttribute("href", "/projects/golf");
		expect(
			screen.getByRole("link", { name: "Back to projects" }),
		).toHaveAttribute("href", "/projects");
	});

	it("leaves out a neighbour that does not exist", async () => {
		renderWithRouter(
			<ProjectNavigation previous={previous} locale={defaultLocale} />,
		);
		await screen.findByRole("link", { name: "Back to projects" });
		expect(screen.queryByRole("link", { name: /next project/i })).toBeNull();
	});
});

describe("NavigationProgress", () => {
	it("shows a bar while a page is loading", () => {
		const { container } = render(<NavigationProgress pending />);
		expect(container.querySelector(".nav-progress")).not.toBeNull();
	});

	it("renders nothing once the page has loaded", () => {
		const { container } = render(<NavigationProgress pending={false} />);
		expect(container).toBeEmptyDOMElement();
	});
});
