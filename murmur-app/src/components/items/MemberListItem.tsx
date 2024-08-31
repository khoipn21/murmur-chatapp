import { Avatar, AvatarBadge, Flex, ListItem, Text } from "@chakra-ui/react";
import { useContextMenu } from "react-contexify";
import { useParams } from "react-router-dom";
import { useGetCurrentGuild } from "@hooks/useGetCurrentGuild";
import { userStore } from "@store/userStore";
import MemberContextMenu from "@components/menu/MemberContextMenu";
import { RouterProps } from "@models/routerProps";
import { Member } from "@models/member";

interface MemberListItemProps {
	member: Member;
}

function MemberListItem({ member }: MemberListItemProps) {
	const current = userStore((state) => state.current);
	const { guildId } = useParams<keyof RouterProps>() as RouterProps;
	const guild = useGetCurrentGuild(guildId);
	const isOwner = guild !== undefined && guild.ownerId === current?.id;

	const { show } = useContextMenu({
		id: member.id,
	});

	return (
		<>
			<ListItem
				p="2"
				mx="10px"
				color="brandGray.accent"
				_hover={{
					bg: "brandGray.light",
					borderRadius: "5px",
					cursor: "pointer",
					color: "#fff",
				}}
				onContextMenu={(e) => show({ event: e })}>
				<Flex align="center">
					<Avatar
						size="sm"
						src={member.image}>
						<AvatarBadge
							boxSize="1.25em"
							bg={member.isOnline ? "green.500" : "gray.500"}
						/>
					</Avatar>
					<Text
						ml="2"
						textOverflow="ellipsis"
						maxW="80%"
						noOfLines={1}
						color={member.color ?? undefined}>
						{member.nickname ?? member.username}
					</Text>
				</Flex>
			</ListItem>
			{member.id !== current?.id && (
				<MemberContextMenu
					member={member}
					isOwner={isOwner}
					id={member.id}
				/>
			)}
		</>
	);
}

export default MemberListItem;
