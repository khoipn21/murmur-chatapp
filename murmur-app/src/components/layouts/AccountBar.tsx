import {
	Avatar,
	Flex,
	IconButton,
	Text,
	Tooltip,
	useClipboard,
} from "@chakra-ui/react";
import { MdHeadset, MdHeadsetOff, MdMic, MdMicOff } from "react-icons/md";
import { RiSettings5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { userStore } from "@store/userStore";
import { voiceStore } from "@store/voiceStore";

function AccountBar() {
	const user = userStore((state) => state.current);
	const [isMuted, setIsMuted] = voiceStore((state) => [
		state.isMuted,
		state.setIsMuted,
	]);
	const [isDeafened, setIsDeafened] = voiceStore((state) => [
		state.isDeafened,
		state.setIsDeafened,
	]);
	const { hasCopied, onCopy } = useClipboard(user?.id || "");
	return (
		<Flex
			p="10px"
			pos="absolute"
			bottom="0"
			w="240px"
			bg="accountBar"
			align="center"
			justify="space-between">
			<Tooltip
				hasArrow
				label={hasCopied ? "Copied!" : "Click to copy ID"}
				placement="top"
				bg={hasCopied ? "brandGreen" : "brandGray.darkest"}
				color="white"
				closeOnClick={false}>
				<Flex
					align="center"
					maxW="50%"
					w="full"
					mr={2}
					_hover={{ cursor: "pointer" }}
					onClick={onCopy}
					textOverflow="ellipsis">
					<Avatar
						size="sm"
						src={user?.image}
					/>
					<Text
						noOfLines={1}
						ml="2"
						fontSize="14px">
						{user?.username}
					</Text>
				</Flex>
			</Tooltip>
			<Flex>
				<Tooltip
					hasArrow
					label={isDeafened || isMuted ? "Unmute" : "Mute"}
					placement="top"
					bg="brandGray.darkest"
					color="white">
					<IconButton
						icon={isMuted ? <MdMicOff /> : <MdMic />}
						aria-label="toggle mute mic"
						size="sm"
						fontSize="22px"
						variant="ghost"
						onClick={() => setIsMuted(!isMuted)}
					/>
				</Tooltip>
				<Tooltip
					hasArrow
					label={isDeafened ? "Undeafen" : "Deafen"}
					placement="top"
					bg="brandGray.darkest"
					color="white">
					<IconButton
						icon={isDeafened ? <MdHeadsetOff /> : <MdHeadset />}
						aria-label="toggle deafen audio"
						size="sm"
						fontSize="20px"
						variant="ghost"
						onClick={() => setIsDeafened(!isDeafened)}
					/>
				</Tooltip>
				<Link to="/account">
					<Tooltip
						hasArrow
						label="User Settings"
						placement="top"
						bg="brandGray.darkest"
						color="white">
						<IconButton
							icon={<RiSettings5Fill />}
							aria-label="settings"
							size="sm"
							fontSize="20px"
							variant="ghost"
						/>
					</Tooltip>
				</Link>
			</Flex>
		</Flex>
	);
}

export default AccountBar;
