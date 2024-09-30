import {
	Avatar,
	AvatarBadge,
	Flex,
	IconButton,
	ListItem,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getOrCreateDirectMessage } from "@api/handler/dm";
import RemoveFriendModal from "@components/modal/RemoveFriendModal";
import { dmKey } from "@utils/querykeys";
import { Friend } from "@models/friends";
import { DMChannel } from "@models/dm";

interface FriendsListItemProp {
	friend: Friend;
}

function FriendsListItem({ friend }: FriendsListItemProp) {
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cache = useQueryClient();

	const getDMChannel = async (): Promise<void> => {
		try {
			const { data } = await getOrCreateDirectMessage(friend.id);
			if (data) {
				cache.setQueryData<DMChannel[]>([dmKey], (d) => {
					const queryData = d ?? [];
					const index = queryData.findIndex((dm) => dm.id === data.id);
					if (index === -1) return [data, ...queryData];
					return queryData;
				});
				navigate(`/channels/me/${data.id}`);
			}
		} catch (err) {}
	};
	return (
		<ListItem
			p="3"
			mx="3"
			_hover={{
				bg: "brandGray.dark",
				borderRadius: "5px",
			}}>
			<Flex
				align="center"
				justify="space-between">
				<Flex
					align="center"
					w="full"
					onClick={getDMChannel}
					_hover={{ cursor: "pointer" }}>
					<Avatar
						size="sm"
						src={friend.image}>
						<AvatarBadge
							boxSize="1.25em"
							bg={friend.isOnline ? "green.500" : "gray.500"}
						/>
					</Avatar>
					<Text ml="2">{friend.username}</Text>
				</Flex>
				<IconButton
					icon={<IoMdClose />}
					borderRadius="50%"
					aria-label="remove friend"
					onClick={(e) => {
						e.preventDefault();
						onOpen();
					}}
				/>
			</Flex>
			{isOpen && (
				<RemoveFriendModal
					member={friend}
					isOpen
					onClose={onClose}
				/>
			)}
		</ListItem>
	);
}

export default FriendsListItem;
