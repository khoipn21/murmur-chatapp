import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./Landing";

export const AppRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Landing />}
				/>
			</Routes>
		</BrowserRouter>
	);
};
