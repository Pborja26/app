import { BaseStyleProps } from "../../utils/baseTypes.types";

export interface LabelProps extends BaseStyleProps {
	label: string;
	variant?: "body" | "bodyBold" | "headder";
}
