import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./Landing";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

export const AppRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Landing />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/register"
					element={<Register />}
				/>
				<Route
					path="/forgot-password"
					element={<ForgotPassword />}
				/>
			</Routes>
		</BrowserRouter>
	);
};
