import { LabelProps } from "./label.types";

const Label = ({
	label,
	variant,
	fontSize,
	fontWeight,
	color,
	...props
}: LabelProps) => {
	switch (variant) {
		case "headder":
			return (
				<h1
					style={{
						...props,
						fontSize: fontSize,
						fontWeight: fontWeight,
						color: color,
					}}
				>
					{label}
				</h1>
			);
		case "bodyBold":
			return (
				<b
					style={{
						...props,
						fontSize: fontSize,
						fontWeight: fontWeight,
						color: color,
					}}
				>
					{label}
				</b>
			);
		case "body":
			return (
				<p
					style={{
						...props,
						fontSize: fontSize,
						fontWeight: fontWeight,
						color: color,
					}}
				>
					{label}
				</p>
			);
		default:
			return <p style={{ ...props }}>{label}</p>;
	}
};

export default Label;
