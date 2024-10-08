import { useEffect, useState } from "react";
import { Avatar, Flex } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import StyledTooltip from "@sections/StyledTooltip";
import {
	ActiveGuildPill,
	HoverGuildPill,
	NotificationIndicator,
} from "@common/GuildPills";
import { gKey } from "@utils/querykeys";
import { Guild } from "@models/guild";

interface GuildListItemProps {
	guild: Guild;
}

function GuildListItem({ guild }: GuildListItemProps) {
	const location = useLocation();
	const isActive = location.pathname.includes(guild.id);
	const [isHover, setHover] = useState(false);
	const cache = useQueryClient();

	useEffect(() => {
		if (guild.hasNotification && isActive) {
			cache.setQueryData<Guild[]>([gKey], (data) => {
				if (!data) return [];
				return data.map((g) =>
					g.id === guild.id ? { ...g, hasNotification: false } : g,
				);
			});
		}
	});

	return (
		<Flex
			mb="2"
			justify="center"
			position="relative">
			{isActive && <ActiveGuildPill />}
			{isHover && <HoverGuildPill />}
			{guild.hasNotification && <NotificationIndicator />}
			<StyledTooltip
				label={guild.name}
				position="right">
				<Link to={`/channels/${guild.id}/${guild.default_channel_id}`}>
					{guild.icon ? (
						<Avatar
							src={guild.icon}
							borderRadius={isActive || isHover ? "35%" : "50%"}
							name={guild.name}
							color="#fff"
							bg="brandGray.light"
							onMouseLeave={() => setHover(false)}
							onMouseEnter={() => setHover(true)}
						/>
					) : (
						<Flex
							justify="center"
							align="center"
							bg={isActive ? "highlight.standard" : "brandGray.light"}
							borderRadius={isActive ? "35%" : "50%"}
							h="48px"
							w="48px"
							color={isActive ? "white" : undefined}
							fontSize="20px"
							_hover={{
								borderRadius: "35%",
								bg: "highlight.standard",
								color: "white",
							}}
							onMouseLeave={() => setHover(false)}
							onMouseEnter={() => setHover(true)}>
							{guild.name[0]}
						</Flex>
					)}
				</Link>
			</StyledTooltip>
		</Flex>
	);
}

export default GuildListItem;
