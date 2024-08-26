import { Grid } from "@chakra-ui/react";

interface AppLayoutProps {
	showLastColumn?: boolean | null;
	children: React.ReactNode;
}

function AppLayout({ showLastColumn = false, children }: AppLayoutProps) {
	return (
		<Grid
			height="100vh"
			templateColumns={`75px 240px 1fr ${showLastColumn ? "240px" : ""} `}
			templateRows="auto 1fr auto"
			bg="brandGray.light">
			{children}
		</Grid>
	);
}

export default AppLayout;
