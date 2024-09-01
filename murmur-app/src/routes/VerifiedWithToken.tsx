import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Link,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RLink, useNavigate, useParams } from "react-router-dom";
import { userStore } from "@store/userStore";
import { verificationWithToken } from "@api/handler/auth";

type TokenProps = {
	token: string;
};

function VerifiedWithToken() {
	const navigate = useNavigate();
	const { token } = useParams<keyof TokenProps>() as TokenProps;
	const [showError, setShowError] = useState(false);
	const [tokenError, setTokenError] = useState("");
	const setUser = userStore((state) => state.setUser);
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		const verifyToken = async () => {
			try {
				const { data } = await verificationWithToken({ token });
				if (data) {
					onOpen();
				}
			} catch (err: any) {
				if (err?.response?.status === 500) {
					setShowError(true);
				} else {
					const errorMessage = err?.response?.data?.message;
					setTokenError(errorMessage || "Invalid or expired token.");
				}
			}
		};

		verifyToken();
	}, [token, setUser]);

	const handleContinue = () => {
		onClose();
		navigate("/");
	};

	return (
		<Flex
			minHeight="100vh"
			width="full"
			align="center"
			justifyContent="center">
			<Modal
				isOpen={isOpen}
				onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Verification Complete</ModalHeader>
					<ModalBody>Your email has been successfully verified.</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={handleContinue}>
							Continue
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			{(showError || tokenError) && !isOpen && (
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
							<Heading fontSize="24px">Email Verification</Heading>
						</Box>
						<Box
							my={4}
							textAlign="center">
							{showError && (
								<Text
									mt="4"
									color="menuRed"
									align="center">
									Server Error. Try again later
								</Text>
							)}
							{tokenError && (
								<Flex
									direction="column"
									mt="4"
									justify="center"
									align="center">
									<Text color="menuRed">{tokenError}</Text>
									<Link
										as={RLink}
										to="/verify-email"
										_focus={{ outline: "none" }}>
										Click here to get a new token
									</Link>
								</Flex>
							)}
						</Box>
					</Box>
				</Box>
			)}
		</Flex>
	);
}

export default VerifiedWithToken;
