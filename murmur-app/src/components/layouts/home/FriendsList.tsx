import { useQuery } from "@tanstack/react-query";
import { Flex, Text, UnorderedList } from "@chakra-ui/react";
import { fKey } from "@utils/queryKeys";
import { getFriends } from "@api/handler/account";
import OnlineLabel from "@sections/OnlineLabel";
import FriendsListItem from "@items/FriendsListItem";
import useFriendSocket from "@websocket/useFriendSocket";

function FriendsList() {
	const { data } = useQuery({
		queryKey: [fKey],
		queryFn: () => getFriends().then((res) => res.data),
	});

	useFriendSocket();

	if (!data) return null;

	if (data.length === 0) {
		return (
			<Flex
				justify="center"
				align="center"
				w="full">
				<Text textColor="brandGray.accent">No one here yet</Text>
			</Flex>
		);
	}

	return (
		<UnorderedList
			listStyleType="none"
			ml="0"
			w="full"
			mt="2"
			id="friend-list">
			<OnlineLabel label={`friends — ${data?.length || 0}`} />
			{data.map((f) => (
				<FriendsListItem
					key={f.id}
					friend={f}
				/>
			))}
		</UnorderedList>
	);
}

export default FriendsList;
