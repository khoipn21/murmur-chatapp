import { Box, Flex, Heading, Image, Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { ResendVerificationSchema } from "@utils/validation/auth.schema";
import { verifyEmail } from "@api/handler/auth";
import { toErrorMap } from "@utils/toErrorMap";
import InputFields from "@common/InputFields";

// const mockForgotPassword = async (email: string) => {
// 	console.log("Mock forgotPassword called with email:", email);
// 	return { data: { message: "Mock reset email sent" } }; // Mock response
// };
function VerifyEmail() {
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
						<Heading fontSize="24px">Resend Verification</Heading>
					</Box>
					<Box
						my={4}
						textAlign="left">
						<Formik
							initialValues={{ email: "" }}
							validationSchema={ResendVerificationSchema}
							onSubmit={async (values, { setErrors }) => {
								try {
									const { data } = await verifyEmail(values.email);
									if (data) {
										toast({
											title: "Reset Mail.",
											description:
												"If an account with that email already exists, we sent you an email",
											status: "success",
											duration: 5000,
											isClosable: true,
										});
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
								</Form>
							)}
						</Formik>
					</Box>
				</Box>
			</Box>
		</Flex>
	);
}

export default VerifyEmail;
