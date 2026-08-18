import { BaseStyleProps } from "../../../utils/baseTypes.types";

export interface ContainerProps extends BaseStyleProps {
	children: React.ReactNode;
	onCLick?: () => void;
}
