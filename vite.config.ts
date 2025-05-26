import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		tsconfigPaths(),
		dts({
			insertTypesEntry: true,
			tsconfigPath: "./tsconfig.app.json",
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./lib"),
			"@components": path.resolve(__dirname, "./lib/components"),
			"@hooks": path.resolve(__dirname, "./lib/hooks"),
			"@utils": path.resolve(__dirname, "./lib/utils"),
			"@theme": path.resolve(__dirname, "./lib/theme"),
		},
	},
	build: {
		lib: {
			entry: "./lib/main.ts",
			name: "NktUi",
			fileName: (format) => {
				if (format === "es") return "nkt-ui.js";
				if (format === "umd") return "nkt-ui.umd.cjs";
				return `nkt-ui.${format}.js`;
			},
			formats: ["es", "umd"],
		},
		rollupOptions: {
			external: ["react", "react-dom", "react/jsx-runtime"],
			output: {
				globals: {
					react: "React",
					"react-dom": "reactDOM",
					"react/jsx-runtime": "react/jsx-runtime",
				},
			},
		},
	},
});
