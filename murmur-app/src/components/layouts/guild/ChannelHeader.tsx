import { Flex, GridItem, Icon, Text } from "@chakra-ui/react";
import { FaHashtag } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { settingsStore } from "@store/settingsStore";
import { useGetCurrentChannel } from "@hooks/useGetCurrentChannel";
import { RouterProps } from "@models/routerProps";

function ChannelHeader() {
	const toggleMemberList = settingsStore((state) => state.toggleShowMembers);
	const { guildId, channelId } = useParams<keyof RouterProps>() as RouterProps;
	const channel = useGetCurrentChannel(channelId, guildId);

	return (
		<GridItem
			gridColumn={3}
			gridRow={1}
			bg="brandGray.light"
			padding="10px"
			zIndex={2}
			boxShadow="md">
			<Flex
				align="center"
				justify="space-between">
				<Flex align="center">
					<FaHashtag />
					<Text
						ml="2"
						fontWeight="semibold">
						{channel?.name}
					</Text>
				</Flex>
				<Icon
					as={BsPeopleFill}
					fontSize="20px"
					mr="2"
					_hover={{ cursor: "pointer" }}
					onClick={toggleMemberList}
					aria-label="toggle member list"
				/>
			</Flex>
		</GridItem>
	);
}

export default ChannelHeader;
