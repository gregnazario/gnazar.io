import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { fileURLToPath, URL } from "node:url";

import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	plugins: [
		netlify(),
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tanstackStart(),
		viteReact(),
	],
});
