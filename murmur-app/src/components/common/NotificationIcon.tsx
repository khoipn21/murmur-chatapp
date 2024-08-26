import { Flex, Text } from "@chakra-ui/react";

interface NotificationIconProps {
	count: number;
}

function NotificationIcon({ count }: NotificationIconProps) {
	return (
		<Flex
			borderRadius="50%"
			bg="menuRed"
			position="absolute"
			bottom={0}
			right={0}
			transform="translate(25%, 25%)"
			border="0.3em solid"
			borderColor="brandBorder"
			w="1.4em"
			h="1.4em"
			justify="center"
			align="center">
			<Text
				fontSize="12px"
				fontWeight="bold"
				color="white">
				{count}
			</Text>
		</Flex>
	);
}

export default NotificationIcon;
