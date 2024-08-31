import { MenuList } from "@chakra-ui/react";

interface IProps {
	children: React.ReactNode;
}

function StyledMenuList({ children }: IProps) {
	return (
		<MenuList
			bg="brandGray.darkest"
			px="2">
			{children}
		</MenuList>
	);
}

export default StyledMenuList;
