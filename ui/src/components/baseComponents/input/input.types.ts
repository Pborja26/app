import { BaseStyleProps } from "../../../utils/baseTypes.types";

export interface InputProps extends BaseStyleProps {
	value: string;
	onChange: (newValue: React.ChangeEvent<HTMLInputElement>) => void;
	loading?: boolean;
	disabled?: boolean;
	error?: boolean;
	success?: boolean;
	placeholder?: string;
}
