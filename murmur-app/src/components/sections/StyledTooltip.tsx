import React from "react";
import { Tooltip } from "@chakra-ui/react";

type Placement = "top" | "right";

interface StyledTooltipProps {
	label: string;
	position: Placement;
	disabled?: boolean;
	children: React.ReactNode;
}

function StyledTooltip({
	label,
	position,
	disabled = false,
	children,
}: StyledTooltipProps) {
	return (
		<Tooltip
			hasArrow
			label={label}
			placement={position}
			isDisabled={disabled}
			bg="brandGray.darkest"
			color="white"
			fontWeight="semibold"
			py={1}
			px={3}>
			{children}
		</Tooltip>
	);
}

export default StyledTooltip;
