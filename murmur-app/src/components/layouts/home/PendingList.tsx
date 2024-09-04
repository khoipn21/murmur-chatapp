import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Flex, UnorderedList, Text } from "@chakra-ui/react";
import { rKey } from "@utils/querykeys";
import { getPendingRequests } from "@api/handler/account";
import OnlineLabel from "@sections/OnlineLabel";
import { homeStore } from "@store/homeStore";
import useRequestSocket from "@websocket/useRequestSocket";
import RequestListItem from "@items/RequestListItem";

function PendingList() {
	const { data } = useQuery({
		queryKey: [rKey],
		queryFn: () => getPendingRequests().then((response) => response.data),
		staleTime: 0,
	});

	useRequestSocket();

	const reset = homeStore((state) => state.resetRequest);

	useEffect(() => {
		reset();
	});

	if (!data) return null;

	if (data.length === 0) {
		return (
			<Flex
				justify="center"
				align="center"
				w="full">
				<Text textColor="brandGray.accent">
					There are no pending friend requests
				</Text>
			</Flex>
		);
	}

	return (
		<UnorderedList
			listStyleType="none"
			ml="0"
			w="full"
			mt="2">
			<OnlineLabel label={`Pending — ${data?.length || 0}`} />
			{data.map((r) => (
				<RequestListItem
					request={r}
					key={r.id}
				/>
			))}
		</UnorderedList>
	);
}

export default PendingList;
