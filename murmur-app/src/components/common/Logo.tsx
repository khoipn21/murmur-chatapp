import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

export const Logo: React.FC = () => {
	return (
		<Box
			w="80px"
			color={["white", "white", "primary.500", "primary.500"]}>
			<Text
				fontSize="lg"
				fontWeight="bold">
				<Image src="/logo/Darkmode.png" />
			</Text>
		</Box>
	);
};

export default Logo;
