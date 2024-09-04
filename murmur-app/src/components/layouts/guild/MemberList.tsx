import { GridItem, UnorderedList } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MemberListItem from "@items/MemberListItem";
import { getGuildMembers } from "@api/handler/guild";
import { mKey } from "@utils/querykeys";
import { useMemberSocket } from "@websocket/useMemberSocket";
import OnlineLabel from "@sections/OnlineLabel";
import { RouterProps } from "@models/routerProps";
import { Member } from "@models/member";

function MemberList() {
	const { guildId } = useParams<keyof RouterProps>() as RouterProps;
	const key = [mKey, guildId];

	const { data } = useQuery({
		queryKey: key,
		queryFn: () => getGuildMembers(guildId).then((response) => response.data),
	});

	const online: Member[] = [];
	const offline: Member[] = [];

	if (data) {
		data.forEach((m) => {
			if (m.isOnline) {
				online.push(m);
			} else {
				offline.push(m);
			}
		});
	}

	useMemberSocket(guildId);

	return (
		<GridItem
			gridColumn={4}
			gridRow="1 / 4"
			bg="memberList"
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
			<UnorderedList
				listStyleType="none"
				ml="0"
				id="member-list">
				<OnlineLabel label={`online—${online.length}`} />
				{online.map((m) => (
					<MemberListItem
						key={`${m.id}`}
						member={m}
					/>
				))}
				<OnlineLabel label={`offline—${offline.length}`} />
				{offline.map((m) => (
					<MemberListItem
						key={`${m.id}`}
						member={m}
					/>
				))}
			</UnorderedList>
		</GridItem>
	);
}

export default MemberList;
