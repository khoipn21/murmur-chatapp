import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../common/Logo";

function NavBar() {
	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			w="100%"
			mb={8}
			p={8}>
			<Flex align="center">
				<Logo />
			</Flex>
			<Flex
				align="center"
				justify="flex-end">
				<>
					<Link to="/login">
						<Button
							color="white"
							_hover={{ bg: "highlight.hover" }}
							_active={{ bg: "highlight.active" }}
							_focus={{ boxShadow: "none" }}
							size="md"
							rounded="md"
							variant="outline"
							mx="4">
							Login
						</Button>
					</Link>

					<Link to="/register">
						<Button
							_hover={{ bg: "highlight.hover" }}
							_active={{ bg: "highlight.active" }}
							_focus={{ boxShadow: "none" }}
							size="md"
							rounded="md"
							variant="outline">
							Register
						</Button>
					</Link>
				</>
			</Flex>
		</Flex>
	);
}

export default NavBar;
