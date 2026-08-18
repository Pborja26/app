import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputProps } from "./input.types";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { GlobalContext } from "../../../contexts/globalContext";

const Input = ({
	value,
	onChange,
	loading,
	disabled,
	error,
	success,
	placeholder,
	...props
}: InputProps) => {
	const { theme } = useContext(GlobalContext);
	const [focus, setFocus] = useState<boolean>(false);

	const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (disabled || loading) return;
		onChange(e);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				flex: 1,
				width: props.width,
				maxWidth: props.maxWidth,
				position: "relative",
			}}
		>
			<input
				value={value}
				onChange={handleValue}
				placeholder={placeholder}
				disabled={disabled}
				type="text"
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				style={{
					...props,
					flex: 1,
					border: "1px solid",
					borderRadius: 16,
					borderColor: disabled
						? theme.feedback.disabled
						: error
							? theme.feedback.error
							: success
								? theme.feedback.success
								: focus
									? theme.primary.main
									: theme.neutral.light,
					padding: "0.5rem 1rem",
					cursor: disabled ? "not-allowed" : loading ? "progress" : "text",
					backgroundColor: disabled
						? theme.feedback.disabled
						: theme.neutral.white,
				}}
			/>
			{loading && (
				<FontAwesomeIcon
					icon={faSpinner}
					spin
					style={{
						position: "absolute",
						right: "1rem",
						top: "30%",
						transform: "translateY(-50%)",
					}}
				/>
			)}
		</div>
	);
};

export default Input;
