import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Link,
	Text,
} from "@chakra-ui/react";

import { Form, Formik } from "formik";
import InputFields from "@common/InputFields";
import { LoginSchema } from "@utils/validation/auth.schema";
import { Link as RLink, useNavigate } from "react-router-dom";
import { toErrorMap } from "@utils/toErrorMap";
import { userStore } from "@store/userStore";
import { login } from "@api/handler/auth";

// const mockLogin = async (values: { email: string; password: string }) => {
// 	console.log("Mock login called with values:", values);
// 	return { data: { user: "mockUser" } }; // Mock response
// };

function Login() {
	const navigate = useNavigate();
	const setUser = userStore((state) => state.setUser);

	return (
		<Flex
			minHeight="100vh"
			width="full"
			align="center"
			justifyContent="center">
			<Box
				px={4}
				width="full"
				maxWidth="500px"
				textAlign="center">
				<Flex
					mb="4"
					justify="center">
					<Image
						src="/logo/Darkmode.png"
						w="80px"
					/>
				</Flex>
				<Box
					p={4}
					borderRadius={4}
					background="brandGray.light">
					<Box textAlign="center">
						<Heading fontSize="24px">Welcome Back</Heading>
					</Box>
					<Box
						my={4}
						textAlign="left">
						<Formik
							initialValues={{
								email: "",
								password: "",
							}}
							validationSchema={LoginSchema}
							onSubmit={async (values, { setErrors }) => {
								try {
									const { data } = await login(values);
									if (data) {
										setUser(data);
										navigate("/channels/me");
									}
								} catch (err: any) {
									if (err?.response?.status === 401) {
										if (err?.response?.data?.isVerified === false) {
											navigate("/verify-email");
										} else {
											setErrors({ password: "Invalid Credentials" });
										}
									}
									if (err?.response?.data?.errors) {
										const errors = err?.response?.data?.errors;
										setErrors(toErrorMap(errors));
									}
								}
							}}>
							<Form>
								<InputFields
									label="Email"
									name="email"
									autoComplete="email"
									type="email"
								/>

								<InputFields
									label="password"
									name="password"
									autoComplete="password"
									type="password"
								/>

								<Box mt={4}>
									<Link
										as={RLink}
										to="/forgot-password"
										textColor="highlight.standard"
										_focus={{ outline: "none" }}>
										Forgot Password?
									</Link>
								</Box>

								<Button
									background="highlight.standard"
									color="white"
									width="full"
									mt={4}
									type="submit"
									_hover={{ bg: "highlight.hover" }}
									_active={{ bg: "highlight.active" }}
									_focus={{ boxShadow: "none" }}>
									Login
								</Button>
								<Text mt="4">
									Don&apos;t have an account yet?{" "}
									<Link
										as={RLink}
										to="/register"
										textColor="highlight.standard"
										_focus={{ outline: "none" }}>
										Sign Up
									</Link>
								</Text>
							</Form>
						</Formik>
					</Box>
				</Box>
			</Box>
		</Flex>
	);
}

export default Login;
