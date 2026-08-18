import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ButtonProps } from "./button.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/globalContext";

const Button = ({
	children,
	onClick,
	disabled,
	loading,
	...props
}: ButtonProps) => {
	const { theme } = useContext(GlobalContext);

	const handleClick = () => {
		if (disabled || loading) return;
		onClick();
	};

	return (
		<button
			onClick={() => handleClick()}
			style={{
				...props,
				backgroundColor: disabled
					? theme.feedback.disabled
					: props.backgroundColor,
				color: disabled ? theme.feedback.disabled : props.color,
				cursor: disabled ? "not-allowed" : loading ? "progress" : "pointer",
			}}
		>
			{loading ? (
				<FontAwesomeIcon
					icon={faSpinner}
					spin
					style={{ flex: 1, height: "100%" }}
				/>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
