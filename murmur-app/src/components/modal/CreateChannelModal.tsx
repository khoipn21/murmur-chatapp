import {
	Avatar,
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Switch,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { AiOutlineLock } from "react-icons/ai";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useNavigate } from "react-router-dom";
import InputFields from "@common/InputFields";
import { toErrorMap } from "@utils/toErrorMap";
import { getGuildMembers } from "@api/handler/guild";
import { ChannelSchema } from "@utils/validation/channel.schema";
import { mKey } from "@utils/querykeys";
import { createChannel } from "@api/handler/channel";

interface IProps {
	guildId: string;
	isOpen: boolean;
	onClose: () => void;
}

interface Item {
	value: string;
	label: string;
	image: string;
}

function ListItem({ image, label }: Item) {
	return (
		<Flex align="center">
			<Avatar
				mr={2}
				size="sm"
				src={image}
			/>
			<Text textColor="#000">{label}</Text>
		</Flex>
	);
}

function CreateChannelModal({ guildId, isOpen, onClose }: IProps) {
	const key = [mKey, guildId];
	const navigate = useNavigate();
	const { data } = useQuery({
		queryKey: key,
		queryFn: () => getGuildMembers(guildId).then((response) => response.data),
	});
	const [showError, toggleError] = useState(false);

	const members: Item[] = [];
	const [selectedItems, setSelectedItems] = useState<Item[]>([]);

	data?.map((m) =>
		members.push({
			label: m.username,
			value: m.id,
			image: m.image,
		}),
	);

	const handleCreateItem = (item: Item): void => {
		setSelectedItems((curr) => [...curr, item]);
	};

	const handleSelectedItemsChange = (changedItems?: Item[]): void => {
		if (changedItems) {
			setSelectedItems(changedItems);
		}
	};
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered>
			<ModalOverlay />
			<ModalContent bg="brandGray.light">
				<Formik
					initialValues={{
						name: "",
						isPublic: true,
					}}
					validationSchema={ChannelSchema}
					onSubmit={async (values, { setErrors, resetForm }) => {
						try {
							const ids: string[] = [];
							selectedItems.map((i) => ids.push(i.value));
							const { data: responseData } = await createChannel(guildId, {
								...values,
								members: ids,
							});
							if (responseData) {
								resetForm();
								onClose();
								navigate(`/channels/${guildId}/${responseData.id}`);
							}
						} catch (err: any) {
							if (err?.response?.status === 500) {
								toggleError(true);
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
								textAlign="center"
								fontWeight="bold">
								Create Text Channel
							</ModalHeader>
							<ModalCloseButton _focus={{ outline: "none" }} />
							<ModalBody>
								<InputFields
									label="channel name"
									name="name"
								/>

								<FormControl
									display="flex"
									alignItems="center"
									justifyContent="space-between"
									mt="4">
									<FormLabel
										htmlFor="email-alerts"
										mb="0">
										<Flex align="center">
											<AiOutlineLock />
											<Text ml="2">Private Channel</Text>
										</Flex>
									</FormLabel>
									<Switch
										onChange={(e) => {
											setFieldValue("isPublic", !e.target.checked);
										}}
									/>
								</FormControl>
								<Text
									mt="4"
									fontSize="14px"
									textColor="brandGray.accent">
									By making a channel private, only selected members will be
									able to view this channel
								</Text>
								{!values.isPublic && (
									<Box
										mt="2"
										pb={0}>
										<CUIAutoComplete
											label="Who can access this channel"
											placeholder=""
											onCreateItem={handleCreateItem}
											items={members}
											selectedItems={selectedItems}
											itemRenderer={ListItem}
											onSelectedItemsChange={(changes) =>
												handleSelectedItemsChange(changes.selectedItems)
											}
										/>
									</Box>
								)}

								{showError && (
									<Text
										my="2"
										color="menuRed"
										align="center">
										Server Error. Try again later
									</Text>
								)}
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
									fontSize="14px"
									_hover={{ bg: "highlight.hover" }}
									_active={{ bg: "highlight.active" }}
									_focus={{ boxShadow: "none" }}
									isLoading={isSubmitting}>
									Create Channel
								</Button>
							</ModalFooter>
						</Form>
					)}
				</Formik>
			</ModalContent>
		</Modal>
	);
}

export default CreateChannelModal;
