import { BaseStyleProps } from "../../../utils/baseTypes.types";

export interface ButtonProps extends BaseStyleProps {
	children: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
	loading?: boolean;
}
