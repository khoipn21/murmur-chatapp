import { defineConfig } from "cypress";

export default defineConfig({
	video: false,
	screenshotOnRunFailure: false,
	retries: 2,
	e2e: {
		baseUrl: "http://localhost:5173",
	},
	defaultCommandTimeout: 8000,
	env: {
		MAILSLURP_API_KEY:
			"e109a1009ef56239b957794c746594baede0cefac9548c6432f688c37d9b0ba3",
	},
});
