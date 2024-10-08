import { Link } from "react-router-dom";
import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Link as CLink,
	Stack,
	Text,
} from "@chakra-ui/react";

interface HeroProps {
	title: string;
	subtitle: string;
	image: string;
	ctaLink: string;
	ctaText: string;
}

function Hero({
	title,
	subtitle,
	image,
	ctaLink,
	ctaText,
	...rest
}: HeroProps) {
	return (
		<Flex
			align="center"
			justify={{
				base: "center",
				md: "space-around",
				xl: "space-between",
			}}
			direction={{
				base: "column-reverse",
				md: "row",
			}}
			wrap="nowrap"
			minH="70vh"
			px={8}
			mb={16}
			{...rest}>
			<Stack
				spacing={4}
				w={{
					base: "80%",
					md: "40%",
				}}
				align={["center", "center", "flex-start", "flex-start"]}>
				<Heading
					as="h1"
					size="xl"
					fontWeight="bold"
					textAlign={["center", "center", "left", "left"]}>
					{title}
				</Heading>
				<Heading
					as="h2"
					size="md"
					opacity="0.8"
					fontWeight="normal"
					lineHeight={1.5}
					textAlign={["center", "center", "left", "left"]}>
					{subtitle}
				</Heading>
				<Link to={ctaLink}>
					<Button
						colorScheme="blue"
						borderRadius="8px"
						py="8"
						px="8"
						lineHeight="1"
						size="md">
						{ctaText}
					</Button>
				</Link>
				<Text
					fontSize="xs"
					mt={2}
					textAlign="center"
					opacity="0.6">
					Got an account already?{" "}
					<CLink
						as={Link}
						to="/login"
						ml="1"
						color="highlight.standard"
						_focus={{ outline: "none" }}>
						Sign in
					</CLink>
				</Text>
			</Stack>
			<Box
				w={{
					base: "80%",
					sm: "60%",
					md: "50%",
				}}
				mb={{
					base: 12,
					md: 0,
				}}>
				<Image
					src={image}
					boxSize="50%"
					rounded="1rem"
				/>
			</Box>
		</Flex>
	);
}

export default Hero;
