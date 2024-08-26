import { Divider, Flex, Text } from "@chakra-ui/react";
import { formatDivider } from "../../lib/utils/dateUtils";

interface DateDividerProps {
	date: string;
}

function DateDivider({ date }: DateDividerProps) {
	return (
		<Flex
			textAlign="center"
			align="center"
			mt="2"
			mx="4"
			key={date}>
			<Divider />
			<Text
				w={["75%", "75%", "75%", "40%", "25%"]}
				fontSize="12px"
				color="brandGray.accent">
				{formatDivider(date)}
			</Text>
			<Divider />
		</Flex>
	);
}

export default DateDivider;
