import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import StyledTooltip from "./StyledTooltip";
import { HoverGuildPill } from "@common/GuildPills";

interface AddGuildIconProps {
	onOpen: () => void;
}

function AddGuildIcon({ onOpen }: AddGuildIconProps) {
	const [isHover, setHover] = useState(false);
	return (
		<>
			{isHover && <HoverGuildPill />}
			<StyledTooltip
				label="Add a Server"
				position="right">
				<Flex
					id="add-guild-icon"
					direction="column"
					m="auto"
					align="center"
					justify="center"
					bg="brandGray.light"
					borderRadius="50%"
					h="48px"
					w="48px"
					_hover={{
						cursor: "pointer",
						borderRadius: "35%",
						bg: "brandGreen",
						color: "white",
					}}
					onClick={onOpen}
					onMouseLeave={() => setHover(false)}
					onMouseEnter={() => setHover(true)}>
					<AiOutlinePlus fontSize="25px" />
				</Flex>
			</StyledTooltip>
		</>
	);
}

export default AddGuildIcon;
