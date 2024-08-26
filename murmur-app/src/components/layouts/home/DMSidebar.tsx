import { GridItem, UnorderedList, Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import AccountBar from "@layouts/AccountBar";
import FriendsListButton from "@sections/FriendsListButton";
import DMListItem from "@items/DMListItem";
import { getUserDMs } from "@api/handler/dm";
import { dmKey } from "@utils/queryKeys";
import useDMSocket from "@websocket/useDMSocket";
import DMPlaceholder from "@sections/DMPlaceholder";

function DMSidebar() {
	const { data } = useQuery({
		queryKey: [dmKey],
		queryFn: () => getUserDMs().then((result) => result.data),
	});
	useDMSocket();

	return (
		<GridItem
			gridColumn="2"
			gridRow="1 / 4"
			bg="brandGray.dark"
			overflowY="hidden"
			_hover={{ overflowY: "auto" }}
			css={{
				"&::-webkit-scrollbar": {
					width: "4px",
				},
				"&::-webkit-scrollbar-track": {
					width: "4px",
				},
				"&::-webkit-scrollbar-thumb": {
					background: "brandGray.darker",
					borderRadius: "18px",
				},
			}}>
			<FriendsListButton />
			<Text
				ml="4"
				textTransform="uppercase"
				fontSize="12px"
				fontWeight="semibold"
				color="brandGray.accent">
				DIRECT MESSAGES
			</Text>
			<UnorderedList
				listStyleType="none"
				ml="0"
				mt="4"
				id="dm-list">
				{data?.map((dm) => (
					<DMListItem
						dm={dm}
						key={dm.id}
					/>
				))}
				{data?.length === 0 && (
					<Box>
						<DMPlaceholder />
						<DMPlaceholder />
						<DMPlaceholder />
						<DMPlaceholder />
						<DMPlaceholder />
					</Box>
				)}
			</UnorderedList>
			<AccountBar />
		</GridItem>
	);
}

export default DMSidebar;
