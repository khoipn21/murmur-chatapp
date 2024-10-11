import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0",
		port: 5173,
	},
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "src/components"),
			"@common": path.resolve(__dirname, "src/components/common"),
			"@layouts": path.resolve(__dirname, "src/components/layouts"),
			"@sections": path.resolve(__dirname, "src/components/sections"),
			"@items": path.resolve(__dirname, "src/components/items"),
			"@api": path.resolve(__dirname, "src/lib/api"),
			"@websocket": path.resolve(__dirname, "src/lib/api/ws"),
			"@models": path.resolve(__dirname, "src/lib/models"),
			"@store": path.resolve(__dirname, "src/lib/store"),
			"@utils": path.resolve(__dirname, "src/lib/utils"),
			"@hooks": path.resolve(__dirname, "src/lib/utils/hooks"),
			"@routes": path.resolve(__dirname, "src/routes"),
		},
	},
});
