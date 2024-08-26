import {
	Button,
	LightMode,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { removeFriend } from "@api/handler/account";
import { fKey } from "@utils/queryKeys";
import { Friend } from "@models/friends";

interface IProps {
	member: Friend;
	isOpen: boolean;
	onClose: () => void;
}

function RemoveFriendModal({ member, isOpen, onClose }: IProps) {
	const cache = useQueryClient();

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered>
			<ModalOverlay />

			<ModalContent bg="brandGray.light">
				<ModalHeader
					textTransform="uppercase"
					fontWeight="bold"
					mb={0}
					pb={0}>
					Remove &apos;{member?.username}&apos;
				</ModalHeader>
				<ModalBody>
					<Text mb="4">
						Are you sure you want to permanently remove{" "}
						<b>{member?.username}</b> from your friends?
					</Text>
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
					<LightMode>
						<Button
							colorScheme="red"
							fontSize="14px"
							onClick={async () => {
								onClose();
								try {
									const { data } = await removeFriend(member.id);
									if (data) {
										cache.setQueryData<Friend[]>(
											[fKey],
											(d) => d?.filter((f) => f.id !== member.id) ?? [],
										);
									}
								} catch (err) {}
							}}>
							Remove Friend
						</Button>
					</LightMode>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default RemoveFriendModal;
