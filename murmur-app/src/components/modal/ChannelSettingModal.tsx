import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	LightMode,
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
import { Form, Formik } from "formik";
import { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useQuery } from "@tanstack/react-query";
import InputFields from "@common/InputFields";
import { toErrorMap } from "@utils/toErrorMap";
import { getGuildMembers } from "@api/handler/guild";
import { ChannelSchema } from "@utils/validation/channel.schema";
import { useGetCurrentChannel } from "@hooks/useGetCurrentChannel";
import { mKey } from "@utils/queryKeys";
import {
	deleteChannel,
	editChannel,
	getPrivateChannelMembers,
} from "@api/handler/channel";

interface IProps {
	guildId: string;
	channelId: string;
	isOpen: boolean;
	onClose: () => void;
}

interface Item {
	// eslint-disable-next-line react/no-unused-prop-types
	value: string;
	label: string;
	image: string;
}

enum ChannelScreen {
	START,
	CONFIRM,
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

function ChannelSettingModal({ guildId, channelId, isOpen, onClose }: IProps) {
	const key = [mKey, guildId];
	const { data } = useQuery({
		queryKey: key,
		queryFn: () => getGuildMembers(guildId).then((response) => response.data),
	});

	const channel = useGetCurrentChannel(channelId, guildId);

	const members: Item[] = [];
	const [selectedItems, setSelectedItems] = useState<Item[]>([]);
	const [screen, setScreen] = useState(ChannelScreen.START);
	const [showError, toggleShow] = useState(false);

	const goBack = (): void => setScreen(ChannelScreen.START);
	const submitClose = (): void => {
		setScreen(ChannelScreen.START);
		onClose();
	};

	data?.map((m) =>
		members.push({
			label: m.username,
			value: m.id,
			image: m.image,
		}),
	);

	// eslint-disable-next-line
	const { data: _ } = useQuery<Item[]>({
		queryKey: ["pcmembers", channelId],
		queryFn: async () => {
			const { data: memberData } = await getPrivateChannelMembers(channelId);
			const current = members.filter((m) => memberData.includes(m.value));
			setSelectedItems(current);
			return current;
		},
	});

	const handleCreateItem = (item: Item): void => {
		setSelectedItems((curr) => [...curr, item]);
	};

	const handleSelectedItemsChange = (changedItems?: Item[]): void => {
		if (changedItems) {
			setSelectedItems(changedItems);
		}
	};

	if (!channel) return null;
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered>
			<ModalOverlay />
			{screen === ChannelScreen.START && (
				<ModalContent bg="brandGray.light">
					<Formik
						initialValues={{
							name: channel.name,
							isPublic: channel.isPublic,
						}}
						validationSchema={ChannelSchema}
						onSubmit={async (values, { setErrors, resetForm }) => {
							try {
								const ids: string[] = [];
								selectedItems.map((i) => ids.push(i.value));
								const { data: responseData } = await editChannel(channelId, {
									...values,
									members: ids,
								});
								if (responseData) {
									resetForm();
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
									textAlign="center"
									fontWeight="bold">
									Channel Settings
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
										<FormLabel mb="0">
											<Flex align="center">
												<AiOutlineLock />
												<Text ml="2">Private Channel</Text>
											</Flex>
										</FormLabel>
										<Switch
											defaultChecked={!values.isPublic}
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

									<Divider my="2" />

									<LightMode>
										<Button
											onClick={() => setScreen(ChannelScreen.CONFIRM)}
											colorScheme="red"
											variant="ghost"
											fontSize="14px"
											rightIcon={<FaRegTrashAlt />}>
											Delete Channel
										</Button>
									</LightMode>

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
										Save Changes
									</Button>
								</ModalFooter>
							</Form>
						)}
					</Formik>
				</ModalContent>
			)}
			{screen === ChannelScreen.CONFIRM && (
				<DeleteChannelModal
					goBack={goBack}
					submitClose={submitClose}
					name={channel.name}
					channelId={channel.id}
				/>
			)}
		</Modal>
	);
}

interface IDeleteScreenProps {
	goBack: () => void;
	submitClose: () => void;
	name: string;
	channelId: string;
}

function DeleteChannelModal({
	goBack,
	submitClose,
	name,
	channelId,
}: IDeleteScreenProps) {
	const [showError, toggleShow] = useState(false);
	const handleDelete = async (): Promise<void> => {
		try {
			const { data } = await deleteChannel(channelId);
			if (data) {
				submitClose();
			}
		} catch (err) {
			toggleShow(true);
		}
	};
	return (
		<ModalContent bg="brandGray.light">
			<ModalHeader
				fontWeight="bold"
				pb="0">
				Delete Channel
			</ModalHeader>
			<ModalBody pb={3}>
				<Text>
					Are you sure you want to delete #{name}? This cannot be undone.
				</Text>

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
					mr={6}
					variant="link"
					onClick={goBack}
					fontSize="14px"
					_focus={{ outline: "none" }}>
					Cancel
				</Button>
				<LightMode>
					<Button
						colorScheme="red"
						fontSize="14px"
						onClick={() => handleDelete()}>
						Delete Channel
					</Button>
				</LightMode>
			</ModalFooter>
		</ModalContent>
	);
}

export default ChannelSettingModal;
