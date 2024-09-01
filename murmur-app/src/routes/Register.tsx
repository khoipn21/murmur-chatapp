import { useState } from "react";
import { Formik, Form } from "formik";
import InputFields from "@common/InputFields";
import { RegisterSchema } from "@utils/validation/auth.schema";
import { Link as RLink, useNavigate } from "react-router-dom";
import { toErrorMap } from "@utils/toErrorMap";
// import { userStore } from "@store/userStore";
import { register } from "@api/handler/auth";
import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Link,
	Text,
	useToast,
} from "@chakra-ui/react";

// const mockRegister = async (values: {
// 	email: string;
// 	username: string;
// 	password: string;
// }) => {
// 	console.log("Mock register called with values:", values);
// 	return { data: { user: "mockUser" } }; // Mock response
// };

function Register() {
	const navigate = useNavigate();
	const toast = useToast();
	// const setUser = userStore((state) => state.setUser);
	const [error, showError] = useState(false);
	const [registrationComplete, setRegistrationComplete] = useState(false);
	console.log(import.meta.env.VITE_APP_API);
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
					{registrationComplete ? (
						<Box textAlign="center">
							<Heading fontSize="24px">Registration Successful</Heading>
							<Text mt={4}>
								A verification email has been sent to your email address. Please
								check your inbox and click the verification link to activate
								your account.
							</Text>
						</Box>
					) : (
						<Box textAlign="center">
							<Heading fontSize="24px">Welcome to Murmur</Heading>
						</Box>
					)}
					<Box
						my={4}
						textAlign="left">
						<Formik
							initialValues={{
								email: "",
								username: "",
								password: "",
							}}
							validationSchema={RegisterSchema}
							onSubmit={async (values, { setErrors }) => {
								try {
									const { data } = await register(values);
									if (data) {
										toast({
											title: "Reset Mail.",
											description:
												"If an account with that email already exists, we sent you an email",
											status: "success",
											duration: 5000,
											isClosable: true,
										});
										navigate("/");
										setRegistrationComplete(true);
									}
								} catch (err: any) {
									if (err?.response?.status === 500) {
										showError(true);
									}
									if (err?.response?.data?.errors) {
										const errors = err?.response?.data?.errors;
										setErrors(toErrorMap(errors));
									}
								}
							}}>
							{({ isSubmitting }) => (
								<Form>
									<InputFields
										label="Email"
										name="email"
										autoComplete="email"
										type="email"
									/>

									<InputFields
										label="username"
										name="username"
									/>

									<InputFields
										label="password"
										name="password"
										autoComplete="password"
										type="password"
									/>
									<InputFields
										label="Confirm Password"
										name="confirmPassword"
										autoComplete="confirm-password"
										type="password"
									/>
									<Button
										background="highlight.standard"
										color="white"
										width="full"
										mt={4}
										type="submit"
										isLoading={isSubmitting}
										_hover={{ bg: "highlight.hover" }}
										_active={{ bg: "highlight.active" }}
										_focus={{ boxShadow: "none" }}>
										Register
									</Button>
									{error && (
										<Text
											mt="4"
											color="menuRed"
											align="center">
											Server Error. Try again later
										</Text>
									)}
									<Text mt="4">
										Already have an account?{" "}
										<Link
											as={RLink}
											to="/login"
											textColor="highlight.standard"
											_focus={{ outline: "none" }}>
											Sign In
										</Link>
									</Text>
								</Form>
							)}
						</Formik>
					</Box>
				</Box>
			</Box>
		</Flex>
	);
}

export default Register;
