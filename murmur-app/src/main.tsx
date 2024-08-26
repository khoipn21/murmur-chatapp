import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import customTheme from "@utils/theme.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ColorModeScript />
		<ChakraProvider theme={customTheme}>
			<App />
		</ChakraProvider>
	</StrictMode>,
);
