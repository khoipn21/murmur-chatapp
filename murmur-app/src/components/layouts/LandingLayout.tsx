import React from "react";
import { Flex } from "@chakra-ui/react";
import NavBar from "../sections/NavBar";
import Footer from "../sections/Footer";

interface IProps {
	children: React.ReactNode;
}

function LandingLayout({ children }: IProps) {
	return (
		<Flex
			direction="column"
			align="center"
			maxW={{ xl: "1200px" }}
			m="0 auto">
			<NavBar />
			{children}
			<Footer />
		</Flex>
	);
}

export default LandingLayout;
