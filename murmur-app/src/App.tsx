import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/Routes";

const client = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: Infinity,
			// cacheTime: 0,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={client}>
			<AppRoutes />
		</QueryClientProvider>
	);
}

export default App;
