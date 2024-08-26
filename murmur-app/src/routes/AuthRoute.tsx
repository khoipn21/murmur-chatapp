import React from "react";
import { Navigate } from "react-router-dom";
import { userStore } from "@store/userStore";

interface IProps {
	children: React.ReactNode;
}

function AuthRoute({ children }: IProps) {
	const storage = JSON.parse(localStorage.getItem("user-storage")!!);
	const current = userStore((state) => state.current);

	if (current || storage?.state?.current) {
		return <>{children}</>;
	}

	return <Navigate to="/login" />;
}

export default AuthRoute;
