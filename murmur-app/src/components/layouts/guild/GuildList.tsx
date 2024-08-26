import {
	Box,
	Divider,
	Flex,
	GridItem,
	UnorderedList,
	useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import AddGuildModal from "@components/modal/AddGuildModal";
import GuildListItem from "@items/GuildListItem";
import AddGuildIcon from "@sections/AddGuildIcon";
import HomeIcon from "@sections/HomeIcon";
import { getUserGuilds } from "@api/handler/guild";
import { gKey, nKey } from "@utils/queryKeys";
import useGuildSocket from "@websocket/useGuildSocket";
import { DMNotification } from "@models/dm";
import NotificationListItem from "@items/NotificationListItem";

function GuildList() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { data } = useQuery({
		queryKey: [gKey],
		queryFn: () => getUserGuilds().then((response) => response.data),
		gcTime: Infinity,
	});

	const { data: dmData } = useQuery<DMNotification[]>({
		queryKey: [nKey],
		queryFn: () => [],
		gcTime: Infinity,
	});

	useGuildSocket();
	return (
		<GridItem
			gridColumn={1}
			gridRow="1 / 4"
			bg="brandGray.darker"
			overflowY="auto"
			css={{
				"&::-webkit-scrollbar": {
					width: "0",
				},
			}}
			zIndex={2}>
			<HomeIcon />
			<UnorderedList
				listStyleType="none"
				ml="0"
				id="guild-list">
				{dmData?.map((dm) => (
					<NotificationListItem
						notification={dm}
						key={dm.id}
					/>
				))}
			</UnorderedList>
			<Flex
				direction="column"
				my="2"
				align="center">
				<Divider w="40px" />
			</Flex>
			<UnorderedList
				listStyleType="none"
				ml="0">
				{data?.map((g) => (
					<GuildListItem
						guild={g}
						key={g.id}
					/>
				))}
			</UnorderedList>
			<AddGuildIcon onOpen={onOpen} />
			{isOpen && (
				<AddGuildModal
					isOpen={isOpen}
					onClose={onClose}
				/>
			)}
			<Box h="20px" />
		</GridItem>
	);
}

export default GuildList;
