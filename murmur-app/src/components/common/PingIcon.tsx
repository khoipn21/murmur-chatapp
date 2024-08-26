import { Flex, Text } from "@chakra-ui/react";

interface PingIconProps {
	count: number;
}

function PingIcon({ count }: PingIconProps) {
	return (
		<Flex
			borderRadius="50%"
			bg="menuRed"
			w="1.2em"
			h="1.2em"
			justify="center"
			align="center"
			ml={2}>
			<Text
				fontSize="11px"
				fontWeight="bold"
				color="white">
				{count}
			</Text>
		</Flex>
	);
}

export default PingIcon;
