import { Box, Button, Flex, Heading, Image, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate, Link as RLink } from "react-router-dom";
import InputFields from "@common/InputFields";
import { toErrorMap } from "@utils/toErrorMap";
import { ForgotPasswordSchema } from "@utils/validation/auth.schema";
import { forgotPassword } from "@api/handler/auth";

// const mockForgotPassword = async (email: string) => {
// 	console.log("Mock forgotPassword called with email:", email);
// 	return { data: { message: "Mock reset email sent" } }; // Mock response
// };
function ForgotPassword() {
	const navigate = useNavigate();
	const toast = useToast();

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
						src={"/logo/Darkmode.png"}
						w="80px"
					/>
				</Flex>
				<Box
					p={4}
					borderRadius={4}
					background="brandGray.light">
					<Box textAlign="center">
						<Heading fontSize="24px">Forgot Password</Heading>
					</Box>
					<Box
						my={4}
						textAlign="left">
						<Formik
							initialValues={{ email: "" }}
							validationSchema={ForgotPasswordSchema}
							onSubmit={async (values, { setErrors }) => {
								try {
									const { data } = await forgotPassword(values.email);
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
									}
								} catch (err: any) {
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

									<Button
										background="highlight.standard"
										color="white"
										width="full"
										mt={4}
										type="submit"
										isLoading={isSubmitting}
										_hover={{ bg: "highlight.hover" }}
										_active={{ bg: "highlight.active" }}
										_focus={{ boxShadow: "none" }}
										fontSize="14px">
										Send Mail
									</Button>

									<Button
										as={RLink}
										to="/login"
										variant="link"
										color="highlight.standard"
										width="full"
										mt={4}
										_hover={{ textDecoration: "underline" }}
										_focus={{ boxShadow: "none" }}
										fontSize="14px">
										Back to Login
									</Button>
								</Form>
							)}
						</Formik>
					</Box>
				</Box>
			</Box>
		</Flex>
	);
}

export default ForgotPassword;
