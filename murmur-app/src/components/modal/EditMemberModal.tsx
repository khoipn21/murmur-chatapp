import {
	Button,
	Divider,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColorResult, TwitterPicker } from "react-color";
import InputFields from "@common/InputFields";
import { toErrorMap } from "@utils/toErrorMap";
import { userStore } from "@store/userStore";
import { MemberSchema } from "@utils/validation/member.schema";
import {
	changeGuildMemberSettings,
	getGuildMemberSettings,
} from "@api/handler/member";

interface IProps {
	guildId: string;
	isOpen: boolean;
	onClose: () => void;
}
function EditMemberModal({ guildId, isOpen, onClose }: IProps) {
	const current = userStore((state) => state.current);
	const { data } = useQuery({
		queryKey: ["settings", guildId],
		queryFn: () =>
			getGuildMemberSettings(guildId).then((response) => response.data),
	});
	const [showError, toggleShow] = useState(false);

	if (!data) return null;

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered>
			<ModalOverlay />
			<ModalContent bg="brandGray.light">
				<Formik
					initialValues={{
						color: data.color,
						nickname: data.nickname,
					}}
					validationSchema={MemberSchema}
					onSubmit={async (values, { setErrors, setFieldValue }) => {
						try {
							// Default color --> Reset
							if (values.color === "#fff") setFieldValue("color", null);

							const { data: responseData } = await changeGuildMemberSettings(
								guildId,
								values,
							);
							if (responseData) {
								onClose();
							}
						} catch (err: any) {
							if (err?.response?.status === 500) {
								toggleShow(true);
							}
							if (err?.response?.data?.errors) {
								const errors = err?.response?.data?.errors;
								setErrors(toErrorMap(errors));
							}
						}
					}}>
					{({ isSubmitting, setFieldValue, values }) => (
						<Form>
							<ModalHeader
								fontWeight="bold"
								pb={0}>
								Change Appearance
							</ModalHeader>
							<ModalCloseButton _focus={{ outline: "none" }} />
							<ModalBody>
								<InputFields
									color={values.color ?? undefined}
									label="nickname"
									name="nickname"
									value={values.nickname ?? current?.username}
								/>
								<Text
									mt="2"
									ml="1"
									color="brandGray.accent"
									_hover={{
										cursor: "pointer",
										color: "highlight.standard",
									}}
									fontSize="14px"
									onClick={() => setFieldValue("nickname", null)}>
									Reset Nickname
								</Text>

								<Divider my="4" />

								<TwitterPicker
									color={values.color || "#fff"}
									onChangeComplete={(color: ColorResult) => {
										if (color) setFieldValue("color", color.hex);
									}}
									className="picker"
								/>

								<Text
									mt="2"
									ml="1"
									color="brandGray.accent"
									_hover={{
										cursor: "pointer",
										color: "highlight.standard",
									}}
									fontSize="14px"
									onClick={() => setFieldValue("color", "#fff")}>
									Reset Color
								</Text>

								{showError && (
									<Text
										mt="4"
										color="menuRed"
										align="center">
										Server Error. Try again later
									</Text>
								)}
							</ModalBody>

							<ModalFooter bg="brandGray.dark">
								<Button
									onClick={onClose}
									mr={6}
									variant="link"
									fontSize="14px"
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
									Save
								</Button>
							</ModalFooter>
						</Form>
					)}
				</Formik>
			</ModalContent>
		</Modal>
	);
}

export default EditMemberModal;
