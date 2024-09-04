import { Box, GridItem, UnorderedList, useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AccountBar from "@layouts/AccountBar";
import CreateChannelModal from "@components/modal/CreateChannelModal";
import GuildMenu from "@components/menu/GuildMenu";
import InviteModal from "@components/modal/InviteModal";
import ChannelListItem from "@items/ChannelListItem";
import { cKey } from "@utils/querykeys";
import { useChannelSocket } from "@websocket/useChannelSocket";
import { getChannels } from "@api/handler/channel";
import { RouterProps } from "@models/routerProps";
import VoiceChat from "./VoiceChat";
import VoiceBar from "./VoiceBar";

function Channels() {
	const {
		isOpen: inviteIsOpen,
		onOpen: inviteOpen,
		onClose: inviteClose,
	} = useDisclosure();
	const {
		isOpen: channelIsOpen,
		onOpen: channelOpen,
		onClose: channelClose,
	} = useDisclosure();

	const { guildId } = useParams<keyof RouterProps>() as RouterProps;

	const { data } = useQuery({
		queryKey: [cKey, guildId],
		queryFn: () => getChannels(guildId).then((response) => response.data),
	});

	useChannelSocket(guildId);
	return (
		<>
			<GuildMenu
				channelOpen={channelOpen}
				inviteOpen={inviteOpen}
			/>
			<GridItem
				gridColumn={2}
				gridRow="2/4"
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
				{inviteIsOpen && (
					<InviteModal
						isOpen={inviteIsOpen}
						onClose={inviteClose}
					/>
				)}
				{channelIsOpen && (
					<CreateChannelModal
						guildId={guildId}
						onClose={channelClose}
						isOpen={channelIsOpen}
					/>
				)}
				<UnorderedList
					listStyleType="none"
					ml="0"
					mt="4">
					{data?.map((c) => (
						<ChannelListItem
							channel={c}
							guildId={guildId}
							key={`${c.id}`}
						/>
					))}
					<VoiceChat />
					<Box h="16" />
				</UnorderedList>
				<VoiceBar />
				<AccountBar />
			</GridItem>
		</>
	);
}

export default Channels;
