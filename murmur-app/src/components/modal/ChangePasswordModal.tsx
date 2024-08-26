import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { toErrorMap } from "@utils/toErrorMap";
import { ChangePasswordSchema } from "@utils/validation/auth.schema";
import InputFields from "@common/InputFields";
import { changePassword } from "@api/handler/auth";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
}

function ChangePasswordModal({ isOpen, onClose }: IProps) {
	const toast = useToast();

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered>
			<ModalOverlay />

			<ModalContent bg="brandGray.light">
				<Formik
					initialValues={{
						currentPassword: "",
						newPassword: "",
						confirmNewPassword: "",
					}}
					validationSchema={ChangePasswordSchema}
					onSubmit={async (values, { setErrors }) => {
						try {
							const { data } = await changePassword(values);
							if (data) {
								toast({
									title: "Changed Password",
									status: "success",
									duration: 5000,
									isClosable: true,
								});
								onClose();
							}
						} catch (err: any) {
							if (err?.response?.status === 500) {
								toast({
									title: "Server Error",
									description: "Try again later",
									status: "error",
									duration: 3000,
									isClosable: true,
								});
							}
							if (err?.response?.data?.errors) {
								const errors = err?.response?.data?.errors;
								setErrors(toErrorMap(errors));
							}
						}
					}}>
					{({ isSubmitting }) => (
						<Form>
							<ModalHeader
								textAlign="center"
								fontWeight="bold">
								Change your password
							</ModalHeader>
							<ModalCloseButton _focus={{ outline: "none" }} />
							<ModalBody pb={6}>
								<Text>Enter your current password and a new password</Text>
								<InputFields
									label="current password"
									name="currentPassword"
									autoComplete="password"
									type="password"
								/>

								<InputFields
									label="new password"
									name="newPassword"
									autoComplete="password"
									type="password"
								/>

								<InputFields
									label="confirm new password"
									name="confirmNewPassword"
									autoComplete="password"
									type="password"
								/>
							</ModalBody>

							<ModalFooter bg="brandGray.dark">
								<Button
									onClick={onClose}
									fontSize="14px"
									mr={6}
									variant="link"
									_focus={{ outline: "none" }}>
									Cancel
								</Button>
								<Button
									background="highlight.standard"
									color="white"
									type="submit"
									_hover={{ bg: "highlight.hover" }}
									_active={{ bg: "highlight.active" }}
									_focus={{ boxShadow: "none" }}
									isLoading={isSubmitting}
									fontSize="14px">
									Done
								</Button>
							</ModalFooter>
						</Form>
					)}
				</Formik>
			</ModalContent>
		</Modal>
	);
}

export default ChangePasswordModal;
