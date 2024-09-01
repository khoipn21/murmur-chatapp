import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Settings from "./Settings";
import ForgotPassword from "./ForgotPassword";
import AuthRoute from "./AuthRoute";
import GuildView from "./GuildView";
import Invite from "./Invite";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./VerifyEmail";
import VerifiedWithToken from "./VerifiedWithToken";

function AppRoutes() {
	return (
		<Router>
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
				<Route
					path="/channels/:guildId/:channelId"
					element={
						<AuthRoute>
							<GuildView />
						</AuthRoute>
					}
				/>
				<Route
					path="/:link"
					element={
						<AuthRoute>
							<Invite />
						</AuthRoute>
					}
				/>
				<Route
					path="/reset-password/:token"
					element={<ResetPassword />}
				/>
				<Route
					path="/forgot-password"
					element={<ForgotPassword />}
				/>
				<Route
					path="/verify-email"
					element={<VerifyEmail />} // New route
				/>
				<Route
					path="/verification/:token"
					element={<VerifiedWithToken />}
				/>
			</Routes>
		</Router>
	);
}

export default AppRoutes;
