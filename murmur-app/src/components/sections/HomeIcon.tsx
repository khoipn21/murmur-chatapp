import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import StyledTooltip from "./StyledTooltip";
import { ActiveGuildPill, HoverGuildPill } from "@common/GuildPills";
import { homeStore } from "@store/homeStore";
import NotificationIcon from "@common/NotificationIcon";

function HomeIcon() {
	const location = useLocation();
	const isActive = location.pathname === "/channels/me";
	const [isHover, setHover] = useState(false);

	const notification = homeStore((state) => state.notifCount);
	const reset = homeStore((state) => state.reset);

	useEffect(() => {
		if (isActive) reset();
	});

	return (
		<StyledTooltip
			label="Home"
			position="right">
			<Flex
				direction="column"
				my="2"
				align="center">
				{isActive && <ActiveGuildPill />}
				{isHover && <HoverGuildPill />}
				<Link to="/channels/me">
					<Flex
						direction="column"
						m="auto"
						align="center"
						justify="center"
						bg={isActive ? "highlight.standard" : "brandGray.light"}
						borderRadius={isActive ? "35%" : "50%"}
						h="48px"
						w="48px"
						color="white"
						position="relative"
						_hover={{
							cursor: "pointer",
							borderRadius: "35%",
							bg: "highlight.standard",
						}}
						onMouseLeave={() => setHover(false)}
						onMouseEnter={() => setHover(true)}>
						<Logo />
						{notification > 0 && <NotificationIcon count={notification} />}
					</Flex>
				</Link>
			</Flex>
		</StyledTooltip>
	);
}

function Logo() {
	return (
		<img
			src="/logo/Darkmode.png"
			alt=""
			width="30px"
			height="30px"
		/>
	);
}

export default HomeIcon;
