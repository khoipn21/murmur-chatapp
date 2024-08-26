import { GridItem } from "@chakra-ui/react";
import { scrollbarCss } from "@utils/theme";

interface IProps {
	children: React.ReactNode;
}

function ChatGrid({ children }: IProps) {
	return (
		<GridItem
			id="chatGrid"
			gridColumn={3}
			gridRow="2"
			bg="brandGray.light"
			mr="5px"
			display="flex"
			flexDirection="column-reverse"
			overflowY="auto"
			css={scrollbarCss}>
			{children}
		</GridItem>
	);
}

export default ChatGrid;
