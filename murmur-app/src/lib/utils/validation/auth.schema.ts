import * as yup from "yup";

export const LoginSchema = yup.object().shape({
	email: yup.string().required("Email is required").defined(),
	password: yup.string().required("Password is required").defined(),
});

export const RegisterSchema = yup.object().shape({
	username: yup
		.string()
		.min(3)
		.max(30)
		.trim()
		.required("Username is required")
		.defined(),
	email: yup
		.string()
		.email()
		.lowercase()
		.required("Email is required")
		.defined(),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters long")
		.max(150)
		.matches(/[A-Za-z]/, "Password must contain at least one alphabet")
		.matches(/[0-9]/, "Password must contain at least one number")
		.required("Password is required")
		.defined(),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), undefined], "Passwords must match")
		.required("Confirm Password is required")
		.defined(),
});

export const UserSchema = yup.object().shape({
	email: yup
		.string()
		.email()
		.lowercase()
		.required("Email is required")
		.defined(),
	username: yup
		.string()
		.min(3)
		.max(30)
		.trim()
		.required("Username is required")
		.defined(),
});

export const ResetPasswordSchema = yup.object().shape({
	newPassword: yup
		.string()
		.min(6, "Password must be at least 6 characters long")
		.max(150)
		.required("New Password is required")
		.defined(),
	confirmNewPassword: yup
		.string()
		.oneOf([yup.ref("newPassword"), undefined], "Passwords do not match")
		.required("Confirm New Password is required")
		.defined(),
});

export const ChangePasswordSchema = yup.object().shape({
	currentPassword: yup.string().required("Old Password is required").defined(),
	newPassword: yup
		.string()
		.min(6, "Password must be at least 6 characters long")
		.max(150)
		.required("New Password is required")
		.defined(),
	confirmNewPassword: yup
		.string()
		.oneOf([yup.ref("newPassword"), undefined], "Passwords do not match")
		.required("Confirm New Password is required")
		.defined(),
});

export const ForgotPasswordSchema = yup.object().shape({
	email: yup
		.string()
		.email()
		.lowercase()
		.required("Email is required")
		.defined(),
});

export const ResendVerificationSchema = yup.object().shape({
	email: yup
		.string()
		.email()
		.lowercase()
		.required("Email is required")
		.defined(),
});
