import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "@routes/Landing";
import Login from "@routes/Login";
import Register from "@routes/Register";
import Home from "./Home";
import Settings from "./Settings";
import ForgotPassword from "@routes/ForgotPassword";
import AuthRoute from "@routes/AuthRoute";

function AppRoutes() {
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
					path="/channels/me"
					element={
						<AuthRoute>
							<Home />
						</AuthRoute>
					}
				/>
				<Route
					path="/channels/me/:channelId"
					element={
						<AuthRoute>
							<Home />
						</AuthRoute>
					}
				/>
				<Route
					path="/account"
					element={
						<AuthRoute>
							<Settings />
						</AuthRoute>
					}
				/>
				{/* <Route
					path="/forgot-password"
					element={<ForgotPassword />}
				/> */}
				{/* <Route 
				path=""/> */}
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
