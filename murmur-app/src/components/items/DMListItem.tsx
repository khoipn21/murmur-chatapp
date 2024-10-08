import { useState } from "react";
import {
	Avatar,
	AvatarBadge,
	Flex,
	Icon,
	ListItem,
	Text,
} from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";
import { closeDirectMessage } from "@api/handler/dm";
import { dmKey } from "@utils/querykeys";
import { DMChannel } from "@models/dm";

interface DMListItemProps {
	dm: DMChannel;
}

function DMListItem({ dm }: DMListItemProps) {
	const currentPath = `/channels/me/${dm.id}`;
	const location = useLocation();
	const isActive = location.pathname === currentPath;
	const [showCloseButton, setShowButton] = useState(false);
	const navigate = useNavigate();
	const cache = useQueryClient();

	const closeDM = async (): Promise<void> => {
		try {
			await closeDirectMessage(dm.id);
			cache.setQueryData<DMChannel[]>(
				[dmKey],
				(d) => d?.filter((c) => c.id !== dm.id) ?? [],
			);
			if (isActive) {
				navigate("/channels/me", { replace: true });
			}
		} catch (err) {}
	};
	return (
		<Link to={`/channels/me/${dm.id}`}>
			<ListItem
				p="2"
				mx="2"
				color={isActive ? "#fff" : "brandGray.accent"}
				_hover={{
					bg: "brandGray.light",
					borderRadius: "5px",
					cursor: "pointer",
					color: "#fff",
				}}
				bg={isActive ? "brandGray.active" : undefined}
				onMouseLeave={() => setShowButton(false)}
				onMouseEnter={() => setShowButton(true)}>
				<Flex
					align="center"
					justify="space-between">
					<Flex
						align="center"
						textOverflow="ellipsis"
						maxW="80%">
						<Avatar
							size="sm"
							src={dm.user.image}>
							<AvatarBadge
								boxSize="1.25em"
								bg={dm.user.isOnline ? "green.500" : "gray.500"}
							/>
						</Avatar>
						<Text
							ml="2"
							noOfLines={1}>
							{dm.user.username}
						</Text>
					</Flex>
					{showCloseButton && (
						<Icon
							aria-label="close dm"
							as={IoMdClose}
							onClick={async (e) => {
								e.preventDefault();
								await closeDM();
							}}
						/>
					)}
				</Flex>
			</ListItem>
		</Link>
	);
}

export default DMListItem;
