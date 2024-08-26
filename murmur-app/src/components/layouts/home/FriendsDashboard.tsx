
import { GridItem } from "@chakra-ui/react";
import FriendsList from "./FriendsList";
import FriendsListHeader from "./FriendsListHeader";
import PendingList from "./PendingList";
import { homeStore } from "@store/homeStore";
import { scrollbarCss } from "@utils/theme";

function FriendsDashboard() {
	const isPending = homeStore((state) => state.isPending);

	return (
		<>
			<FriendsListHeader />
			<GridItem
				gridColumn={3}
				gridRow="2"
				bg="brandGray.light"
				mr="5px"
				display="flex"
				overflowY="auto"
				css={scrollbarCss}>
				{isPending ? <PendingList /> : <FriendsList />}
			</GridItem>
		</>
	);
}

export default FriendsDashboard;
