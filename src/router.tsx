import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
	return createRouter({
		routeTree,
		context: {},
		scrollRestoration: true,
		// Fetch a route's data as soon as a link to it is hovered or focused, so
		// most clicks resolve without waiting on the network
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
	});
};
