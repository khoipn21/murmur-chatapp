import { useEffect, useState } from "react";
import { Flex, Icon, ListItem, Text, useDisclosure } from "@chakra-ui/react";
import { FaHashtag, FaUserLock } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { userStore } from "@store/userStore";
import ChannelSettingModal from "@components/modal/ChannelSettingModal";
import { useGetCurrentGuild } from "@hooks/useGetCurrentGuild";
import { ChannelNotificationIndicator } from "@common/GuildPills";
import { cKey } from "@utils/querykeys";
import { Channel } from "@models/channel";

interface ChannelListItemProps {
	channel: Channel;
	guildId: string;
}
function ChannelListItem({ channel, guildId }: ChannelListItemProps) {
	const currentPath = `/channels/${guildId}/${channel.id}`;
	const location = useLocation();
	const isActive = location.pathname === currentPath;
	const [showSettings, setShowSettings] = useState(false);

	const current = userStore((state) => state.current);
	const guild = useGetCurrentGuild(guildId);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const cache = useQueryClient();

	useEffect(() => {
		if (channel.hasNotification && isActive) {
			cache.setQueryData<Channel[]>([cKey, guildId], (d) => {
				if (!d) return [];
				return d.map((c) =>
					c.id === channel.id ? { ...c, hasNotification: false } : c,
				);
			});
		}
	});
	return (
		<Link to={currentPath}>
			<ListItem
				p="5px"
				m="0 10px"
				color={
					isActive || channel.hasNotification ? "#fff" : "brandGray.accent"
				}
				_hover={{
					bg: "brandGray.light",
					borderRadius: "5px",
					cursor: "pointer",
					color: "#fff",
				}}
				bg={isActive ? "brandGray.active" : undefined}
				mb="2px"
				position="relative"
				onMouseLeave={() => setShowSettings(false)}
				onMouseEnter={() => setShowSettings(true)}>
				{channel.hasNotification && <ChannelNotificationIndicator />}
				<Flex
					align="center"
					justify="space-between">
					<Flex
						align="center"
						textOverflow="ellipsis"
						maxW="80%">
						<Icon
							as={channel.isPublic ? FaHashtag : FaUserLock}
							color="brandGray.accent"
						/>
						<Text
							ml="2"
							noOfLines={1}>
							{channel.name}
						</Text>
					</Flex>
					{current?.id === guild?.ownerId && (showSettings || isOpen) && (
						<>
							<Icon
								aria-label="edit channel"
								as={MdSettings}
								color="brandGray.accent"
								fontSize="12px"
								_hover={{ color: "#fff" }}
								onClick={(e) => {
									e.preventDefault();
									onOpen();
								}}
							/>
							{isOpen && (
								<ChannelSettingModal
									guildId={guildId}
									channelId={channel.id}
									isOpen={isOpen}
									onClose={onClose}
								/>
							)}
						</>
					)}
				</Flex>
			</ListItem>
		</Link>
	);
}

export default ChannelListItem;
