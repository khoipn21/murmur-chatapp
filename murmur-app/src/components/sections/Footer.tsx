import { Box, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { AiOutlineApi, AiOutlineGithub } from "react-icons/ai";
import { SiSocketdotio } from "react-icons/si";
import { IconType } from "react-icons";
import StyledTooltip from "./StyledTooltip";
type FooterLinkProps = {
	icon?: IconType;
	href?: string;
	label?: string;
};

function FooterLink({ icon, href, label }: FooterLinkProps) {
	return (
		<StyledTooltip
			label={label!}
			position="top">
			<Link
				display="inline-block"
				href={href}
				aria-label={label}
				isExternal
				mx={2}>
				<Box
					as={icon}
					width="24px"
					height="24px"
					color="gray.400"
					_hover={{ color: "gray.100" }}
				/>
			</Link>
		</StyledTooltip>
	);
}

const links = [
	{
		icon: AiOutlineGithub,
		label: "GitHub",
		href: "https://github.com/khoipn21",
	},
	{
		icon: AiOutlineApi,
		label: "REST API",
		href: "#",
	},
	{
		icon: SiSocketdotio,
		label: "Websocket",
		href: "#",
	},
];

function Footer() {
	return (
		<Flex
			bottom={0}
			as="footer"
			align="center"
			justify="center"
			w="100%"
			p={8}>
			<Box textAlign="center">
				<Text fontSize="xl">
					<span>Murmur | 2024</span>
				</Text>
				<Stack
					mt={2}
					isInline
					justify="center"
					spacing="6">
					{links.map((link) => (
						// eslint-disable-next-line react/jsx-props-no-spreading
						<FooterLink
							key={link.href}
							{...link}
						/>
					))}
				</Stack>
			</Box>
		</Flex>
	);
}

export default Footer;
