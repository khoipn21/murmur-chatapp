import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	LightMode,
	Spacer,
	Tooltip,
	useDisclosure,
	useToast,
	Input,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import InputFields from "@common/InputFields";
import ChangePasswordModal from "@components/modal/ChangePasswordModal";
import { toErrorMap } from "@utils/toErrorMap";
import { userStore } from "@store/userStore";
import { UserSchema } from "@utils/validation/auth.schema";
import { getAccount, updateAccount } from "@api/handler/account";
import { logout } from "@api/handler/auth";
import CropImageModal from "@components/modal/CropImageModal";
import { aKey } from "@utils/querykeys";
import { Account } from "@models/account";

function Settings() {
	const navigate = useNavigate();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: cropperIsOpen,
		onOpen: cropperOnOpen,
		onClose: cropperOnClose,
	} = useDisclosure();

	const { data: user } = useQuery<Account>({
		queryKey: [aKey],
		queryFn: () => getAccount().then((response) => response.data),
	});
	const cache = useQueryClient();

	const logoutUser = userStore((state) => state.logout);
	const setUser = userStore((state) => state.setUser);

	const inputFile: any = useRef(null);
	const [imageUrl, setImageUrl] = useState<string | null>(user?.image ?? null);
	const [cropImage, setCropImage] = useState("");
	const [croppedImage, setCroppedImage] = useState<File | null>(null);

	const closeClicked = (): void => {
		navigate(-1);
	};

	const applyCrop = (file: Blob): void => {
		setImageUrl(URL.createObjectURL(file));
		setCroppedImage(new File([file], "avatar", { type: "image/jpeg" }));
		cropperOnClose();
	};

	const logoutClicked = async (): Promise<void> => {
		const { data } = await logout();
		if (data) {
			cache.clear();
			logoutUser();
			navigate("/", { replace: true });
		}
	};

	if (!user) return null;

	return (
		<Flex
			minHeight="100vh"
			width="full"
			align="center"
			justifyContent="center">
			<Box
				px={4}
				width="full"
				maxWidth="500px">
				<Flex
					mb="4"
					justify="center">
					<Heading fontSize="24px">MY ACCOUNT</Heading>
				</Flex>
				<Box
					p={4}
					borderRadius={4}
					background="brandGray.light">
					<Box>
						<Formik
							initialValues={{
								email: user.email,
								username: user.username,
								image: null,
							}}
							validationSchema={UserSchema}
							onSubmit={async (values, { setErrors }) => {
								try {
									const formData = new FormData();
									formData.append("username", values.username);

									if (croppedImage) {
										formData.append("image", croppedImage);
									}
									const { data } = await updateAccount(formData);
									if (data) {
										setUser(data);
										toast({
											title: "Account Updated.",
											status: "success",
											duration: 3000,
											isClosable: true,
										});
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
							{({ isSubmitting, values }) => (
								<Form>
									<Flex
										mb="4"
										justify="center">
										<Tooltip
											label="Change Avatar"
											aria-label="Change Avatar">
											<Avatar
												size="xl"
												name={user?.username}
												src={imageUrl || user?.image}
												_hover={{
													cursor: "pointer",
													opacity: 0.5,
												}}
												onClick={() => inputFile.current.click()}
											/>
										</Tooltip>
										<input
											type="file"
											name="image"
											accept="image/*"
											ref={inputFile}
											hidden
											onChange={async (e) => {
												if (!e.currentTarget.files) return;
												setCropImage(
													URL.createObjectURL(e.currentTarget.files[0]),
												);
												cropperOnOpen();
											}}
										/>
									</Flex>
									<Box my={4}>
										<Input
											value={values.email}
											type="email"
											placeholder="Email"
											name="email"
											autoComplete="email"
											isReadOnly={true}
										/>

										<InputFields
											value={values.username}
											placeholder="Username"
											label="Username"
											name="username"
											autoComplete="username"
										/>

										<Flex
											my={8}
											align="end">
											<Spacer />
											<Button
												mr={4}
												colorScheme="white"
												variant="outline"
												onClick={closeClicked}
												fontSize="14px">
												Close
											</Button>

											<LightMode>
												<Button
													type="submit"
													colorScheme="green"
													isLoading={isSubmitting}
													fontSize="14px">
													Update
												</Button>
											</LightMode>
										</Flex>
									</Box>
								</Form>
							)}
						</Formik>
					</Box>
					<Divider my="4" />
					<Flex>
						<Heading fontSize="18px">PASSWORD AND AUTHENTICATION</Heading>
					</Flex>
					<Flex mt="4">
						<Button
							background="highlight.standard"
							color="white"
							_hover={{ bg: "highlight.hover" }}
							_active={{ bg: "highlight.active" }}
							_focus={{ boxShadow: "none" }}
							onClick={onOpen}
							fontSize="14px">
							Change Password
						</Button>

						<Spacer />
						<Button
							colorScheme="red"
							variant="outline"
							onClick={logoutClicked}
							fontSize="14px">
							Logout
						</Button>
					</Flex>
				</Box>
			</Box>
			{isOpen && (
				<ChangePasswordModal
					isOpen={isOpen}
					onClose={onClose}
				/>
			)}
			{cropperIsOpen && (
				<CropImageModal
					isOpen={cropperIsOpen}
					onClose={cropperOnClose}
					initialImage={cropImage}
					applyCrop={applyCrop}
				/>
			)}
		</Flex>
	);
}

export default Settings;
