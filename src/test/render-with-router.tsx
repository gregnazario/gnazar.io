import {
	createMemoryHistory,
	createRootRoute,
	createRoute,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";

/**
 * Render `ui` inside a router that knows the routes components link to, so
 * `<Link>` resolves real hrefs instead of warning about unknown routes.
 */
export function renderWithRouter(ui: ReactElement, url = "/") {
	const rootRoute = createRootRoute({ component: () => ui });
	const routeTree = rootRoute.addChildren([
		createRoute({ getParentRoute: () => rootRoute, path: "/" }),
		createRoute({
			getParentRoute: () => rootRoute,
			path: "/projects/$slug",
		}),
		createRoute({ getParentRoute: () => rootRoute, path: "/$locale" }),
		createRoute({
			getParentRoute: () => rootRoute,
			path: "/$locale/projects/$slug",
		}),
	]);
	const router = createRouter({
		routeTree,
		history: createMemoryHistory({ initialEntries: [url] }),
	});

	return render(<RouterProvider router={router} />);
}
